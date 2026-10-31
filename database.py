import os
import sqlite3
from datetime import datetime
from typing import Any, Dict, List

DB_PATH = os.environ.get("PAYPULSE_DB_PATH", os.path.join(os.path.dirname(__file__), "paypulse.db"))


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS transactions (
            id TEXT PRIMARY KEY,
            merchant TEXT NOT NULL,
            vpa TEXT NOT NULL,
            amount INTEGER NOT NULL,
            category TEXT NOT NULL,
            source_app TEXT NOT NULL,
            ref_id TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            note TEXT DEFAULT '',
            auto_captured INTEGER DEFAULT 1,
            ai_confidence REAL DEFAULT 0.98,
            txn_type TEXT DEFAULT 'DEBIT',
            iso_date TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    # Safe auto-migration if upgrading existing db
    cur.execute("PRAGMA table_info(transactions)")
    cols = [r["name"] for r in cur.fetchall()]
    if "txn_type" not in cols:
        cur.execute("ALTER TABLE transactions ADD COLUMN txn_type TEXT DEFAULT 'DEBIT'")
    if "iso_date" not in cols:
        cur.execute("ALTER TABLE transactions ADD COLUMN iso_date TEXT DEFAULT ''")

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS linked_banks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bank_name TEXT NOT NULL,
            masked_acc TEXT NOT NULL,
            vpa_handle TEXT NOT NULL,
            protocol TEXT NOT NULL,
            balance INTEGER NOT NULL,
            is_primary INTEGER DEFAULT 0
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS budgets (
            category TEXT PRIMARY KEY,
            monthly_limit INTEGER NOT NULL
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS merchant_rules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            keyword TEXT NOT NULL UNIQUE,
            category TEXT NOT NULL
        )
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS ai_chat_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )

    # Seed initial transactions if empty
    cur.execute("SELECT COUNT(*) AS cnt FROM transactions")
    if cur.fetchone()["cnt"] == 0:
        seed_transactions = [
            ("TXN-101", "Swiggy Food Delivery", "swiggy@ybl", 485, "Food & Dining", "PhonePe", "629384719201", "20 Oct 2026, 08:45 AM", "Breakfast & coffee", 1, 0.99, "DEBIT", "2026-10-20"),
            ("TXN-102", "Zepto Instant Grocery", "zepto@icici", 740, "Groceries", "Paytm", "629399401122", "19 Oct 2026, 07:30 PM", "Milk, fruits & staples", 1, 0.98, "DEBIT", "2026-10-19"),
            ("TXN-103", "Uber India Systems", "uber@axis", 320, "Travel & Commute", "PhonePe", "629311882341", "19 Oct 2026, 09:15 AM", "Office commute cab", 1, 0.99, "DEBIT", "2026-10-19"),
            ("TXN-CR-101", "TechCorp Salary Credit", "salary@hdfcbank", 52000, "Others", "Net Banking", "629300182741", "18 Oct 2026, 10:00 AM", "Monthly salary credited for Oct 2026", 1, 0.99, "CREDIT", "2026-10-18"),
            ("TXN-104", "Reliance Jio Infocomm", "jiofiber@paytm", 999, "Bills & Utilities", "Paytm", "629377123908", "18 Oct 2026, 04:10 PM", "Monthly Fiber Broadband", 1, 0.99, "DEBIT", "2026-10-18"),
            ("TXN-CR-102", "Amazon UPI Refund", "amazon@icici", 649, "Shopping", "GPay", "629388172635", "17 Oct 2026, 03:30 PM", "Order refund returned to bank account", 1, 0.98, "CREDIT", "2026-10-17"),
            ("TXN-105", "Apollo Pharmacy", "apollo@hdfcbank", 650, "Health & Pharmacy", "Credit Card", "629355019283", "17 Oct 2026, 06:20 PM", "Vitamins & first aid", 1, 0.97, "DEBIT", "2026-10-17"),
            ("TXN-106", "Myntra Designs", "myntra@ybl", 1499, "Shopping", "PhonePe", "629344098112", "16 Oct 2026, 02:05 PM", "Festive kurta order", 1, 0.98, "DEBIT", "2026-10-16"),
            ("TXN-CR-103", "Rahul Sharma (Split Share)", "rahul@ybl", 1200, "Transfers & Friends", "PhonePe", "629355281944", "15 Oct 2026, 09:40 PM", "Dinner bill repayment received via UPI", 1, 0.96, "CREDIT", "2026-10-15"),
            ("TXN-107", "Local Stationery & Print", "print@upi", 280, "Others", "Debit Card", "629366112233", "12 Oct 2026, 11:15 AM", "Printing documents & xerox", 1, 0.95, "DEBIT", "2026-10-12"),
        ]
        cur.executemany(
            """
            INSERT INTO transactions
            (id, merchant, vpa, amount, category, source_app, ref_id, timestamp, note, auto_captured, ai_confidence, txn_type, iso_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            seed_transactions,
        )

    # Seed initial linked banks if empty
    cur.execute("SELECT COUNT(*) AS cnt FROM linked_banks")
    if cur.fetchone()["cnt"] == 0:
        seed_banks = [
            ("HDFC Bank", "9104", "@ybl / @paytm", "AA Active", 63807, 1),
            ("State Bank of India", "4821", "@oksbi", "AA Active", 41290, 0),
        ]
        cur.executemany(
            """
            INSERT INTO linked_banks (bank_name, masked_acc, vpa_handle, protocol, balance, is_primary)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            seed_banks,
        )

    # Seed initial budgets if empty (including Others)
    cur.execute("SELECT COUNT(*) AS cnt FROM budgets")
    if cur.fetchone()["cnt"] == 0:
        default_budgets = [
            ("Food & Dining", 5000),
            ("Groceries", 4500),
            ("Travel & Commute", 3000),
            ("Bills & Utilities", 3500),
            ("Shopping", 4000),
            ("Health & Pharmacy", 2000),
            ("Entertainment", 1500),
            ("Transfers & Friends", 3000),
            ("Others", 2000),
        ]
        cur.executemany("INSERT OR REPLACE INTO budgets (category, monthly_limit) VALUES (?, ?)", default_budgets)

    # Seed initial merchant rules if empty
    cur.execute("SELECT COUNT(*) AS cnt FROM merchant_rules")
    if cur.fetchone()["cnt"] == 0:
        default_rules = [
            ("chai point", "Food & Dining"),
            ("cultfit", "Health & Pharmacy"),
        ]
        cur.executemany("INSERT OR REPLACE INTO merchant_rules (keyword, category) VALUES (?, ?)", default_rules)

    conn.commit()
    conn.close()


