import random
import re
from datetime import datetime
from typing import Any, Dict, List, Tuple

KEYWORD_RULES: List[Tuple[List[str], str]] = [
    (
        [
            "swiggy", "zomato", "domino", "starbucks", "third wave", "chai", "cafe",
            "restaurant", "barbeque", "kfc", "mcdonald", "pizza", "biryani", "eatfit",
            "bakery", "haldiram", "coffee", "snacks", "dinner", "lunch", "breakfast",
        ],
        "Food & Dining",
    ),
    (
        [
            "zepto", "blinkit", "instamart", "bigbasket", "dmart", "reliance fresh",
            "more supermarket", "ratnadeep", "milk", "kirana", "grocery", "veggies",
            "supermarket", "fruits",
        ],
        "Groceries",
    ),
    (
        [
            "uber", "ola", "rapido", "irctc", "metro", "namma yatri", "indianoil",
            "iocl", "hpcl", "bpcl", "petrol", "fuel", "shell", "fastag", "redbus",
            "makemytrip", "cab", "auto", "flight", "train",
        ],
        "Travel & Commute",
    ),
    (
        [
            "jio", "airtel", "vi ", "vodafone", "bsnl", "bescom", "electricity",
            "power", "tata play", "act fibernet", "broadband", "gas", "indane",
            "water bill", "recharge", "wifi", "bill",
        ],
        "Bills & Utilities",
    ),
    (
        [
            "amazon", "flipkart", "myntra", "ajio", "meesho", "nykaa", "decathlon",
            "croma", "zudio", "lifestyle", "trends", "uniqlo", "mall", "kurta", "shoes",
        ],
        "Shopping",
    ),
    (
        [
            "apollo", "medplus", "pharmeasy", "1mg", "netmeds", "hospital", "clinic",
            "diagnostic", "dental", "cultfit", "gym", "pharmacy", "medicine", "vitamin",
        ],
        "Health & Pharmacy",
    ),
    (
        [
            "bookmyshow", "pvr", "inox", "netflix", "spotify", "prime video",
            "hotstar", "youtube", "sony liv", "steam", "movie", "cinema",
        ],
        "Entertainment",
    ),
    (
        [
            "split", "repay", "friend", "peer", "family", "mom", "dad", "bro",
        ],
        "Transfers & Friends",
    ),
]


def classify_expense_ai(
    merchant: str,
    vpa: str = "",
    note: str = "",
    custom_rules: List[Dict[str, str]] = None,
) -> Dict[str, Any]:
    combined = f"{merchant or ''} {vpa or ''} {note or ''}".lower()

    if custom_rules:
        for rule in custom_rules:
            kw = (rule.get("keyword") or "").strip().lower()
            if kw and kw in combined:
                return {
                    "category": rule["category"],
                    "confidence": 0.99,
                    "reason": f"Matched custom user rule '{kw}'",
                }

    best_category = "Others"
    matched_tokens: List[str] = []

    for keywords, category in KEYWORD_RULES:
        hits = [kw for kw in keywords if kw in combined]
        if len(hits) > len(matched_tokens):
            matched_tokens = hits
            best_category = category

    if matched_tokens:
        confidence = min(0.99, round(0.91 + 0.03 * len(matched_tokens), 2))
        return {
            "category": best_category,
            "confidence": confidence,
            "reason": f"NLP token match: {', '.join(matched_tokens[:2])}",
        }

    return {
        "category": "Others",
        "confidence": 0.85,
        "reason": "Defaulted to 'Others' (unclassified transaction)",
    }


def parse_indian_bank_sms_ai(raw_text: str, custom_rules: List[Dict[str, str]] = None, source_channel: str = "AUTO") -> Dict[str, Any]:
    text = (raw_text or "").strip()
    if not text:
        return {
            "amount": 0,
            "merchant": "Unknown",
            "vpa": "unknown@upi",
            "refId": "N/A",
            "sourceApp": "SMS Auto-Sync",
            "category": "Others",
            "txnType": "DEBIT",
            "confidence": 0.0,
        }

    amt_match = re.search(r"(?:Rs\.?|INR|₹|debited by|paid|credited by)\s*([0-9,]+(?:\.\d{1,2})?)", text, re.IGNORECASE)
    amount = round(float(amt_match.group(1).replace(",", ""))) if amt_match else 250

    vpa_match = re.search(r"([a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+)", text)
    vpa = vpa_match.group(1).lower() if vpa_match else "merchant@ybl"

    ref_match = re.search(r"(\d{12})", text)
    ref_id = ref_match.group(1) if ref_match else f"6293{random.randint(10000000, 99999999)}"

    # Detect Credit vs Debit
    is_credit = bool(re.search(r"(?:credited|credit|received|refund|cashback|deposited|salary|credited to|cr to a/c)", text, re.IGNORECASE))
    txn_type = "CREDIT" if is_credit else "DEBIT"

    merchant = "UPI Merchant" if not is_credit else "UPI Credit / Inflow"
    merch_patterns = [
        r"(?:paid\s+(?:₹|Rs\.?\s*)?[0-9,.]+\s+to)\s+([A-Za-z0-9 &._-]+?)(?:\s*\(|\s+on|\s+from|\s+via|\.)",
        r"(?:received\s+(?:₹|Rs\.?\s*)?[0-9,.]+\s+from)\s+([A-Za-z0-9 &._-]+?)(?:\s*\(|\s+on|\s+via|\.)",
        r"(?:trf to|at|to VPA|from)\s+([A-Za-z0-9 &._@-]+?)(?:\s*\(|\s+via|\s+Ref|\s+on|\.)",
        r";\s*([A-Za-z0-9 &._-]+?)\s*(?:\(|credited)",
    ]
    for pat in merch_patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m and m.group(1):
            merchant = m.group(1).strip()
            break

    if "@" in merchant:
        prefix = merchant.split("@")[0]
        merchant = prefix.capitalize()

    source_app = "SMS Auto-Sync"
    if source_channel and source_channel != "AUTO":
        source_app = source_channel
    elif re.search(r"phonepe|@ybl|@ibl|@axl", text, re.IGNORECASE):
        source_app = "PhonePe"
    elif re.search(r"paytm|@paytm", text, re.IGNORECASE):
        source_app = "Paytm"
    elif re.search(r"gpay|google pay|@ok", text, re.IGNORECASE):
        source_app = "GPay"
    elif re.search(r"credit card|cc\s*xx|card ending", text, re.IGNORECASE):
        source_app = "Credit Card"
    elif re.search(r"debit card|atm|pos\s", text, re.IGNORECASE):
        source_app = "Debit Card"
    elif re.search(r"neft|imps|rtgs|netbanking|net banking", text, re.IGNORECASE):
        source_app = "Net Banking"

    ai_cls = classify_expense_ai(merchant, vpa, text, custom_rules)
    return {
        "amount": amount,
        "merchant": merchant,
        "vpa": vpa,
        "refId": ref_id,
        "sourceApp": source_app,
        "category": ai_cls["category"],
        "txnType": txn_type,
        "confidence": ai_cls["confidence"],
        "reason": ai_cls["reason"],
    }


