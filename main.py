from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from core.trust_engine import calculate_trust_score
import base64

app = FastAPI(title="Deepfake Shield API", version="0.1.0")

class MediaStreamPayload(BaseModel):
    caller_id: str
    hardware_signature: Optional[str] = None
    public_key: Optional[str] = None
    raw_media_chunk: Optional[str] = None

@app.post("/api/v1/analyze-stream")
def analyze_stream(payload: MediaStreamPayload):
    """
    Receives base64 encoded audio from a VOIP call, decodes it, and runs
    cryptographic and ML analysis.
    """
    metadata = {
        "hardware_signature": payload.hardware_signature,
        "public_key": payload.public_key
    }
    
    # Decode base64 audio into raw bytes
    raw_data = b""
    if payload.raw_media_chunk:
        try:
            raw_data = base64.b64decode(payload.raw_media_chunk)
        except Exception as e:
            print(f"Failed to decode base64: {e}")
            raw_data = b""
            
    result = calculate_trust_score(stream_metadata=metadata, stream_raw_data=raw_data)
    
    return {
        "status": "success",
        "caller_id": payload.caller_id,
        "analysis_result": result
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
