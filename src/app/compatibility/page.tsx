'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { stringToColor, getColorMeaning, calculateCompatibility } from '@/utils/colorLogics';

export default function CompatibilityPage() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<null | {score: number; analysis: string; profile1: any; profile2: any}>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) return;

    const color1 = stringToColor(name1);
    const color2 = stringToColor(name2);
    const profile1 = getColorMeaning(color1);
    const profile2 = getColorMeaning(color2);
    const compatibility = calculateCompatibility(name1, name2);

    setResult({
      score: compatibility.score,
      analysis: compatibility.analysis,
      profile1,
      profile2
    });
  };

  if (result) {
    const getScoreColor = (score: number) => {
      if (score >= 85) return 'text-green-400';
      if (score >= 70) return 'text-cyan-400';
      if (score >= 50) return 'text-yellow-400';
      return 'text-orange-400';
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="aurora-bg"></div>

        <div className="glass-card p-8 rounded-3xl max-w-2xl w-full text-white relative overflow-hidden z-10">
          {/* Glow */}
          <div 
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-30 mix-blend-screen pointer-events-none"
            style={{ 
              background: `linear-gradient(135deg, ${result.profile1.vibe.includes('🌪️') ? '#ff6b6b' : '#4ecdc4'}, ${result.profile2.vibe.includes('🔥') ? '#ff6b6b' : '#95e1d3'})`
            }}
          ></div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl font-black mb-4">Cosmic Compatibility</h1>
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm font-bold mb-2">{name1}</p>
                <div className="w-16 h-16 rounded-full border-2 border-white/40 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${stringToColor(name1)}cc, #000)` }}>
                  <span className="text-2xl">{result.profile1.vibe.split(" ").pop()}</span>
                </div>
                <p className="text-xs mt-2 text-cyan-300">{result.profile1.mbti}</p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-2xl font-black mb-2">💫</p>
                <div className={`text-4xl font-black ${getScoreColor(result.score)}`}>
                  {result.score}%
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-bold mb-2">{name2}</p>
                <div className="w-16 h-16 rounded-full border-2 border-white/40 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${stringToColor(name2)}cc, #000)` }}>
                  <span className="text-2xl">{result.profile2.vibe.split(" ").pop()}</span>
                </div>
                <p className="text-xs mt-2 text-cyan-300">{result.profile2.mbti}</p>
              </div>
            </div>

            <p className="text-lg font-bold text-cyan-300 mb-4">{result.analysis}</p>
          </div>

          <div className="border-t border-white/10 my-6 relative z-10"></div>

          {/* Detailed Analysis */}
          <div className="space-y-4 mb-6 relative z-10">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-xs uppercase text-cyan-300 font-bold mb-2">Chemistry Insights</p>
              <div className="space-y-2">
                <p className="text-sm text-zinc-300">
                  <span className="font-bold">{name1}</span> ({result.profile1.mbti}) + <span className="font-bold">{name2}</span> ({result.profile2.mbti})
                </p>
                {result.profile1.mbti === result.profile2.mbti ? (
                  <p className="text-sm text-green-300">✓ Same MBTI - Natural understanding & shared worldview</p>
                ) : (
                  <p className="text-sm text-yellow-300">~ Different MBTI - Complementary strengths possible</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-xs uppercase text-cyan-300 font-bold mb-2">{name1}'s Archetype</p>
                <p className="text-xs text-zinc-300 mb-2">{result.profile1.vibe}</p>
                <p className="text-xs text-zinc-400">{result.profile1.lifePhilosophy}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-xs uppercase text-cyan-300 font-bold mb-2">{name2}'s Archetype</p>
                <p className="text-xs text-zinc-300 mb-2">{result.profile2.vibe}</p>
                <p className="text-xs text-zinc-400">{result.profile2.lifePhilosophy}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 my-6 relative z-10"></div>

          {/* Birthday Note */}
          <div className="text-center text-[9px] text-zinc-500 relative z-10 mb-6">
            🎂 12.12 Birthday Special Edition 🎂
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8 z-10">
          <button 
            onClick={() => setResult(null)}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-bold hover:bg-white/20 transition-all"
          >
            ↻ TRY AGAIN
          </button>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-bold hover:bg-white/20 transition-all"
          >
            ← BACK HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="aurora-bg"></div>

      <div className="glass-card p-8 rounded-3xl max-w-md w-full text-white relative z-10">
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-4xl font-black mb-2">Cosmic Match</h1>
          <p className="text-sm text-zinc-400">Test your astro-compatibility 💕</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="text-xs uppercase tracking-widest text-cyan-300 mb-2 block">Person 1</label>
            <input 
              type="text" 
              placeholder="Your name..." 
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center font-bold focus:outline-none focus:border-cyan-500 transition placeholder:text-zinc-600"
            />
          </div>

          <div className="flex justify-center">
            <div className="text-2xl">💫</div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-cyan-300 mb-2 block">Person 2</label>
            <input 
              type="text" 
              placeholder="Their name..." 
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center font-bold focus:outline-none focus:border-cyan-500 transition placeholder:text-zinc-600"
            />
          </div>

          <button 
            type="submit"
            disabled={!name1 || !name2}
            className="w-full bg-white text-black py-4 rounded-xl font-black text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition disabled:opacity-50"
          >
            CALCULATE 📡
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[9px] text-zinc-500 relative z-10">
          🎂 12.12 Birthday Special Edition 🎂
        </div>
      </div>

      <button 
        onClick={() => router.push('/')}
        className="mt-8 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-bold hover:bg-white/20 transition-all z-10"
      >
        ← BACK HOME
      </button>
    </div>
  );
}
