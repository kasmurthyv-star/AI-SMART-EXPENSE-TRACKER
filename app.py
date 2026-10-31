import os
import random
from flask import Flask, jsonify, render_template, request, Response
from database import (
    add_linked_bank,
    add_merchant_rule,
    clear_personal_ledger,
    delete_merchant_rule,
    delete_transaction_by_id,
    fetch_all_state,
    init_db,
    insert_transaction,
    reset_budgets_to_default,
    set_primary_linked_bank,
    update_transaction_category,
    upsert_budget,
)
from ai_engine import (
    classify_expense_ai,
    generate_ai_financial_insights,
    parse_indian_bank_sms_ai,
)
try:
    from aa_bank_connector import create_rbi_aa_consent_request
except ImportError:
    def create_rbi_aa_consent_request(mobile_number: str, redirect_url: str = "http://127.0.0.1:5000/"):
        clean_mobile = "".join(ch for ch in (mobile_number or "") if ch.isdigit())[-10:]
        return {
            "status": "CONSENT_REQUESTED",
            "vua": f"{clean_mobile or '9876543210'}@onemoney",
            "consentId": f"CR-SETU-{clean_mobile or '9876543210'}",
            "message": "RBI Account Aggregator consent simulation active."
        }

app = Flask(__name__)

init_db()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/health", methods=["GET"])
def api_health():
    return jsonify({"status": "ok", "engine": "Flask + SQLite3 + PayPulse AI v2.2"})


@app.route("/api/state", methods=["GET"])
def api_get_state():
    filters = {
        "txn_type": request.args.get("type", "ALL"),
        "from_date": request.args.get("from_date", ""),
        "to_date": request.args.get("to_date", ""),
        "month": request.args.get("month", "ALL"),
        "year": request.args.get("year", "ALL"),
    }
    state = fetch_all_state(filters=filters if any(filters.values()) else None)
    insights = generate_ai_financial_insights(state["transactions"], state["categoryBudgets"])
    state["aiSummary"] = insights
    return jsonify(state)


@app.route("/api/transactions", methods=["POST"])
def api_create_transaction():
    data = request.get_json(force=True) or {}
    state = fetch_all_state()

    merchant = (data.get("merchant") or "UPI Merchant").strip()
    vpa = (data.get("vpa") or "merchant@ybl").strip()
    amount = int(float(data.get("amount") or 0))
    source_app = data.get("sourceApp") or "PhonePe"
    note = (data.get("note") or "").strip()
    requested_cat = data.get("category") or "AUTO"
    txn_type = data.get("txnType") or "DEBIT"
    iso_date = data.get("isoDate") or ""

    ai_res = classify_expense_ai(merchant, vpa, note, state["customMerchantRules"])
    final_category = ai_res["category"] if requested_cat == "AUTO" else requested_cat

    tx = insert_transaction(
        {
            "id": data.get("id"),
            "merchant": merchant,
            "vpa": vpa,
            "amount": amount,
            "category": final_category,
            "sourceApp": source_app,
            "refId": data.get("refId") or f"6293{random.randint(10000000, 99999999)}",
            "timestamp": data.get("timestamp") or "Just now",
            "note": note,
            "autoCaptured": True,
            "aiConfidence": ai_res["confidence"],
            "txnType": txn_type,
            "isoDate": iso_date,
        }
    )
    return jsonify({"status": "created", "transaction": tx, "aiClassification": ai_res})


@app.route("/api/transactions/<tx_id>/category", methods=["PATCH", "PUT"])
def api_update_tx_category(tx_id: str):
    data = request.get_json(force=True) or {}
    new_cat = data.get("category", "Others")
    ok = update_transaction_category(tx_id, new_cat)
    return jsonify({"status": "updated" if ok else "not_found", "id": tx_id, "category": new_cat})


@app.route("/api/transactions/<tx_id>", methods=["DELETE"])
def api_delete_tx(tx_id: str):
    ok = delete_transaction_by_id(tx_id)
    return jsonify({"status": "deleted" if ok else "not_found", "id": tx_id})


@app.route("/api/parse-sms", methods=["POST"])
def api_parse_sms():
    data = request.get_json(force=True) or {}
    raw_sms = data.get("smsText", "")
    source_channel = data.get("sourceChannel", "AUTO")
    commit = bool(data.get("commit", False))

    state = fetch_all_state()
    parsed = parse_indian_bank_sms_ai(raw_sms, state["customMerchantRules"], source_channel=source_channel)

    if commit and parsed["amount"] > 0:
        tx = insert_transaction(
            {
                "merchant": parsed["merchant"],
                "vpa": parsed["vpa"],
                "amount": parsed["amount"],
                "category": parsed["category"],
                "sourceApp": parsed["sourceApp"],
                "refId": parsed["refId"],
                "timestamp": "Parsed via AI SMS Engine",
                "note": "Auto-captured from Bank SMS / Push Alert",
                "autoCaptured": True,
                "aiConfidence": parsed["confidence"],
                "txnType": parsed.get("txnType", "DEBIT"),
            }
        )
        parsed["savedTransaction"] = tx

    return jsonify(parsed)


