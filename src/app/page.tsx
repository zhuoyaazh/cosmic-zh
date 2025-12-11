'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    router.push(`/result?name=${encodeURIComponent(name)}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6 relative overflow-hidden">
        {/* Background effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-indigo-900/20 via-black to-black -z-10"></div>

      <div className="text-center max-w-md w-full z-10">
        {/* Birthday Badge */}
        <div className="mb-4 inline-block px-4 py-2 rounded-full border border-cyan-400 bg-cyan-950/30 text-xs text-cyan-300 font-semibold tracking-widest animate-pulse">
            🎂 12.12 BIRTHDAY LAUNCH 🎂
        </div>
        
        {/* Title */}
        <h1 className="text-5xl font-black mb-3 tracking-tighter">
          COSMIC <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">AURA</span>
        </h1>
        <p className="text-zinc-400 mb-2 text-lg font-semibold">Your 2025 Frequency</p>
        <p className="text-zinc-500 mb-10 text-sm">Discover your cosmic vibe through physics & color psychology</p>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Ketik Nama Lengkap..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center text-xl font-bold focus:outline-none focus:border-cyan-500 transition placeholder:text-zinc-600"
          />
          <button 
            type="submit"
            disabled={!name}
            className="bg-white text-black py-4 rounded-xl font-black text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition disabled:opacity-50"
          >
            SCAN FREKUENSI 📡
          </button>
        </form>
        
        {/* Info Text */}
        <p className="text-zinc-600 text-xs mt-6 leading-relaxed">
          ✨ Your name generates a unique cosmic wavelength based on color science & physics
        </p>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 text-zinc-700 text-xs text-center">
        <p className="font-mono">Physics × Code × Creative</p>
        <p className="opacity-50 mt-1">Celebrating 12.12 Birthday Special ✨</p>
      </div>
    </main>
  );
}