def fetch_all_state(filters: Dict[str, Any] = None) -> Dict[str, Any]:
    conn = get_connection()
    cur = conn.cursor()

    query = "SELECT * FROM transactions"
    conditions = []
    params = []

    if filters:
        if filters.get("txn_type") and filters["txn_type"] != "ALL":
            conditions.append("txn_type = ?")
            params.append(filters["txn_type"])
        if filters.get("from_date"):
            conditions.append("iso_date >= ?")
            params.append(filters["from_date"])
        if filters.get("to_date"):
            conditions.append("iso_date <= ?")
            params.append(filters["to_date"])
        if filters.get("month") and filters["month"] != "ALL":
            conditions.append("substr(iso_date, 6, 2) = ?")
            params.append(filters["month"].zfill(2))
        if filters.get("year") and filters["year"] != "ALL":
            conditions.append("substr(iso_date, 1, 4) = ?")
            params.append(str(filters["year"]))

    if conditions:
        query += " WHERE " + " AND ".join(conditions)
    query += " ORDER BY rowid DESC"

    cur.execute(query, params)
    tx_rows = [
        {
            "id": r["id"],
            "merchant": r["merchant"],
            "vpa": r["vpa"],
            "amount": r["amount"],
            "category": r["category"],
            "sourceApp": r["source_app"],
            "refId": r["ref_id"],
            "timestamp": r["timestamp"],
            "note": r["note"],
            "autoCaptured": bool(r["auto_captured"]),
            "aiConfidence": r["ai_confidence"],
            "txnType": r["txn_type"] if "txn_type" in r.keys() else "DEBIT",
            "isoDate": r["iso_date"] if "iso_date" in r.keys() else "",
        }
        for r in cur.fetchall()
    ]

    cur.execute("SELECT * FROM linked_banks ORDER BY is_primary DESC, id ASC")
    bank_rows = [
        {
            "id": r["id"],
            "bankName": r["bank_name"],
            "maskedAcc": r["masked_acc"],
            "vpaHandle": r["vpa_handle"],
            "protocol": r["protocol"],
            "balance": r["balance"],
            "isPrimary": bool(r["is_primary"]),
        }
        for r in cur.fetchall()
    ]

    cur.execute("SELECT * FROM budgets")
    budgets_dict = {r["category"]: r["monthly_limit"] for r in cur.fetchall()}

    cur.execute("SELECT * FROM merchant_rules ORDER BY id DESC")
    rules_rows = [{"id": r["id"], "keyword": r["keyword"], "category": r["category"]} for r in cur.fetchall()]

    conn.close()
    return {
        "transactions": tx_rows,
        "linkedBanks": bank_rows,
        "categoryBudgets": budgets_dict,
        "customMerchantRules": rules_rows,
    }


