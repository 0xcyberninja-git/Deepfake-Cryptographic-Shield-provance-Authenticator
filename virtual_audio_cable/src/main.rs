use cpal::traits::{DeviceTrait, HostTrait, StreamTrait};
use tokio::runtime::Runtime;
use hyper::{Client, Request, Body, Method};
use base64::{engine::general_purpose, Engine as _};
use serde_json::json;
use std::sync::{Arc, Mutex};
use std::time::Duration;

const API_URL: &str = "http://localhost:8001/api/v1/analyze-stream";

fn main() -> anyhow::Result<()> {
    println!("🛡️  Initializing Rust Virtual Audio Cable Interceptor...");

    // Setup CPAL for accessing audio system (WASAPI on Windows, ALSA on Linux)
    let host = cpal::default_host();
    let device = host.default_input_device()
        .expect("No input device available. Are you running a Virtual Audio loopback?");

    let config = device.default_input_config()?;
    println!("🎤 Default Input Audio Device: {}", device.name()?);
    println!("🔊 Capturing format: {:?}", config);

    let rt = Runtime::new()?;
    let buffer = Arc::new(Mutex::new(Vec::new()));

    // The callback processes microscopic chunks of incoming live audio
    let audio_callback = move |data: &[f32], _: &cpal::InputCallbackInfo| {
        let mut buf = buffer.lock().unwrap();
        // Pack into 16-bit PCM (standard representation)
        for &sample in data {
            let pcm_sample = (sample * i16::MAX as f32) as i16;
            buf.extend_from_slice(&pcm_sample.to_ne_bytes());
        }

        // If we crossed 1 second of data (44100 frames * 2 bytes = 88200 bytes)
        // Fire it to the Python ML ML
        if buf.len() > 88200 {
            let payload_bytes = buf.clone();
            buf.clear(); // Reset 

            // Spawn non-blocking thread to submit to Python
            rt.spawn(async move {
                let base64_audio = general_purpose::STANDARD.encode(&payload_bytes);
                let payload = json!({
                    "caller_id": "Rust Audio Interceptor",
                    "raw_media_chunk": base64_audio
                });

                let client = Client::new();
                let req = Request::builder()
                    .method(Method::POST)
                    .uri(API_URL)
                    .header("content-type", "application/json")
                    .body(Body::from(payload.to_string()))
                    .unwrap();

                // If deepfake discovered, log it. (In production, trigger mute)
                if let Ok(res) = client.request(req).await {
                    let bytes = hyper::body::to_bytes(res.into_body()).await.unwrap();
                    let response_text = String::from_utf8(bytes.to_vec()).unwrap();
                    if response_text.contains("MUTE_AND_FLAG") {
                        println!("🚨 Rust OS Layer: DEEPFAKE SIGNAL DETECTED. Issuing Hardware MUTE commands immediately.");
                        // system_mute_implementation_here()
                    }
                }
            });
        }
    };

    let stream = device.build_input_stream(
        &config.into(),
        audio_callback,
        |err| eprintln!("Audio stream error: {}", err),
        None
    )?;

    stream.play()?;
    std::thread::sleep(Duration::from_secs(3600)); // Listen for an hour

    Ok(())
}
