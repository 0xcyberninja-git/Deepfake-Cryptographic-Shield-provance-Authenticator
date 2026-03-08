import { useState, useEffect } from "react";
// Simulated Tauri IPC calls
// import { invoke } from "@tauri-apps/api/tauri";

export default function App() {
    const [trustScore, setTrustScore] = useState(100);
    const [activeCall, setActiveCall] = useState(false);
    const [isDeepfake, setIsDeepfake] = useState(false);

    useEffect(() => {
        // In production, sync this via WebSockets to localhost:8001/api/state
        const interval = setInterval(() => {
            // Mocking OS-level state updates from the Python Pipeline
            // If trust score dips below 75, trigger warning.
            if (trustScore < 75) {
                setIsDeepfake(true);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [trustScore]);

    return (
        <div className={`h-screen w-full flex flex-col items-center justify-center text-white ${isDeepfake ? "bg-red-900" : "bg-black"}`}>
            <div className="absolute top-4 left-4 p-2 font-mono text-green-500 font-bold border border-green-500 rounded">
                SHIELD ACTIVE
            </div>

            {!activeCall ? (
                <h1 className="text-xl opacity-50">Monitoring Inbound Audio...</h1>
            ) : (
                <div className="text-center font-mono">
                    <h2 className="text-sm opacity-70 mb-2">Analyzing VoIP Stream:</h2>
                    <div className="text-6xl font-black mb-4">{trustScore}/100</div>

                    {isDeepfake && (
                        <div className="bg-black/50 p-6 rounded-lg border-2 border-red-500 inline-block animate-pulse">
                            <h1 className="text-3xl text-red-500 font-bold mb-2">🚨 DEEPFAKE DETECTED</h1>
                            <p className="text-red-300">Hardware Crypto Hash Missing.</p>
                            <p className="text-red-300">Neural Signatures: Synthetic Vocoder detected.</p>
                            <p className="font-bold mt-4 border border-red-500 text-red-100 px-4 py-2 inline-block rounded">SYSTEM VOLUME MUTED</p>
                        </div>
                    )}

                    {!isDeepfake && (
                        <div className="text-green-400">
                            ✅ Provenance Authenticated. Call Safe.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
