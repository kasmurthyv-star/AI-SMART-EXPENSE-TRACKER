"""
RBI Account Aggregator (Setu FIU v2) Connector for PayPulse UPI.
Enables consent-based bank statement sync from Indian banks (HDFC, SBI, ICICI, Axis, etc.).
"""
import json
import os
import urllib.request
from typing import Any, Dict

SETU_BASE_URL = os.environ.get("SETU_AA_BASE_URL", "https://fiu-uat.setu.co/v2")
SETU_CLIENT_ID = os.environ.get("SETU_CLIENT_ID", "")
SETU_CLIENT_SECRET = os.environ.get("SETU_CLIENT_SECRET", "")
SETU_PRODUCT_INSTANCE_ID = os.environ.get("SETU_PRODUCT_INSTANCE_ID", "")


def create_rbi_aa_consent_request(mobile_number: str, redirect_url: str = "http://127.0.0.1:5000/") -> Dict[str, Any]:
    """
    Creates an RBI Account Aggregator consent handle for a 10-digit mobile number.
    If SETU_CLIENT_ID and SETU_CLIENT_SECRET are configured, calls live Setu FIU v2 API.
    Otherwise returns a compliant local consent handle.
    """
    clean_mobile = "".join(ch for ch in (mobile_number or "") if ch.isdigit())[-10:]
    if not clean_mobile:
        clean_mobile = "9876543210"

    vua = f"{clean_mobile}@onemoney"

    payload = {
        "consentDuration": {"unit": "MONTH", "value": "6"},
        "vua": vua,
        "dataRange": {
            "from": "2026-01-01T00:00:00Z",
            "to": "2026-10-31T23:59:59Z",
        },
        "context": [],
        "redirectUrl": redirect_url,
    }

    if not SETU_CLIENT_ID or not SETU_CLIENT_SECRET:
        return {
            "status": "CONSENT_REQUESTED",
            "mode": "local_aa_simulator",
            "vua": vua,
            "consentId": f"CR-SETU-{clean_mobile}",
            "message": "RBI Account Aggregator consent simulation active. (Set SETU_CLIENT_ID & SETU_CLIENT_SECRET for live Setu bridge)",
            "payloadPreview": payload,
        }

    try:
        req = urllib.request.Request(
            f"{SETU_BASE_URL}/consents",
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "x-client-id": SETU_CLIENT_ID,
                "x-client-secret": SETU_CLIENT_SECRET,
                "x-product-instance-id": SETU_PRODUCT_INSTANCE_ID,
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        return {
            "status": "ERROR",
            "vua": vua,
            "error": str(e),
            "fallback": "Using local consent handle"
        }
