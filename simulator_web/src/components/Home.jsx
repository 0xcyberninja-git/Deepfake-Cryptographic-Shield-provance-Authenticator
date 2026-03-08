import React from 'react';
import { Shield, ChevronRight } from 'lucide-react';

export default function Home({ setTab }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 rounded-full"></div>
                <Shield className="w-32 h-32 text-green-400 relative z-10" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-green-300 via-green-500 to-emerald-700 text-transparent bg-clip-text">
                Verified Truth in the AI Era
            </h1>

            <p className="text-xl md:text-2xl text-green-500/80 max-w-3xl mb-12 font-light">
                The world's first OS-level cryptographic shield designed to detect, intercept, and destroy
                AI-generated voice cloning attacks before they reach your ears.
            </p>

            <div className="flex gap-6">
                <button
                    onClick={() => setTab('SIMULATOR')}
                    className="bg-green-600 hover:bg-green-500 text-black font-bold py-4 px-8 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all flex items-center gap-2"
                >
                    Initialize Live Simulator <ChevronRight className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setTab('VISION')}
                    className="bg-transparent border border-green-500/50 hover:border-green-400 hover:bg-green-900/30 text-green-400 font-bold py-4 px-8 rounded-lg transition-all"
                >
                    Our Vision
                </button>
            </div>
        </div>
    );
}
