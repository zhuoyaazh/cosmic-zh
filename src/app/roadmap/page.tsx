'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { generateCareerRoadmap, generateGrowthPlan, CareerRoadmap, GrowthMilestone } from '@/utils/colorLogics';

function RoadmapContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name');
  const mbti = searchParams.get('mbti');
  
  const [careers, setCareers] = useState<CareerRoadmap[]>([]);
  const [growthPlan, setGrowthPlan] = useState<GrowthMilestone[]>([]);
  const [selectedCareer, setSelectedCareer] = useState(0);
  const [activeMonth, setActiveMonth] = useState(0);

  useEffect(() => {
    if (!mbti) return;
    setCareers(generateCareerRoadmap(mbti));
    setGrowthPlan(generateGrowthPlan(mbti));
  }, [mbti]);

  if (!careers.length || !growthPlan.length) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white bg-black relative overflow-hidden">
        <div className="aurora-bg"></div>
        <div className="w-16 h-16 border-4 border-t-cyan-500 border-white/20 rounded-full animate-spin mb-4 relative z-10"></div>
        <p className="font-mono text-xs tracking-[0.5em] animate-pulse relative z-10">ANALYZING DESTINY...</p>
      </div>
    );
  }

  const career = careers[selectedCareer];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="aurora-bg"></div>

      {/* Header */}
      <div className="max-w-4xl w-full text-white relative z-10 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2">Your 2025 Cosmic Blueprint</h1>
          <p className="text-xl text-cyan-300">{name}</p>
          <p className="text-sm text-zinc-400 mt-2">MBTI: {mbti}</p>
        </div>

        {/* Career Roadmaps */}
        <div className="glass-card p-8 rounded-3xl mb-8">
          <h2 className="text-2xl font-black mb-6">Career Roadmaps</h2>
          
          {/* Career Selector */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            {careers.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCareer(idx)}
                className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${
                  selectedCareer === idx
                    ? 'bg-cyan-500 text-black'
                    : 'bg-zinc-900 border border-zinc-700 hover:border-cyan-500'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Career Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{career.title}</h3>
              <p className="text-xs text-cyan-300 mb-2">中文: {career.titleZh}</p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">{career.description}</p>
              <p className="text-xs text-zinc-500 italic mb-4">"{career.sassy}"</p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-cyan-300 font-bold mb-1">Timeline</p>
                <p className="font-bold">{career.timeline}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-cyan-300 font-bold mb-1">Salary Range</p>
                <p className="font-bold">{career.salary}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-cyan-300 font-bold mb-1">Path Level</p>
                <p className="font-bold">Premium</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-bold mb-3 text-green-400">Required Skills</p>
                <ul className="space-y-1 text-sm">
                  {career.requiredSkills.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> {skill}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-zinc-500 mt-3 italic">中文: {career.requiredSkillsZh.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm font-bold mb-3 text-orange-400">Next Steps</p>
                <ul className="space-y-1 text-sm">
                  {career.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-orange-400">→</span> {step}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-zinc-500 mt-3 italic">中文: {career.nextStepsZh.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2025 Growth Plan */}
        <div className="glass-card p-8 rounded-3xl">
          <h2 className="text-2xl font-black mb-6">Your 2025 Growth Milestones</h2>
          
          {/* Month Selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {growthPlan.map((milestone, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMonth(idx)}
                className={`px-3 py-2 rounded-lg font-bold whitespace-nowrap text-sm transition-all ${
                  activeMonth === idx
                    ? 'bg-cyan-500 text-black'
                    : 'bg-zinc-900 border border-zinc-700 hover:border-cyan-500'
                }`}
              >
                {milestone.month}
              </button>
            ))}
          </div>

          {/* Month Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-1">{growthPlan[activeMonth].month}</h3>
              <p className="text-xs text-cyan-300 mb-4">中文: {growthPlan[activeMonth].monthZh}</p>
              
              <div className="bg-white/5 p-4 rounded-lg border border-white/10 mb-4">
                <p className="text-sm font-bold text-cyan-300 mb-2">Focus Area</p>
                <p className="text-lg font-bold mb-2">{growthPlan[activeMonth].focus}</p>
                <p className="text-xs text-zinc-500">{growthPlan[activeMonth].focusZh}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-bold text-green-400 mb-3">Daily Habits</p>
                  <ul className="space-y-2 text-sm">
                    {growthPlan[activeMonth].habits.map((habit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">•</span>
                        <div>
                          <p>{habit}</p>
                          <p className="text-xs text-zinc-500">{growthPlan[activeMonth].habitsZh[i]}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-bold text-blue-400 mb-3">Goal</p>
                  <p className="text-sm leading-relaxed mb-3">{growthPlan[activeMonth].goal}</p>
                  <p className="text-xs text-zinc-500">{growthPlan[activeMonth].goalZh}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-500">Progress: {activeMonth + 1} / {growthPlan.length} months</p>
          <div className="w-full bg-zinc-900 rounded-full h-2 mt-2">
            <div 
              className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((activeMonth + 1) / growthPlan.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-12 z-10">
        <button 
          onClick={() => router.push('/')}
          className="px-8 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-bold hover:bg-white/20 transition-all"
        >
          ← BACK TO START
        </button>
        <button 
          onClick={() => window.print()}
          className="px-8 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-sm font-bold text-cyan-300 hover:bg-cyan-500/30 transition-all"
        >
          📄 PRINT ROADMAP
        </button>
      </div>

      {/* Birthday Footer */}
      <div className="mt-8 text-center text-xs text-zinc-600 z-10">
        <p>🎂 Crafted for your 12.12 Birthday 🎂</p>
        <p className="mt-1 text-[10px]">This is your cosmic blueprint. Own it.</p>
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <RoadmapContent />
    </Suspense>
  );
}
