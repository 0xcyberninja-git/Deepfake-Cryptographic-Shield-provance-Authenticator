import React, { useState, useEffect } from 'react';
import { Shield, PhoneIncoming, PhoneOff, Fingerprint, Activity, AlertTriangle, CheckCircle, Volume2, ShieldAlert } from 'lucide-react';

const Simulator = () => {
  const [callState, setCallState] = useState('IDLE'); // IDLE, RINGING, ANALYZING, ALLOWED, MUTED
  const [scenario, setScenario] = useState(null);
  const [logs, setLogs] = useState([]);
  const [trustScore, setTrustScore] = useState(100);

  const addLog = (msg, isError = false) => {
    setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), msg, isError }]);
  };

  const startSimulation = (type) => {
    setLogs([]);
    setScenario(type);
    setCallState('RINGING');
    setTrustScore(100);
    addLog(`Incoming call initiated: ${type === 'GENUINE' ? "Mom's Cellphone" : 'Unknown Number (AI Scam)'}`);

    setTimeout(() => {
      setCallState('ANALYZING');
      addLog('OS Interceptor: Intercepting Audio Stream (Virtual Cable Active)');

      setTimeout(() => {
        addLog('Crypto Verifier: Checking for C2PA Hardware Signature...');
        if (type === 'GENUINE') {
          setTimeout(() => {
            addLog('✅ Valid C2PA Hardware Certificate Found (Apple Secure Enclave).', false);
            addLog('✅ Bypass Deep Neural Analysis - Device Authenticated.', false);
            setTrustScore(100);
          }, 1000);

          setTimeout(() => {
            setCallState('ALLOWED');
          }, 2500);

        } else {
          // Fake
          setTimeout(() => {
            addLog('⚠️ NO C2PA CERTIFICATE FOUND. Routing to ML Defense Engine.', true);
            setTrustScore(80);
          }, 1000);

          setTimeout(() => {
            addLog('ML Engine: Slicing 100ms chunks into raw frequency spectrograms...');
          }, 2000);

          setTimeout(() => {
            addLog('ML Engine (Wav2Vec): Scanning for Neural Vocoder synthetic anomalies...', true);
            setTrustScore(40);
          }, 3000);

          setTimeout(() => {
            addLog('🚨 ML Engine: CRITICAL. Detected Phase Discontinuities and Missing Human Breath Frequencies!', true);
            setTrustScore(12);
          }, 4500);

          setTimeout(() => {
            addLog('Trust Engine Verdict: DEEPFAKE DETECTED. Executing OS-Level Kill Switch.', true);
            setCallState('MUTED');
          }, 5500);
        }
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen matrix-bg p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-green-500/30 pb-6">
          <div className="flex items-center gap-4">
            <Shield className="w-12 h-12 text-green-500" />
            <div>
              <h1 className="text-4xl font-black text-green-400">Deepfake Cryptographic Shield</h1>
              <p className="text-green-500/70 text-lg">Real-Time OS Defense Simulation Telemetry</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="bg-black/80 border border-green-500/50 rounded-lg p-6 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
            <h2 className="text-xl text-green-400 font-bold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5" /> Test Scenarios
            </h2>

            <div className="space-y-4">
              <button
                disabled={callState !== 'IDLE' && callState !== 'ALLOWED' && callState !== 'MUTED'}
                onClick={() => startSimulation('GENUINE')}
                className="w-full bg-green-900/40 border-2 border-green-500 hover:bg-green-800/60 disabled:opacity-50 text-green-300 p-4 rounded text-left transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold">1. Genuine Call (Hardware Authenticated)</div>
                  <div className="text-xs opacity-70 mt-1">Simulates call from registered smartphone.</div>
                </div>
                <PhoneIncoming className="w-6 h-6" />
              </button>

              <button
                disabled={callState !== 'IDLE' && callState !== 'ALLOWED' && callState !== 'MUTED'}
                onClick={() => startSimulation('FAKE')}
                className="w-full bg-red-900/40 border-2 border-red-500 hover:bg-red-800/60 disabled:opacity-50 text-red-300 p-4 rounded text-left transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold">2. AI Voice Clone (Scam Deepfake)</div>
                  <div className="text-xs opacity-70 mt-1">Simulates ElevenLabs API synthetic voice attack.</div>
                </div>
                <ShieldAlert className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-8">
              <div className="text-sm text-green-500/60 mb-2">Live Trust Score Gauge</div>
              <div className="w-full h-8 bg-black border border-green-500/30 rounded overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-1000 ${trustScore > 75 ? 'bg-green-500' : trustScore > 40 ? 'bg-yellow-500' : 'bg-red-600'}`}
                  style={{ width: `${trustScore}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-white drop-shadow-md">
                  {trustScore}/100
                </div>
              </div>
            </div>
          </div>

          {/* Central Visualization */}
          <div className="bg-black/90 border border-green-500/30 rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
            {callState === 'IDLE' && (
              <div className="text-center opacity-50">
                <Shield className="w-24 h-24 mx-auto mb-4" />
                <p className="text-xl">SYSTEM READY. AWAITING AUDIO STREAM...</p>
              </div>
            )}

            {callState === 'RINGING' && (
              <div className="text-center animate-pulse">
                <PhoneIncoming className="w-24 h-24 mx-auto mb-4 text-blue-500" />
                <p className="text-xl text-blue-400 font-bold">INCOMING CALL DETECTED</p>
                <p className="text-sm mt-2">Routing through OS Virtual Audio Driver...</p>
              </div>
            )}

            {callState === 'ANALYZING' && (
              <div className="text-center">
                <Activity className="w-24 h-24 mx-auto mb-4 text-yellow-500 animate-spin" />
                <p className="text-xl text-yellow-400 font-bold animate-pulse">DEEP TIER ANALYSIS ACTIVE</p>
                <div className="flex gap-4 mt-8 justify-center">
                  <div className={`p-4 border rounded ${trustScore === 100 ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
                    <Fingerprint className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-xs">C2PA Passport</div>
                  </div>
                  <div className={`p-4 border rounded ${trustScore < 100 ? 'border-yellow-500 text-yellow-500 animate-pulse' : 'border-gray-700 text-gray-700'}`}>
                    <Activity className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-xs">Wav2Vec Neural Net</div>
                  </div>
                </div>
              </div>
            )}

            {callState === 'ALLOWED' && (
              <div className="text-center">
                <CheckCircle className="w-32 h-32 mx-auto mb-6 text-green-500 glow-green" />
                <h2 className="text-3xl font-black text-green-400 bg-green-900/30 px-6 py-2 rounded border border-green-500">CALL ALLOWED</h2>
                <p className="mt-4 text-green-500/80">Hardware origin cryptographically verified.</p>
              </div>
            )}

            {callState === 'MUTED' && (
              <div className="text-center z-10">
                <PhoneOff className="w-32 h-32 mx-auto mb-6 text-red-500 animate-pulse" />
                <h2 className="text-4xl font-black text-red-500 bg-red-900/50 px-8 py-4 rounded-lg border-2 border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.4)]">
                  OS KILL SWITCH ENGAGED
                </h2>
                <p className="mt-6 text-red-300 font-bold text-lg px-4 py-2 bg-black border border-red-500 inline-block">SYSTEM AUDIO MUTED FOR YOUR PROTECTION</p>
              </div>
            )}

            {/* Background Red Warning Effect for Muted */}
            {callState === 'MUTED' && (
              <div className="absolute inset-0 bg-red-900/20 pointer-events-none animate-pulse-fast"></div>
            )}
          </div>

          {/* Terminal / Logs Output */}
          <div className="bg-black border border-green-500/50 rounded-lg p-4 shadow-[0_0_15px_rgba(0,255,0,0.1)] flex flex-col h-[400px]">
            <h2 className="text-sm text-green-500 border-b border-green-500/30 pb-2 mb-2">Live Backend Telemetry stdout</h2>
            <div className="flex-1 overflow-y-auto font-mono text-sm space-y-2 pb-4">
              {logs.map((log, i) => (
                <div key={i} className={`flex gap-2 ${log.isError ? 'text-red-400' : 'text-green-400'}`}>
                  <span className="opacity-50 flex-shrink-0">[{log.time}]</span>
                  <span>{log.msg}</span>
                </div>
              ))}
              {callState === 'ANALYZING' && (
                <div className="flex gap-2 text-yellow-500 animate-pulse">
                  <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
                  <span>Processing layer...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
