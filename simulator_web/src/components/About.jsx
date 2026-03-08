import React from 'react';
import { Mail, Linkedin, MapPin, Award, Terminal } from 'lucide-react';

export default function About() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="bg-black/80 border-t-4 border-green-500 rounded-xl p-8 md:p-12 shadow-[0_0_40px_rgba(0,255,0,0.1)] relative overflow-hidden">

                {/* Background circuit pattern */}
                <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                    <svg width="400" height="400" viewBox="0 0 100 100">
                        <path d="M10 10 h 80 v 80 M 30 10 v 30 h 40 M 10 50 h 20 v 40" stroke="#4ade80" strokeWidth="0.5" fill="none" />
                    </svg>
                </div>

                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">

                    <div className="w-48 h-48 rounded-full border-4 border-green-500/30 overflow-hidden flex-shrink-0 bg-gray-900 flex items-center justify-center">
                        <Terminal className="w-20 h-20 text-green-500/50" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-black text-white mb-2">Prateek Bheevgade</h1>
                        <h2 className="text-xl text-green-400 font-mono mb-4 flex items-center justify-center md:justify-start gap-2">
                            <Award className="w-5 h-5" /> AI Researcher & Architect
                        </h2>

                        <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                            Prateek is an Artificial Intelligence Researcher at the National Forensic Sciences University (NFSU). He specializes in bridging the gap between deep learning, offensive cybersecurity, and adversarial machine learning. His research focuses on building robust countermeasures against next-generation synthetic media and AI-driven social engineering.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a
                                href="https://www.linkedin.com/in/pratiekbhivgade/"
                                target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 bg-[#0077b5] hover:bg-[#005c8c] text-white px-6 py-3 rounded-lg font-bold transition-colors"
                            >
                                <Linkedin className="w-5 h-5" /> Connect on LinkedIn
                            </a>
                            <a
                                href="mailto:prateek.vijay.bheevgade@gmail.com"
                                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold border border-gray-600 transition-colors"
                            >
                                <Mail className="w-5 h-5" /> Contact Email
                            </a>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm font-mono">
                            <MapPin className="w-4 h-4" /> National Forensic Sciences University (NFSU)
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
