'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { stringToColor, getColorMeaning, CosmicProfile } from '@/utils/colorLogics';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name');
  const [showDetails, setShowDetails] = useState(false);
  
  const [hex, setHex] = useState('#000000');
  const [meaning, setMeaning] = useState<CosmicProfile | null>(null);

  useEffect(() => {
    if (!name) return;
    const generatedColor = stringToColor(name);
    const generatedMeaning = getColorMeaning(generatedColor);

    setTimeout(() => {
      setHex(generatedColor);
      setMeaning(generatedMeaning);
    }, 1000);
  }, [name]);

  if (!meaning) return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white bg-black relative overflow-hidden">
      <div className="aurora-bg"></div>
      <div className="w-16 h-16 border-4 border-t-cyan-500 border-white/20 rounded-full animate-spin mb-4 relative z-10"></div>
      <p className="font-mono text-xs tracking-[0.5em] animate-pulse relative z-10">ANALYZING DATA...</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Aurora */}
      <div className="aurora-bg"></div>

      {/* KARTU UTAMA (Bisa di-screenshot) */}
      <div className="glass-card p-8 rounded-3xl max-w-sm w-full text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 z-10">
        
        {/* Glow effect di belakang kartu */}
        <div 
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] opacity-40 mix-blend-screen pointer-events-none"
            style={{ backgroundColor: hex }}
        ></div>

        {/* Header Kartu */}
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4 relative z-10">
            <span className="font-mono text-[10px] text-zinc-400">ID: {name?.toUpperCase().substring(0, 8)}...</span>
            <span className="font-mono text-[10px] border border-white/20 px-2 py-1 rounded-full">2025 EDITION</span>
        </div>

        {/* Visual Warna dengan Orbit */}
        <div className="relative mb-8 flex justify-center items-center h-48 z-10">
            {/* Orbit circles */}
            <div className="absolute w-40 h-40 border border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute w-32 h-32 border border-dashed border-white/20 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
            
            {/* Main circle */}
            <div 
                className="w-28 h-28 rounded-full border-2 border-white/40 shadow-[0_0_60px_rgba(255,255,255,0.3)] flex items-center justify-center relative z-20"
                style={{ 
                  background: `linear-gradient(135deg, ${hex}cc, #000)`,
                  boxShadow: `0 0 40px ${hex}80, inset 0 0 40px ${hex}40`
                }}
            >
                <span className="text-5xl filter drop-shadow-lg">
                    {meaning.vibe.split(" ").pop()} 
                </span>
            </div>
        </div>

        {/* Teks Utama */}
        <div className="text-center relative z-10">
            <h1 className="text-3xl font-black mb-2 tracking-tighter">
                {meaning.vibe.split(" ").slice(0, -1).join(" ")}
            </h1>
            <p className="text-sm font-mono text-cyan-400 mb-3 bg-cyan-950/40 px-3 py-1 rounded-full inline-block">
              MBTI: <span className="font-bold">{meaning.mbti}</span>
            </p>
            <p className="text-xs font-mono text-cyan-300 italic mb-4">
              &quot;{meaning.quote}&quot;
            </p>
            <p className="text-xs font-mono text-white/60 mb-6 uppercase tracking-widest">{meaning.stat}</p>
            
            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              {meaning.desc}
            </p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6 relative z-10"></div>

        {/* MBTI & Life Philosophy Section */}
        <div className="mb-6 space-y-4 relative z-10">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <p className="text-xs uppercase tracking-widest text-cyan-300 mb-2">Personality Type</p>
            <p className="text-sm text-zinc-300 leading-relaxed">{meaning.mbtiDesc}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <p className="text-xs uppercase tracking-widest text-cyan-300 mb-2">Life Philosophy</p>
            <p className="text-sm text-zinc-300 italic">&quot;{meaning.lifePhilosophy}&quot;</p>
          </div>
        </div>

        {/* Strengths & Challenges */}
        <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
          <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
            <p className="text-xs uppercase text-green-400 font-bold mb-2">Strengths</p>
            <ul className="text-xs text-zinc-300 space-y-1">
              {meaning.strengths.slice(0, 2).map((s, i) => (
                <li key={i}>✓ {s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded-lg">
            <p className="text-xs uppercase text-orange-400 font-bold mb-2">Challenges</p>
            <ul className="text-xs text-zinc-300 space-y-1">
              {meaning.challenges.slice(0, 2).map((c, i) => (
                <li key={i}>⚡ {c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Career & Love */}
        <div className="space-y-3 mb-6 relative z-10">
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <p className="text-xs uppercase tracking-widest text-cyan-300 mb-1 font-bold">Career Fit</p>
            <p className="text-xs text-zinc-300">{meaning.careerFit.join(" • ")}</p>
          </div>
          <div className="bg-pink-500/10 border border-pink-500/30 p-3 rounded-lg">
            <p className="text-xs uppercase tracking-widest text-pink-400 mb-1 font-bold">💓 Love Type</p>
            <p className="text-xs text-zinc-300">{meaning.loveType}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6 relative z-10"></div>

        {/* Footer Kartu */}
        <div className="flex justify-between items-end gap-4 relative z-10">
            <div>
                <p className="text-[9px] font-mono text-zinc-500">CREATED BY</p>
                <p className="text-[10px] font-bold">COSMIC.ZH</p>
            </div>
            <div className="text-right">
                <p className="text-[9px] font-mono text-zinc-500">HEX CODE</p>
                <p className="text-[10px] font-mono uppercase font-bold" style={{ color: hex }}>{hex}</p>
            </div>
        </div>

        {/* Birthday note */}
        <div className="mt-6 pt-4 border-t border-white/5 text-center text-[9px] text-zinc-500 relative z-10">
          🎂 12.12 Birthday Special Edition 🎂
        </div>
      </div>

      <button 
        onClick={() => router.push('/')}
        className="mt-8 px-8 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-all backdrop-blur-sm relative z-10"
      >
        ↺ SCAN OTHER NAME
      </button>

      {/* Compatibility Checker Link */}
      <button 
        onClick={() => router.push('/compatibility')}
        className="mt-4 px-8 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm font-bold text-cyan-300 hover:bg-cyan-500/20 transition-all backdrop-blur-sm relative z-10"
      >
        💕 CHECK COMPATIBILITY
      </button>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}