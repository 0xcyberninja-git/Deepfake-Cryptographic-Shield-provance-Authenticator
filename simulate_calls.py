import requests
import time
import io
import numpy as np
import base64

try:
    import soundfile as sf
except ImportError:
    print("Please install soundfile: pip install soundfile")
    exit(1)

API_URL = "http://localhost:8001/api/v1/analyze-stream"

def generate_dummy_audio(is_fake=False):
    """
    Generates 1 second of audio.
    In real life this would be recorded from the microphone.
    """
    sample_rate = 16000
    t = np.linspace(0, 1.0, int(sample_rate * 1.0))
    
    if is_fake:
        # Generate some harsh unnatural noise as 'fake' to try and trip up the model
        audio = 0.5 * np.sin(2 * np.pi * 880 * t) + np.random.normal(0, 0.5, len(t))
    else:
        # Generate a clean 440Hz sine wave
        audio = 0.5 * np.sin(2 * np.pi * 440 * t)
        
    wav_io = io.BytesIO()
    sf.write(wav_io, audio, sample_rate, format='WAV')
    wav_bytes = wav_io.getvalue()
    
    return base64.b64encode(wav_bytes).decode('utf-8')

def simulate_incoming_call(caller_name, signature, public_key, is_fake_audio=False):
    print(f"\n📞 Incoming audio stream from: {caller_name}")
    print("Shielding active. Neural Network analyzing media...")
    
    # Generate base64 encoding of a real .wav file in memory
    base64_audio = generate_dummy_audio(is_fake=is_fake_audio)
    
    payload = {
        "caller_id": caller_name,
        "hardware_signature": signature,
        "public_key": public_key,
        "raw_media_chunk": base64_audio
    }
    
    try:
        response = requests.post(API_URL, json=payload)
        data = response.json()
        
        result = data.get("analysis_result", {})
        trust_score = result.get("overall_trust_score")
        action = result.get("os_action")
        ml_flags = result.get("ml_analysis", {}).get("flags", [])
        probability = result.get("ml_analysis", {}).get("ml_synthetic_probability", 0)
        
        print(f"🤖 Native ML Model Deepfake Probability: {probability}%")
        if ml_flags:
            print(f"🚩 ML Flags Triggered: {ml_flags}")
            
        print(f"📊 Final Trust Score: {trust_score}/100")
        
        if action == "ALLOW_VERIFIED":
            print("✅ ACTION: ALLOW CALL.")
            print("Reason: Cryptographic hardware signature verified. This is genuinely their device.")
        elif action == "MUTE_AND_FLAG":
            print("🚨 ACTION: INSTANT MUTE & FLAG!")
            print("Reason: No hardware signature found AND Neural Network detected deepfake audio anomalies.")
        else:
            print("⚠️ ACTION: WARN USER.")
            print("Reason: Audio lacking hardware signature but ML found no obvious artifacts. Proceed with caution.")
            
    except Exception as e:
        print(f"Error connecting to the Deepfake Shield backend: {e}")

if __name__ == "__main__":
    print("==================================================")
    print("🛡️  REAL DEEPFAKE SHIELD AI INFERENCE DEMO 🛡️")
    print("==================================================")
    
    print("\n--- SCENARIO 1: Genuine Call ---")
    simulate_incoming_call(
        caller_name="Wife", 
        signature="0xTRUSTED_HW_APPLE_12345", 
        public_key="PUB_KEY_ABC",
        is_fake_audio=False
    )
    
    print("\n-------------------------------------------------\n")
    
    print("--- SCENARIO 2: Deepfake Scam Call ---")
    simulate_incoming_call(
        caller_name="CEO (Scammer)", 
        signature=None, 
        public_key=None,
        is_fake_audio=True
    )
    
    print("\n==================================================")