def insert_transaction(tx: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_connection()
    cur = conn.cursor()
    tx_id = tx.get("id") or f"TXN-{int(datetime.now().timestamp() * 1000)}"
    today_iso = tx.get("isoDate") or datetime.now().strftime("%Y-%m-%d")

    cur.execute(
        """
        INSERT OR REPLACE INTO transactions
        (id, merchant, vpa, amount, category, source_app, ref_id, timestamp, note, auto_captured, ai_confidence, txn_type, iso_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            tx_id,
            tx.get("merchant", "UPI Merchant"),
            tx.get("vpa", "merchant@upi"),
            int(tx.get("amount", 0)),
            tx.get("category", "Others"),
            tx.get("sourceApp", "PhonePe"),
            tx.get("refId", "629310293847"),
            tx.get("timestamp", f"Just now ({today_iso})"),
            tx.get("note", ""),
            1 if tx.get("autoCaptured", True) else 0,
            float(tx.get("aiConfidence", 0.98)),
            tx.get("txnType", "DEBIT"),
            today_iso,
        ),
    )
    conn.commit()
    conn.close()
    tx["id"] = tx_id
    tx["isoDate"] = today_iso
    return tx


def update_transaction_category(tx_id: str, category: str) -> bool:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("UPDATE transactions SET category = ? WHERE id = ?", (category, tx_id))
    updated = cur.rowcount > 0
    conn.commit()
    conn.close()
    return updated


def delete_transaction_by_id(tx_id: str) -> bool:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM transactions WHERE id = ?", (tx_id,))
    deleted = cur.rowcount > 0
    conn.commit()
    conn.close()
    return deleted


def upsert_budget(category: str, monthly_limit: int) -> None:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT OR REPLACE INTO budgets (category, monthly_limit) VALUES (?, ?)",
        (category, int(monthly_limit)),
    )
    conn.commit()
    conn.close()


def reset_budgets_to_default() -> None:
    conn = get_connection()
    cur = conn.cursor()
    default_budgets = [
        ("Food & Dining", 5000),
        ("Groceries", 4500),
        ("Travel & Commute", 3000),
        ("Bills & Utilities", 3500),
        ("Shopping", 4000),
        ("Health & Pharmacy", 2000),
        ("Entertainment", 1500),
        ("Transfers & Friends", 3000),
        ("Others", 2000),
    ]
    cur.executemany("INSERT OR REPLACE INTO budgets (category, monthly_limit) VALUES (?, ?)", default_budgets)
    conn.commit()
    conn.close()


def add_merchant_rule(keyword: str, category: str) -> None:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT OR REPLACE INTO merchant_rules (keyword, category) VALUES (?, ?)",
        (keyword.strip().lower(), category),
    )
    like_pat = f"%{keyword.strip().lower()}%"
    cur.execute(
        "UPDATE transactions SET category = ? WHERE LOWER(merchant || ' ' || vpa) LIKE ?",
        (category, like_pat),
    )
    conn.commit()
    conn.close()


def delete_merchant_rule(keyword: str) -> None:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM merchant_rules WHERE LOWER(keyword) = LOWER(?)", (keyword,))
    conn.commit()
    conn.close()


def add_linked_bank(bank_name: str, masked_acc: str, vpa_handle: str, protocol: str, balance: int = 54200) -> None:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("UPDATE linked_banks SET is_primary = 0")
    cur.execute(
        """
        INSERT INTO linked_banks (bank_name, masked_acc, vpa_handle, protocol, balance, is_primary)
        VALUES (?, ?, ?, ?, ?, 1)
        """,
        (bank_name, masked_acc, vpa_handle, protocol, int(balance)),
    )
    conn.commit()
    conn.close()


def set_primary_linked_bank(masked_acc: str) -> None:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("UPDATE linked_banks SET is_primary = 0")
    cur.execute("UPDATE linked_banks SET is_primary = 1 WHERE masked_acc = ?", (masked_acc,))
    conn.commit()
    conn.close()


def clear_personal_ledger(clear_banks: bool = False) -> None:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM transactions")
    if clear_banks:
        cur.execute("DELETE FROM linked_banks")
    conn.commit()
    conn.close()
