import React from 'react';
import { AlertOctagon, Target, Microscope, ShieldCheck } from 'lucide-react';

export default function Solution() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4">

            {/* Problem Statement Section */}
            <div className="mb-20">
                <div className="flex items-center gap-4 mb-6 border-b border-red-500/30 pb-4">
                    <AlertOctagon className="w-10 h-10 text-red-500" />
                    <h2 className="text-4xl font-black text-red-400">The Problem</h2>
                </div>

                <div className="bg-black/80 border-l-4 border-red-500 p-8 rounded-r-xl shadow-[0_0_30px_rgba(255,0,0,0.1)]">
                    <p className="text-xl text-gray-300 leading-relaxed mb-6 font-light">
                        We are facing a fundamental crisis of trust in digital communications. As generative AI models and neural vocoders have become hyper-accessible, <strong className="text-white">it now takes less than 3 seconds of reference audio to perfectly clone a human voice.</strong>
                    </p>
                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                        Historically, the cybersecurity industry has relied on user education. We train people to "look for the signs" of a phishing email. However, the human brain is physiologically incapable of distinguishing a mathematically perfect AI voice clone from a real family member in distress or a CEO ordering a wire transfer. We are fighting a machine war with human biology, and we are losing.
                    </p>
                </div>
            </div>

            {/* Solution Section */}
            <div>
                <div className="flex items-center gap-4 mb-6 border-b border-green-500/30 pb-4">
                    <Target className="w-10 h-10 text-green-500" />
                    <h2 className="text-4xl font-black text-green-400">Our Solution</h2>
                </div>

                <div className="bg-gradient-to-br from-green-900/20 to-black border border-green-500/30 p-8 rounded-xl shadow-[0_0_30px_rgba(0,255,0,0.1)] mb-12">
                    <p className="text-xl text-green-100/90 leading-relaxed font-light">
                        Deepfake Cryptographic Shield removes the human entirely from the defense loop. It operates as an <strong className="text-white">invisible, OS-level interception system</strong> that analyzes incoming audio packets for cryptographic provenance and adversarial neural signatures before they are ever played through the physical speakers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-black/60 border border-emerald-500/20 p-8 rounded-xl hover:border-emerald-500/50 transition-all">
                        <ShieldCheck className="w-12 h-12 text-emerald-400 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">1. Cryptographic Provenance Verification</h3>
                        <p className="text-gray-400 leading-relaxed">
                            We leverage the C2PA (Coalition for Content Provenance and Authenticity) standard. Authentic hardware (like an iPhone's Secure Enclave or a verified enterprise headset) cryptographically signs the audio it records. If an incoming VoIP call is entirely missing this hardware-backed "digital passport," our system instantly flags the stream as synthetically generated or tampered with.
                        </p>
                    </div>

                    <div className="bg-black/60 border border-blue-500/20 p-8 rounded-xl hover:border-blue-500/50 transition-all">
                        <Microscope className="w-12 h-12 text-blue-400 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">2. Adversarial Spectrogram Analysis</h3>
                        <p className="text-gray-400 leading-relaxed">
                            If a call's origin is suspicious, it is routed through our localized, highly-optimized Wav2Vec Transformers model. This neural network doesn't "listen" to the words; it analyzes the microsecond mathematics of the spectrogram, searching for phase discontinuities, unnatural vocal tract geometry, and artifacts introduced by AI vocoders (like ElevenLabs).
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
