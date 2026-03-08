from pydantic import BaseModel
from typing import Optional

def verify_provenance(stream_metadata: dict) -> dict:
    """
    Mock logic for Cryptographic Provenance Verification (e.g., C2PA standard).
    In a real scenario, this would check the digital signatures embedded in the video
    or audio stream from hardware root-of-trust (like TrueDepth or secure enclave).
    """
    signature = stream_metadata.get("hardware_signature")
    public_key = stream_metadata.get("public_key")
    
    if not signature or not public_key:
        return {
            "is_verified": False,
            "confidence": 0,
            "reason": "Missing hardware cryptographic signature."
        }
        
    # Mocking successful verification for specific 'trusted' signatures
    if signature.startswith("0xTRUSTED_HW"):
        return {
            "is_verified": True,
            "confidence": 100,
            "reason": "Cryptographic watermark matched trusted manufacturer PKI."
        }
    else:
        return {
            "is_verified": False,
            "confidence": 0,
            "reason": "Invalid or tampered cryptographic signature."
        }