@app.route("/api/ai-advisor", methods=["POST"])
def api_ai_advisor():
    data = request.get_json(force=True) or {}
    query = data.get("query", "")
    state = fetch_all_state()
    result = generate_ai_financial_insights(
        state["transactions"],
        state["categoryBudgets"],
        user_query=query,
    )
    return jsonify(result)


@app.route("/api/budgets", methods=["POST"])
def api_update_budget():
    data = request.get_json(force=True) or {}
    if data.get("reset"):
        reset_budgets_to_default()
        return jsonify({"status": "reset"})
    category = data.get("category")
    limit_val = int(data.get("limit", 2000))
    if category:
        upsert_budget(category, limit_val)
    return jsonify({"status": "updated", "category": category, "limit": limit_val})


@app.route("/api/rules", methods=["POST", "DELETE"])
def api_manage_rules():
    data = request.get_json(force=True) or {}
    if request.method == "DELETE":
        kw = data.get("keyword", "")
        delete_merchant_rule(kw)
        return jsonify({"status": "deleted", "keyword": kw})
    kw = data.get("keyword", "")
    cat = data.get("category", "Others")
    if kw:
        add_merchant_rule(kw, cat)
    return jsonify({"status": "saved", "keyword": kw, "category": cat})


@app.route("/api/banks", methods=["POST", "PATCH"])
def api_manage_banks():
    data = request.get_json(force=True) or {}
    if request.method == "PATCH":
        masked_acc = data.get("maskedAcc", "")
        set_primary_linked_bank(masked_acc)
        return jsonify({"status": "primary_updated", "maskedAcc": masked_acc})

    bank_name = data.get("bankName", "ICICI Bank")
    masked_acc = data.get("maskedAcc", "7732")
    vpa_handle = data.get("vpaHandle", "@ybl / @paytm / @okicici")
    protocol = data.get("protocol", "AA Consent")
    balance = int(data.get("balance", 54200))
    if data.get("clearDemo"):
        clear_personal_ledger(clear_banks=True)
    add_linked_bank(bank_name, masked_acc, vpa_handle, protocol, balance)
    return jsonify({"status": "linked", "bankName": bank_name, "maskedAcc": masked_acc})


@app.route("/api/webhook/sms", methods=["POST"])
def api_webhook_sms():
    data = request.get_json(silent=True) or {}
    raw_sms = (
        data.get("smsText")
        or data.get("text")
        or data.get("body")
        or data.get("message")
        or request.form.get("smsText")
        or request.get_data(as_text=True)
        or ""
    )
    source_channel = data.get("sourceChannel", "AUTO")
    state = fetch_all_state()
    parsed = parse_indian_bank_sms_ai(raw_sms, state["customMerchantRules"], source_channel=source_channel)
    if parsed["amount"] > 0:
        tx = insert_transaction(
            {
                "merchant": parsed["merchant"],
                "vpa": parsed["vpa"],
                "amount": parsed["amount"],
                "category": parsed["category"],
                "sourceApp": parsed["sourceApp"],
                "refId": parsed["refId"],
                "timestamp": "Phone SMS Webhook",
                "note": raw_sms[:80],
                "autoCaptured": True,
                "aiConfidence": parsed["confidence"],
                "txnType": parsed.get("txnType", "DEBIT"),
            }
        )
        parsed["savedTransaction"] = tx
    return jsonify({"status": "logged", "parsed": parsed})


@app.route("/api/reset-personal", methods=["POST"])
def api_reset_personal():
    data = request.get_json(silent=True) or {}
    clear_personal_ledger(clear_banks=bool(data.get("clearBanks", False)))
    return jsonify({"status": "cleared"})


@app.route("/api/aa/consent", methods=["POST"])
def api_create_aa_consent():
    data = request.get_json(silent=True) or {}
    mobile = data.get("mobile", "")
    res = create_rbi_aa_consent_request(mobile)
    return jsonify(res)


if __name__ == "__main__":
    import threading
    import webbrowser

    port = int(os.environ.get("PORT", 5000))
    url = f"http://127.0.0.1:{port}"
    print(f"\n=======================================================")
    print(f" PayPulse UPI — Desktop Flask + SQLite3 Server Starting")
    print(f" SQLite Database : {os.path.abspath('paypulse.db')}")
    print(f" Desktop Web UI  : {url}")
    print(f"=======================================================\n")

    if os.environ.get("WERKZEUG_RUN_MAIN") != "true":
        threading.Timer(1.0, lambda: webbrowser.open(url)).start()

    app.run(host="127.0.0.1", port=port, debug=False)
