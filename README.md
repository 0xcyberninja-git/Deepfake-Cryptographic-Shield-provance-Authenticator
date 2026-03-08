# Deepfake Cryptographic Shield & Provenance Authenticator

## Overview
This project is a localized OS-level tool designed to protect users from deepfakes, highly realistic synthetic audio, and AI-driven phishing in real-time. Instead of purely relying on playing a cat-and-mouse game with generative ML models, it fundamentally relies on *cryptographic provenance* (like C2PA standards) mapped to trusted hardware, layered with an Adversarial ML model as a fallback scoring system.

## Core Architecture
1. **Provenance Verifier (`core/crypto_verifier.py`)**: 
   - Inspects incoming media streams/files for cryptographic watermarks embedded by trusted hardware (cameras, mics).
   - Validates signatures against public key infrastructure.

2. **Adversarial ML Fallback (`core/ml_analyzer.py`)**: 
   - For streams missing hardware provenance, it analyzes anomalies in audio/video (e.g., mismatched lip-sync, unnatural spectral artifacts in audio).
   - Provides a real-time component to the "Trust Score".

3. **Trust Scoring Engine (`core/trust_engine.py`)**: 
   - Combines Cryptographic Verification (Binary: True/False) + ML Analysis (Probabilistic) to generate a unified Trust Score (1-100).

4. **Service Daemon & UI (`main.py`, `ui/`)**: 
   - A local service (e.g., FastAPI or local gRPC) that monitors networking or virtual audio/video drivers.
   - Triggers warnings or instantly mutes potentially malicious audio.

## Next Steps for Development
- **Phase 1**: Prototype the backend API that takes an audio/video file and returns a trust score.
- **Phase 2**: Implement mock cryptographic watermarking and verification.
- **Phase 3**: Integrate a lightweight audio-analysis ML model.
- **Phase 4**: Build a UI (e.g., system tray icon or overlay) to display the trust score during simulated voice/video calls.
