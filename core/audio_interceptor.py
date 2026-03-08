import pyaudio
import numpy as np
import time
import requests
import base64
import os

# Configuration for Live Audio Streaming
CHUNK = 1024 * 4  # Read 4K frames at a time
FORMAT = pyaudio.paInt16
CHANNELS = 1 # Mono processing for the ML model
# Linux ALSA usually expects 44100 or 48000 Hz for default capture.
# We will capture at 44100 and resample later if needed (though the backend script does it already!)
RATE = 44100 

import librosa

API_URL = "http://localhost:8001/api/v1/analyze-stream"

def trigger_kill_switch():
    """
    This is the ultimate OS-level defense. 
    If a deepfake is detected, we instantly mute the physical speakers!
    (For Linux, we use amixer or wpctl. For Windows, we'd use pycaw).
    """
    print("\n🚨🚨 EXECUTING KILL SWITCH: MUTING SYSTEM AUDIO 🚨🚨")
    # For Linux (PulseAudio/PipeWire)
    os.system("amixer -D pulse sset Master mute > /dev/null 2>&1")
    # Or Pipewire: os.system("wpctl set-mute @DEFAULT_AUDIO_SINK@ 1")

def analyze_audio_chunk(audio_data):
    """Sends a chunk of LIVE audio bytes to our local ML Brain."""
    try:
        # Convert raw binary to numpy array
        audio_np = np.frombuffer(audio_data, dtype=np.int16).astype(np.float32) / 32768.0
        
        # Resample to 16000Hz before sending to save bandwidth and fit ML model
        audio_16k = librosa.resample(y=audio_np, orig_sr=RATE, target_sr=16000)
        
        # Convert back to standard 16-bit PCM bytes
        audio_bytes = (audio_16k * 32767).astype(np.int16).tobytes()
        
        # Encode raw binary audio to safely send over HTTP
        base64_audio = base64.b64encode(audio_bytes).decode('utf-8')
        payload = {
            "caller_id": "System Audio Stream",
            "raw_media_chunk": base64_audio
        }
        
        # Send to the backend running on port 8001
        response = requests.post(API_URL, json=payload, timeout=2)
        if response.status_code == 200:
            result = response.json().get("analysis_result", {})
            ml_prob = result.get("ml_analysis", {}).get("ml_synthetic_probability", 0)
            
            if ml_prob > 75.0:
                print(f"🛑 [DEEPFAKE DETECTED] Neural Probability: {ml_prob}%")
                trigger_kill_switch()
            else:
                print(f"✅ [Live Audio Safe] Neural Probability: {ml_prob}%")
    except Exception as e:
        print(f"API Error: Make sure main.py is running! ({e})")

def start_listening():
    """
    Hooks into the computer's audio interface to intercept the stream.
    """
    p = pyaudio.PyAudio()

    print("\n🎧 Initializing OS Audio Interceptor...")
    try:
        # Open a live stream from the default system microphone (or virtual cable)
        stream = p.open(format=FORMAT,
                        channels=CHANNELS,
                        rate=RATE,
                        input=True,
                        frames_per_buffer=CHUNK)
        
        print("🔴 INTERCEPTOR ACTIVE: Listening to live audio in 1-second chunks. Press Ctrl+C to stop.")
        
        accumulated_data = b""
        
        while True:
            # Continuously siphon raw audio binary from the system
            data = stream.read(CHUNK, exception_on_overflow=False)
            accumulated_data += data
            
            # Once we collect 1 full second of audio (16000 frames * 2 bytes = 32000 bytes)
            if len(accumulated_data) >= RATE * 2:
                analyze_audio_chunk(accumulated_data)
                accumulated_data = b"" # Reset buffer for the next second
                
    except KeyboardInterrupt:
        print("\n🛑 Stopping Interceptor...")
    finally:
        try:
            stream.stop_stream()
            stream.close()
            p.terminate()
        except:
            pass

if __name__ == "__main__":
    print("==================================================")
    print("🛡️  DEEPFAKE SHIELD: LIVE OS INTERCEPTOR 🛡️")
    print("==================================================")
    start_listening()
