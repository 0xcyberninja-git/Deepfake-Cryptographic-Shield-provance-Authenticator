import React from 'react';
import { Send, Mail, MapPin } from 'lucide-react';

export default function Contact() {
    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-green-400 mb-4">Initialize Communications</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Interested in contributing to the open-source shield? Have questions about adversarial machine learning research? Reach out directly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                <div className="col-span-1 md:col-span-2 space-y-8">
                    <div className="bg-black/60 border border-gray-800 p-6 rounded-xl">
                        <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center text-green-500 mb-4">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Direct Email</h3>
                        <p className="text-gray-400 mb-4 text-sm">Send me a secure transmission.</p>
                        <a href="mailto:prateek.vijay.bheevgade@gmail.com" className="text-green-400 hover:text-green-300 font-mono text-sm break-all">
                            prateek.vijay.bheevgade@gmail.com
                        </a>
                    </div>

                    <div className="bg-black/60 border border-gray-800 p-6 rounded-xl">
                        <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-500 mb-4">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                        <p className="text-gray-400 text-sm">National Forensic Sciences University, India</p>
                    </div>
                </div>

                <div className="col-span-1 md:col-span-3 bg-black/60 border border-green-500/30 p-8 rounded-xl relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full pointer-events-none"></div>

                    <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("System Message: In this simulator, emails are purely aesthetic logic. Please click the direct email link instead!"); }}>
                        <div>
                            <label className="block text-sm font-mono text-green-500 mb-2">SYS_ID // NAME</label>
                            <input type="text" className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors" placeholder="Enter your designation" />
                        </div>
                        <div>
                            <label className="block text-sm font-mono text-green-500 mb-2">COM_LINK // EMAIL</label>
                            <input type="email" className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors" placeholder="secure.com@domain.net" />
                        </div>
                        <div>
                            <label className="block text-sm font-mono text-green-500 mb-2">PAYLOAD // MESSAGE</label>
                            <textarea rows="5" className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors resize-none" placeholder="Enter the data payload..."></textarea>
                        </div>
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                            <Send className="w-5 h-5" /> Transmit Data
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
