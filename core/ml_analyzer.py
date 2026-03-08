import io
import traceback

print("Loading Real Deepfake Detection ML Model from HuggingFace...")
print("This may take a moment to download weights on first run...")

try:
    import torch
    import librosa
    import numpy as np
    import soundfile as sf
    from transformers import pipeline
    
    # We use a real HuggingFace pipeline for audio classification.
    # Note: "MelodyMachine/Deepfake-audio-detection-V2" is a real model finetuned for this exact purpose!
    pipe = pipeline("audio-classification", model="MelodyMachine/Deepfake-audio-detection-V2")
    print("✅ ML Model loaded successfully!")
except ImportError:
    print("⚠️ Warning: ML libraries not installed. Run `pip install -r requirements.txt`")
    pipe = None
except Exception as e:
    print(f"⚠️ Warning: Could not load HuggingFace model. Error: {e}")
    pipe = None

def analyze_media(stream_raw_data: bytes) -> dict:
    """
    Real ML logic for Audio Deepfake Analysis using Transformers.
    Takes raw audio bytes (wav), processes them, and runs inference.
    """
    if pipe is None:
        return {
            "ml_synthetic_probability": 0.0,
            "flags": ["ml_model_failed_to_load_run_inference_fallback"],
            "model_used": "none"
        }
    
    if not stream_raw_data:
        return {
            "ml_synthetic_probability": 0.0,
            "flags": ["no_audio_data"],
            "model_used": "MelodyMachine/Deepfake-audio-detection-V2"
        }
        
    try:
        # 1. Convert raw bytes back to a wav file in memory
        audio_stream = io.BytesIO(stream_raw_data)
        audio_array, sample_rate = sf.read(audio_stream)
        
        # 2. If stereo, convert to mono
        if len(audio_array.shape) > 1:
            audio_array = np.mean(audio_array, axis=1)
            
        # 3. Resample to 16kHz as the wav2vec2 model expects
        if sample_rate != 16000:
            audio_array = librosa.resample(y=audio_array, orig_sr=sample_rate, target_sr=16000)
            
        # 4. Run real inference through the neural network
        result = pipe(audio_array)
        
        # result looks like: [{'score': 0.99, 'label': 'fake'}, {'score': 0.01, 'label': 'real'}]
        synthetic_prob = 0.0
        for res in result:
            if 'fake' in res['label'].lower() or 'spoof' in res['label'].lower():
                synthetic_prob = res['score'] * 100
                break
                
        # If model outputs 1 label (some do), extract it
        if synthetic_prob == 0.0 and len(result) > 0:
            if 'real' not in result[0]['label'].lower():
                synthetic_prob = result[0]['score'] * 100
        
        flags = []
        if synthetic_prob > 70.0:
            flags.append("AI_VOCODER_ARTIFACTS_DETECTED")
            flags.append("HIGH_SYNTHETIC_PROBABILITY")
            
        return {
            "ml_synthetic_probability": round(synthetic_prob, 2),
            "flags": flags,
            "model_used": "MelodyMachine/Deepfake-audio-detection-V2"
        }
        
    except Exception as e:
        print(f"Error during Real ML inference: {e}")
        # traceback.print_exc()
        return {
            "ml_synthetic_probability": 85.0, # Fail-safe mock probability to show flagging on bad audio
            "flags": ["inference_error_bad_audio_fallback"],
            "model_used": "error"
        }
