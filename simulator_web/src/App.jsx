import React, { useState } from 'react';
import { Shield, Menu, X, Github } from 'lucide-react';

// Import Views
import Home from './components/Home';
import Vision from './components/Vision';
import Simulator from './components/Simulator';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
    const [activeTab, setActiveTab] = useState('HOME');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const tabs = [
        { id: 'HOME', label: 'Home' },
        { id: 'VISION', label: 'Vision' },
        { id: 'SIMULATOR', label: 'Explore Simulator' },
        { id: 'ABOUT', label: 'About Us' },
        { id: 'CONTACT', label: 'Contact' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'HOME': return <Home setTab={setActiveTab} />;
            case 'VISION': return <Vision />;
            case 'SIMULATOR': return <Simulator />;
            case 'ABOUT': return <About />;
            case 'CONTACT': return <Contact />;
            default: return <Home setTab={setActiveTab} />;
        }
    };

    return (
        <div className="min-h-screen matrix-bg text-white font-sans flex flex-col pt-20">

            {/* Sleek Fixed Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* Logo Section */}
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => setActiveTab('HOME')}
                        >
                            <Shield className="w-8 h-8 text-green-500 group-hover:drop-shadow-[0_0_15px_rgba(0,255,0,0.8)] transition-all" />
                            <span className="font-black text-xl tracking-tight hidden sm:block bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
                                Deepfake Shield
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === tab.id
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/50'
                                            : 'text-gray-400 hover:text-green-300 hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                            <a
                                href="https://github.com/0xcyberninja-git/Deepfake-Cryptographic-Shield-provance-Authenticator"
                                target="_blank"
                                rel="noreferrer"
                                className="ml-4 p-2 text-gray-400 hover:text-white transition-colors"
                                title="View Source on GitHub"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-green-500 p-2">
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-black/95 border-b border-green-500/30">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`block w-full text-left px-3 py-4 rounded-md text-base font-bold ${activeTab === tab.id
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Dynamic Render Container */}
            <main className="flex-1 w-full relative z-10 animate-fade-in-up pb-12">
                {renderContent()}
            </main>

            {/* Minimal Footer */}
            <footer className="border-t border-green-500/10 bg-black/50 py-6 text-center text-gray-500 text-sm mt-auto z-10">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center opacity-60">
                    <p>© 2026 Deepfake Cryptographic Shield. Open Source Project.</p>
                    <div className="flex gap-4 mt-4 sm:mt-0 font-mono">
                        <span>By Prateek Bheevgade</span>
                        <span>//</span>
                        <span>NFSU Research</span>
                    </div>
                </div>
            </footer>

        </div>
    );
}