def generate_ai_financial_insights(
    transactions: List[Dict[str, Any]],
    budgets: Dict[str, int],
    user_query: str = "",
) -> Dict[str, Any]:
    debit_tx = [t for t in transactions if t.get("txnType", "DEBIT") == "DEBIT"]
    credit_tx = [t for t in transactions if t.get("txnType", "DEBIT") == "CREDIT"]

    total_debits = sum(int(t.get("amount", 0)) for t in debit_tx)
    total_credits = sum(int(t.get("amount", 0)) for t in credit_tx)
    net_cashflow = total_credits - total_debits

    total_budget = sum(int(v) for v in budgets.values()) if budgets else 28500
    tx_count = len(transactions)

    cat_totals: Dict[str, int] = {}
    merchant_totals: Dict[str, int] = {}
    app_totals: Dict[str, int] = {}

    for t in debit_tx:
        amt = int(t.get("amount", 0))
        cat = t.get("category", "Others")
        merch = t.get("merchant", "Unknown")
        app = t.get("sourceApp", "PhonePe")
        cat_totals[cat] = cat_totals.get(cat, 0) + amt
        merchant_totals[merch] = merchant_totals.get(merch, 0) + amt
        app_totals[app] = app_totals.get(app, 0) + amt

    top_category = max(cat_totals.items(), key=lambda x: x[1]) if cat_totals else ("Food & Dining", 0)
    top_merchant = max(merchant_totals.items(), key=lambda x: x[1]) if merchant_totals else ("Swiggy", 0)

    avg_tx = (total_debits / len(debit_tx)) if debit_tx else 0
    anomalies = [
        t for t in debit_tx if int(t.get("amount", 0)) > max(1000, avg_tx * 1.6)
    ]

    discretionary_spend = (
        cat_totals.get("Food & Dining", 0)
        + cat_totals.get("Shopping", 0)
        + cat_totals.get("Entertainment", 0)
    )
    potential_savings = round(discretionary_spend * 0.22)

    q = (user_query or "").strip().lower()
    if "credit" in q or "income" in q or "salary" in q or "inflow" in q:
        reply = (
            f"You received **₹{total_credits:,}** across {len(credit_tx)} credit transactions this month. "
            f"After accounting for total debits of ₹{total_debits:,}, your net cashflow is **+₹{net_cashflow:,}**."
        )
    elif "other" in q or "others" in q:
        other_spent = cat_totals.get("Others", 0)
        reply = f"Total spend in the **Others** category is **₹{other_spent:,}** across {sum(1 for t in debit_tx if t.get('category') == 'Others')} transaction(s)."
    elif not q or "save" in q or "reduce" in q or "cut" in q:
        reply = (
            f"Cashflow Summary: Debits: **-₹{total_debits:,}**, Credits: **+₹{total_credits:,}** (Net: **+₹{net_cashflow:,}**). "
            f"Your discretionary spend across Food, Shopping, and Entertainment is ₹{discretionary_spend:,}. "
            f"Trimming 20% on quick orders can save approximately **₹{max(300, potential_savings):,}** this month."
        )
    else:
        reply = (
            f"AI Ledger Summary: Total debits: **-₹{total_debits:,}** ({len(debit_tx)} txns), "
            f"Total credits: **+₹{total_credits:,}** ({len(credit_tx)} txns). Net Cashflow: **₹{net_cashflow:,}**. "
            f"Top expense category: **{top_category[0]}** (₹{top_category[1]:,}). Remaining budget: **₹{max(0, total_budget - total_debits):,}**."
        )

    return {
        "reply": reply,
        "metrics": {
            "totalSpent": total_debits,
            "totalDebits": total_debits,
            "totalCredits": total_credits,
            "netCashflow": net_cashflow,
            "totalBudget": total_budget,
            "avgTicket": round(avg_tx),
            "topCategory": top_category[0],
            "topCategoryAmount": top_category[1],
            "topMerchant": top_merchant[0],
            "potentialMonthlySavings": max(250, potential_savings),
            "anomalyCount": len(anomalies),
        },
    }
