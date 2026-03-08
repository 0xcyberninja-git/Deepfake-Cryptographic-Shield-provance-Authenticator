from core.crypto_verifier import verify_provenance
from core.ml_analyzer import analyze_media

def calculate_trust_score(stream_metadata: dict, stream_raw_data: bytes) -> dict:
    """
    Combines the Binary Cryptographic logic with Probabilistic ML to generate
    a comprehensive Trust Score (0-100) and an actionable OS-level command.
    """
    # Step 1: Crypto Verifier gives absolute truth if available
    crypto_result = verify_provenance(stream_metadata)
    
    # Step 2: ML Fallback if crypto fails or is missing
    ml_result = analyze_media(stream_raw_data)
    
    trust_score = 0
    action = "ALLOW"
    
    if crypto_result["is_verified"]:
        trust_score = 100
        action = "ALLOW_VERIFIED"
    else:
        # If not verified hardware, rely on ML
        synthetic_prob = ml_result["ml_synthetic_probability"]
        trust_score = 100 - synthetic_prob  # Base trust on inverse of synthetic prob
        
        if trust_score < 30:
            action = "MUTE_AND_FLAG" # Highly likely a deepfake
        elif trust_score < 70:
            action = "WARN" # Suspicious
        else:
            action = "ALLOW_UNVERIFIED"

    return {
        "overall_trust_score": round(trust_score, 2),
        "os_action": action,
        "crypto_validation": crypto_result,
        "ml_analysis": ml_result
    }
