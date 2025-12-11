'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MBTI_TYPES = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];

export default function Home() {
  const [name, setName] = useState('');
  const [mbti, setMbti] = useState('');
  const [step, setStep] = useState<'name' | 'mbti'>('name');
  const router = useRouter();

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStep('mbti');
  };

  const handleMbtiSelect = (selectedMbti: string) => {
    setMbti(selectedMbti);
  };

  const handleFinalSubmit = () => {
    if (!name.trim() || !mbti) return;
    router.push(`/roadmap?name=${encodeURIComponent(name)}&mbti=${mbti}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6 relative overflow-hidden">
        {/* Background Aurora Effect */}
        <div className="aurora-bg"></div>

      <div className="text-center max-w-md w-full z-10">
        {/* Birthday Badge */}
        <div className="mb-4 inline-block px-4 py-2 rounded-full border border-cyan-400 bg-cyan-950/30 text-xs text-cyan-300 font-semibold tracking-widest animate-pulse">
            🎂 12.12 BIRTHDAY LAUNCH 🎂
        </div>
        
        {/* Title */}
        <h1 className="text-5xl font-black mb-3 tracking-tighter">
          COSMIC <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">AURA</span>
        </h1>
        <p className="text-zinc-400 mb-2 text-lg font-semibold">Your 2025 Cosmic Blueprint</p>
        <p className="text-zinc-500 mb-10 text-sm">Career roadmap + Personal growth plan, architected by the universe</p>
        
        {/* Step 1: Name */}
        {step === 'name' && (
          <form onSubmit={handleNameSubmit} className="flex flex-col gap-4">
            <label className="text-xs uppercase tracking-widest text-cyan-300">Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your name..." 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center text-xl font-bold focus:outline-none focus:border-cyan-500 transition placeholder:text-zinc-600"
              autoFocus
            />
            <button 
              type="submit"
              disabled={!name}
              className="bg-white text-black py-4 rounded-xl font-black text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition disabled:opacity-50"
            >
              NEXT STEP 📡
            </button>
          </form>
        )}

        {/* Step 2: MBTI Selection */}
        {step === 'mbti' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-cyan-300 block mb-4">
                Select Your MBTI Type
              </label>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {MBTI_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleMbtiSelect(type)}
                    className={`p-3 rounded-lg font-bold text-sm transition-all ${
                      mbti === type
                        ? 'bg-cyan-500 text-black border border-cyan-400'
                        : 'bg-zinc-900 border border-zinc-800 hover:border-cyan-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {mbti && (
                <button
                  onClick={handleFinalSubmit}
                  className="w-full bg-white text-black py-4 rounded-xl font-black text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition"
                >
                  REVEAL YOUR DESTINY 🌌
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Info Text */}
        {step === 'name' && (
          <p className="text-zinc-600 text-xs mt-6 leading-relaxed">
            ✨ We will analyze your cosmic frequency + MBTI to create your 2025 roadmap
          </p>
        )}
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 text-zinc-700 text-xs text-center">
        <p className="font-mono">Physics × Psychology × Your Future</p>
        <p className="opacity-50 mt-1">Celebrating 12.12 Birthday Special ✨</p>
      </div>
    </main>
  );
}