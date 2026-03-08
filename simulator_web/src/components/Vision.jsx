import React from 'react';
import { AlertTriangle, Lock, Cpu, EyeOff } from 'lucide-react';

export default function Vision() {
    const pillars = [
        {
            icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
            title: "The Silent Epidemic",
            desc: "By 2026, AI voice synthesis is indistinguishable from reality. Currently, users are forced to rely on their own hearing to identify a scammers' deepfake of their CEO or family member. We are losing this war."
        },
        {
            icon: <EyeOff className="w-8 h-8 text-blue-500" />,
            title: "Invisible Interception",
            desc: "Our solution isn't a website you upload to. It's a Virtual Audio Driver. It sits silently in the background, intercepting incoming VoIP streams to analyze the raw mathematics of the audio milliseconds before it hits your speakers."
        },
        {
            icon: <Lock className="w-8 h-8 text-green-500" />,
            title: "Cryptographic Provenance",
            desc: "We utilize C2PA standards. When genuine modern smartphones capture audio, they embed an unbreakable hardware signature. Scammer laptops running AI do not possess this 'passport'. We drop the call."
        },
        {
            icon: <Cpu className="w-8 h-8 text-purple-500" />,
            title: "Adversarial Neural Nets",
            desc: "For calls missing a passport, our fail-safe is a localized Wav2Vec Transformers model. It scans the spectrogram for microscopic phase discontinuities and artificial vocoder artifacts, initiating an OS-level kill switch upon detection."
        }
    ];

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-green-400 mb-4">Why We Build</h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Shifting the burden of defense from human psychology to mathematical certainty.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pillars.map((p, i) => (
                    <div key={i} className="bg-black/60 border border-green-500/20 p-8 rounded-xl hover:border-green-500/50 transition-all group shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                        <div className="mb-6 bg-gray-900/50 w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            {p.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{p.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{p.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
