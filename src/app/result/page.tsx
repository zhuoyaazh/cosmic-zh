'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { stringToColor, getColorMeaning } from '@/utils/colorLogics';

interface ColorMeaning {
  vibe: string;
  desc: string;
  wavelength: string;
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name');
  
  const [hex, setHex] = useState('#000000');
  const [meaning, setMeaning] = useState<ColorMeaning | null>(null);

  useEffect(() => {
    if (!name) return;
    const generatedColor = stringToColor(name);
    const generatedMeaning = getColorMeaning(generatedColor);

    setTimeout(() => {
      setHex(generatedColor);
      setMeaning(generatedMeaning);
    }, 1500);
  }, [name]);

  if (!meaning) return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="animate-spin text-5xl mb-4">✨</div>
      <p className="animate-pulse tracking-widest text-xs font-mono">CALIBRATING COSMIC FREQUENCY...</p>
    </div>
  );

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-1000"
      style={{ backgroundColor: hex }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40 pointer-events-none"></div>
      
      <div className="bg-black/85 backdrop-blur-md border border-white/20 p-8 rounded-3xl max-w-md w-full text-white shadow-2xl relative z-10">
        <div className="text-center mb-8">
            <p className="text-xs font-mono opacity-50 mb-4 tracking-widest">SUBJECT: {name?.toUpperCase()}</p>
            
            {/* Aura Circle */}
            <div 
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-[0_0_40px_rgba(255,255,255,0.5)] animate-pulse transition-all duration-500"
                style={{ backgroundColor: hex }}
            />
            
            {/* Vibe & Wavelength */}
            <h1 className="text-4xl font-black mb-3 leading-tight">{meaning.vibe}</h1>
            <p className="font-mono text-sm text-cyan-300 bg-cyan-950/30 border border-cyan-700/50 rounded-lg px-3 py-2 inline-block mb-2">
              λ: {meaning.wavelength}
            </p>
            <p className="font-mono text-xs text-zinc-400 mt-3">
              HEX: {hex.toUpperCase()}
            </p>
        </div>
        
        <div className="border-t border-white/20 my-6"></div>

        {/* Description */}
        <p className="text-zinc-300 text-center leading-relaxed mb-8 italic text-sm">
          &quot;{meaning.desc}&quot;
        </p>

        {/* Birthday Dedication */}
        <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
            <p className="text-xs uppercase tracking-widest opacity-70 mb-2 font-semibold">
                🎂 BIRTHDAY SPECIAL EDITION 🎂
            </p>
            <p className="text-xs opacity-80 leading-relaxed">
                Celebrating my cosmic journey on <span className="font-bold text-cyan-300">12.12.2025</span>
            </p>
            <p className="text-[10px] uppercase tracking-widest opacity-40 mt-3">
                Code crafted with 🖤
            </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => router.push('/')}
          className="w-full mt-8 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform duration-200 active:scale-95 shadow-lg"
        >
          Check Another Spectrum ✨
        </button>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 text-zinc-600 text-xs text-center z-10 font-mono">
        Powered by Physics Algorithm • 12.12.2025
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}