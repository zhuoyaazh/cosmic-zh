export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

export interface CosmicProfile {
  vibe: string;
  quote: string;
  desc: string;
  stat: string;
  mbti: string;
  mbtiDesc: string;
  strengths: string[];
  challenges: string[];
  careerFit: string[];
  loveType: string;
  lifePhilosophy: string;
}

const getMBTIFromVibe = (hex: string): string => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const total = r + g + b;

  // Mapping archetype ke MBTI
  // Entropy Breaker → INTJ (Structured, Logical)
  // Schrödinger → INTP (Mysterious, Analytical)
  // High Velocity → ENFP (Energetic, Chaotic)
  // Dark Matter → INFP (Quiet, Influential)
  // Event Horizon → ENFJ (Magnetic, Social)

  if (total % 5 === 0) return "INTJ";
  if (total % 5 === 1) return "INTP";
  if (total % 5 === 2) return "ENFP";
  if (total % 5 === 3) return "INFP";
  return "ENFJ";
};

const getMBTIData = (mbti: string) => {
  const mbtiMap: Record<string, { desc: string; strengths: string[]; challenges: string[]; careerFit: string[]; loveType: string; philosophy: string }> = {
    INTJ: {
      desc: "The Architect - Strategic, independent, visionary thinker yang selalu punya master plan.",
      strengths: ["Strategic thinking", "Independent", "Determined", "Innovative"],
      challenges: ["Overcomplicating things", "Difficulty expressing emotions", "Perfectionism"],
      careerFit: ["Software Engineer", "Data Scientist", "Researcher", "Strategic Consultant"],
      loveType: "Intellectual Partner yang bisa match vision & ambisi lo",
      philosophy: "Life is a puzzle to solve efficiently."
    },
    INTP: {
      desc: "The Logician - Curious, analytical, loves diving deep into mysteries dan hidden knowledge.",
      strengths: ["Analytical", "Creative problem-solving", "Logical", "Innovative"],
      challenges: ["Procrastination", "Overthinking", "Social awkwardness"],
      careerFit: ["Mathematician", "Physicist", "Software Developer", "Researcher"],
      loveType: "Someone who stimulates your mind endlessly",
      philosophy: "Understanding the universe is the ultimate goal."
    },
    ENFP: {
      desc: "The Campaigner - Energetic, spontaneous, punya ribuan ide & passion yang menular.",
      strengths: ["Enthusiastic", "Creative", "Versatile", "People-oriented"],
      challenges: ["Easily distracted", "Impulsive", "Difficulty focusing"],
      careerFit: ["Content Creator", "Entrepreneur", "Designer", "Event Organizer"],
      loveType: "Adventure partner yang bisa keep up dengan energy lo",
      philosophy: "Life is meant to be lived fully and experienced wildly."
    },
    INFP: {
      desc: "The Mediator - Idealistic, empathetic, quiet but has massive internal impact.",
      strengths: ["Empathetic", "Creative", "Principled", "Authentic"],
      challenges: ["Too idealistic", "Oversensitive", "Avoidance"],
      careerFit: ["Counselor", "Writer", "Artist", "Teacher"],
      loveType: "Deep, meaningful connection dengan someone who understands your soul",
      philosophy: "Authenticity and inner harmony matter more than anything."
    },
    ENFJ: {
      desc: "The Protagonist - Charismatic, inspiring, natural leader yang punya gravitasi sosial.",
      strengths: ["Charismatic", "Inspiring", "Leadership", "Empathetic"],
      challenges: ["Overcommitment", "People-pleasing", "Difficulty with criticism"],
      careerFit: ["CEO", "Teacher", "Coach", "Public Speaker"],
      loveType: "Admirer yang puas menjadi supporting cast di story lo",
      philosophy: "People's happiness and growth is my life purpose."
    }
  };

  return mbtiMap[mbti] || mbtiMap.INTP;
};

export const getColorMeaning = (hex: string): CosmicProfile => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const total = r + g + b;

  const mbti = getMBTIFromVibe(hex);
  const mbtiData = getMBTIData(mbti);

  let archetype: Omit<CosmicProfile, "mbti" | "mbtiDesc" | "strengths" | "challenges" | "careerFit" | "loveType" | "lifePhilosophy">;

  // Logic "Archetype" Fisika/Sains
  if (total % 5 === 0) {
    archetype = {
      vibe: "ENTROPY BREAKER 🌪️",
      quote: "Chaos is strictly forbidden in your radius.",
      desc: "Lo adalah definisi 'Hukum Termodinamika yang gagal'. Di mana ada lo, kekacauan malah jadi rapi. Otak lo terstruktur banget, sampe kadang orang takut mau curhat karena takut dikasih solusi flowchart.",
      stat: "Order: 99% | Chaos: 1%"
    };
  } else if (total % 5 === 1) {
    archetype = {
      vibe: "SCHRÖDINGER'S HUMAN 🐱",
      quote: "Alive and dead inside at the same time.",
      desc: "Misterius parah. Orang gak tau lo lagi ambis atau lagi burnout, karena muka lo flat aja. Lo bisa ada di dua tempat sekaligus: fisik di kelas, pikiran di kasur.",
      stat: "Mystery: 100% | Clarity: 0%"
    };
  } else if (total % 5 === 2) {
    archetype = {
      vibe: "HIGH VELOCITY PARTICLE ⚡",
      quote: "Speed is key, accuracy is optional.",
      desc: "Sat-set wat-wet. Lo orangnya gak bisa diem. Ide lo banyak banget sampe kadang mulut lo keserimpet pas ngejelasin. Energinya nular, tapi hati-hati nabrak tembok.",
      stat: "Kinetic Energy: MAX"
    };
  } else if (total % 5 === 3) {
    archetype = {
      vibe: "DARK MATTER SOUL 🌌",
      quote: "Invisible influence, massive gravity.",
      desc: "Lo gak banyak omong (introvert?), tapi kalau lo gak ada, tongkrongan/kelompok bubar. Lo adalah 'lem' yang menyatukan alam semesta pertemanan lo. Silent leader.",
      stat: "Gravity: 9.8 m/s²"
    };
  } else {
    archetype = {
      vibe: "EVENT HORIZON 🔥",
      quote: "Once they met you, there is no return.",
      desc: "Karisma lo bahaya. Sekali orang kenal lo, susah buat lepas. Lo punya daya tarik magnetis yang bikin orang nyaman (atau takut). Pusat gravitasi sosial.",
      stat: "Pull Force: Infinite"
    };
  }

  return {
    ...archetype,
    mbti,
    mbtiDesc: mbtiData.desc,
    strengths: mbtiData.strengths,
    challenges: mbtiData.challenges,
    careerFit: mbtiData.careerFit,
    loveType: mbtiData.loveType,
    lifePhilosophy: mbtiData.philosophy
  };
};

// Compatibility Calculator
export const calculateCompatibility = (name1: string, name2: string): { score: number; analysis: string } => {
  const hash1 = name1.toLowerCase().split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const hash2 = name2.toLowerCase().split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  
  const color1 = stringToColor(name1);
  const color2 = stringToColor(name2);
  const mbti1 = getMBTIFromVibe(color1);
  const mbti2 = getMBTIFromVibe(color2);

  // Calculate based on multiple factors
  const nameSimilarity = 100 - (Math.abs(hash1 - hash2) % 100);
  const mbtiCompatibility = mbti1 === mbti2 ? 100 : Math.random() * 100;
  
  const score = Math.round((nameSimilarity * 0.4 + mbtiCompatibility * 0.6));

  let analysis = "";
  if (score >= 85) {
    analysis = "Cosmic Soulmate Energy ✨ - You're written in the stars together";
  } else if (score >= 70) {
    analysis = "Strong Stellar Connection 🌟 - Great chemistry and compatibility";
  } else if (score >= 50) {
    analysis = "Interesting Cosmic Intersection 🌀 - Potential for growth together";
  } else {
    analysis = "Different Galactic Orbits 🪐 - Challenging but not impossible";
  }

  return { score, analysis };
};

// Career Roadmap Generator
export interface CareerRoadmap {
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  timeline: string;
  salary: string;
  requiredSkills: string[];
  requiredSkillsZh: string[];
  nextSteps: string[];
  nextStepsZh: string[];
  sassy: string;
}

export const generateCareerRoadmap = (mbti: string): CareerRoadmap[] => {
  const roadmaps: Record<string, CareerRoadmap[]> = {
    INTJ: [
      {
        title: "Strategic Tech Executive",
        titleZh: "战略科技高管",
        description: "Lead tech companies with your visionary thinking. You will architect the future (or at least pretend to understand your own code).",
        descriptionZh: "用你的远见卓识领导科技公司。你会规划未来（或者至少假装理解自己的代码）。",
        timeline: "3-5 years",
        salary: "$150K-250K+",
        requiredSkills: ["Strategic Planning", "Leadership", "Tech Stack Mastery", "Public Speaking"],
        requiredSkillsZh: ["战略规划", "领导力", "技术栈精通", "演讲能力"],
        nextSteps: ["Lead a small team", "Learn system design", "Network with executives", "Consider MBA or certifications"],
        nextStepsZh: ["领导小团队", "学习系统设计", "与高管建立关系", "考虑MBA或认证"],
        sassy: "You were born for this. The question is: are you brave enough?"
      },
      {
        title: "Data Scientist / AI Researcher",
        titleZh: "数据科学家/AI研究员",
        description: "Build models that predict the future. Literally make machines smarter than humans (good luck with that).",
        descriptionZh: "构建预测未来的模型。字面上让机器比人类更聪明（祝你好运）。",
        timeline: "2-3 years",
        salary: "$120K-200K+",
        requiredSkills: ["Machine Learning", "Statistics", "Python/R", "Research Methodology"],
        requiredSkillsZh: ["机器学习", "统计学", "Python/R", "研究方法论"],
        nextSteps: ["Master ML frameworks", "Publish research papers", "Build portfolio projects", "Join AI labs"],
        nextStepsZh: ["精通ML框架", "发表研究论文", "构建作品集项目", "加入AI实验室"],
        sassy: "Your brain is your superpower. Don't waste it on mediocrity."
      }
    ],
    INTP: [
      {
        title: "Software Architect / Tech Lead",
        titleZh: "软件架构师/技术负责人",
        description: "Design complex systems that actually work. You'll spend 80% time thinking, 20% convincing others your ideas are genius.",
        descriptionZh: "设计真正有效的复杂系统。你会花80%的时间思考，20%的时间说服别人你的想法是天才。",
        timeline: "4-6 years",
        salary: "$130K-220K+",
        requiredSkills: ["System Design", "Code Review", "Technical Communication", "Debugging"],
        requiredSkillsZh: ["系统设计", "代码审查", "技术沟通", "调试"],
        nextSteps: ["Lead architecture decisions", "Mentor juniors", "Publish technical blogs", "Open-source contributions"],
        nextStepsZh: ["领导架构决策", "指导初级开发者", "发表技术博客", "开源贡献"],
        sassy: "Your ideas are probably correct. The problem is explaining them to non-geniuses."
      },
      {
        title: "Research Scientist",
        titleZh: "研究科学家",
        description: "Explore the unknown. Get paid to think deeply about problems nobody else understands (yet).",
        descriptionZh: "探索未知。获得报酬来深入思考别人还不理解的问题。",
        timeline: "3-4 years",
        salary: "$100K-180K+",
        requiredSkills: ["Research Design", "Data Analysis", "Writing", "Critical Thinking"],
        requiredSkillsZh: ["研究设计", "数据分析", "写作", "批判性思维"],
        nextSteps: ["PhD or Masters", "Build research network", "Publish papers", "Collaborate on grants"],
        nextStepsZh: ["博士或硕士学位", "建立研究网络", "发表论文", "合作申请资金"],
        sassy: "The world needs more thinkers like you. Stop waiting and start researching."
      }
    ],
    ENFP: [
      {
        title: "Startup Founder / Entrepreneur",
        titleZh: "创业公司创始人/企业家",
        description: "Build the next big thing. Your energy is contagious—use it to rally teams and disrupt industries.",
        descriptionZh: "建立下一个大事件。你的能量是有感染力的——用它来号召团队和颠覆行业。",
        timeline: "5-10 years",
        salary: "Variable (early stage to $1M+)",
        requiredSkills: ["Innovation", "Fundraising", "Team Building", "Market Research"],
        requiredSkillsZh: ["创新", "融资", "团队建设", "市场研究"],
        nextSteps: ["Validate idea", "Build MVP", "Pitch to investors", "Scale team"],
        nextStepsZh: ["验证想法", "构建MVP", "向投资者推介", "扩大团队"],
        sassy: "Your ideas are amazing. Your follow-through? That's the real adventure."
      },
      {
        title: "Brand Strategist / Marketing Director",
        titleZh: "品牌战略家/市场营销总监",
        description: "Make people care about things. You're basically a professional persuader (and you love it).",
        descriptionZh: "让人们关心某些事物。你基本上是一个专业的说服者（你喜欢这样）。",
        timeline: "3-5 years",
        salary: "$100K-180K+",
        requiredSkills: ["Creative Thinking", "Communication", "Data Analysis", "Trend Spotting"],
        requiredSkillsZh: ["创意思维", "沟通", "数据分析", "趋势预测"],
        nextSteps: ["Master social media", "Build portfolio", "Network with agencies", "Study consumer psychology"],
        nextStepsZh: ["精通社交媒体", "建立作品集", "与代理机构建立网络", "学习消费者心理学"],
        sassy: "You light up every room. Channel that into something profitable."
      }
    ],
    INFP: [
      {
        title: "UX/UI Designer",
        titleZh: "UX/UI设计师",
        description: "Create beautiful experiences that make people feel something. You understand humans better than humans.",
        descriptionZh: "创建美丽的体验让人们感受到某些东西。你比人类更了解人类。",
        timeline: "2-3 years",
        salary: "$80K-150K+",
        requiredSkills: ["Design Thinking", "Empathy", "Tools (Figma/Adobe)", "User Research"],
        requiredSkillsZh: ["设计思维", "同理心", "设计工具", "用户研究"],
        nextSteps: ["Build design portfolio", "Master design tools", "Study psychology", "Join design teams"],
        nextStepsZh: ["建立设计作品集", "精通设计工具", "学习心理学", "加入设计团队"],
        sassy: "Your taste is impeccable. Make sure the world knows it."
      },
      {
        title: "Content Creator / Writer",
        titleZh: "内容创作者/写手",
        description: "Tell stories that matter. People need your voice, even if you're afraid to use it yet.",
        descriptionZh: "讲述重要的故事。人们需要你的声音，即使你还害怕使用它。",
        timeline: "1-3 years",
        salary: "$40K-150K+ (highly variable)",
        requiredSkills: ["Storytelling", "Writing", "Emotional Intelligence", "Authenticity"],
        requiredSkillsZh: ["讲故事", "写作", "情商", "真实性"],
        nextSteps: ["Start blogging", "Build audience", "Monetize content", "Collaborate with brands"],
        nextStepsZh: ["开始写博客", "积累受众", "内容变现", "与品牌合作"],
        sassy: "Your sensitivity is not weakness. It is your superpower."
      }
    ],
    ENFJ: [
      {
        title: "Executive Coach / Leadership Consultant",
        titleZh: "执行教练/领导力顾问",
        description: "Help others become their best selves. You are basically a human success factory.",
        descriptionZh: "帮助他人成为最好的自己。你基本上是一个人类成功工厂。",
        timeline: "3-5 years",
        salary: "$100K-250K+",
        requiredSkills: ["Psychology", "Coaching", "Communication", "Emotional Intelligence"],
        requiredSkillsZh: ["心理学", "教练", "沟通", "情感智力"],
        nextSteps: ["Get coaching certification", "Build client base", "Develop methodology", "Expand to corporate"],
        nextStepsZh: ["获得教练认证", "建立客户基础", "开发方法论", "拓展到企业"],
        sassy: "People follow you naturally. Make it your career."
      },
      {
        title: "Non-Profit Director / Impact Leader",
        titleZh: "非营利组织主任/影响力领导者",
        description: "Change the world one human at a time. Your mission is bigger than money (but money helps).",
        descriptionZh: "一次一个人改变世界。你的使命比金钱更大（但金钱有帮助）。",
        timeline: "4-6 years",
        salary: "$80K-150K+",
        requiredSkills: ["Leadership", "Fundraising", "Community Building", "Strategic Vision"],
        requiredSkillsZh: ["领导力", "融资", "社区建设", "战略远景"],
        nextSteps: ["Volunteer leadership", "Learn fundraising", "Build network", "Start initiative"],
        nextStepsZh: ["志愿领导", "学习融资", "建立网络", "启动计划"],
        sassy: "Your calling is clear. Stop waiting for permission to pursue it."
      }
    ]
  };

  // For MBTI types not explicitly defined, return generic roadmaps
  const defaultRoadmaps: CareerRoadmap[] = [
    {
      title: "Tech Professional",
      titleZh: "科技专业人士",
      description: "Build your skills in software development, data science, or tech management.",
      descriptionZh: "在软件开发、数据科学或技术管理方面培养你的技能。",
      timeline: "2-4 years",
      salary: "$80K-150K+",
      requiredSkills: ["Programming", "Problem Solving", "Collaboration"],
      requiredSkillsZh: ["编程", "问题解决", "协作"],
      nextSteps: ["Learn key technologies", "Build portfolio", "Gain experience"],
      nextStepsZh: ["学习关键技术", "建立作品集", "积累经验"],
      sassy: "Your potential is unlimited. Stop underestimating yourself."
    },
    {
      title: "Creative Professional",
      titleZh: "创意专业人士",
      description: "Express yourself through design, content, or innovation.",
      descriptionZh: "通过设计、内容或创新表达自己。",
      timeline: "2-3 years",
      salary: "$60K-150K+",
      requiredSkills: ["Creativity", "Communication", "Adaptability"],
      requiredSkillsZh: ["创意", "沟通", "适应性"],
      nextSteps: ["Build portfolio", "Network", "Develop style"],
      nextStepsZh: ["建立作品集", "建立网络", "发展风格"],
      sassy: "The world needs your unique perspective. Don't hold back."
    }
  ];

  return roadmaps[mbti] || defaultRoadmaps;
};

// Personal Growth Plan 2025
export interface GrowthMilestone {
  month: string;
  monthZh: string;
  focus: string;
  focusZh: string;
  habits: string[];
  habitsZh: string[];
  goal: string;
  goalZh: string;
}

export const generateGrowthPlan = (mbti: string): GrowthMilestone[] => {
  const growthMap: Record<string, GrowthMilestone[]> = {
    INTJ: [
      { month: "January", monthZh: "一月", focus: "Strategic Planning", focusZh: "战略规划", habits: ["Daily planning", "Read strategy books"], habitsZh: ["每日计划", "阅读战略书籍"], goal: "Define your 2025 vision", goalZh: "定义你的2025年愿景" },
      { month: "February", monthZh: "二月", focus: "Leadership Development", focusZh: "领导力发展", habits: ["Lead a project", "Mentor someone"], habitsZh: ["领导项目", "指导某人"], goal: "Strengthen leadership skills", goalZh: "加强领导力" },
      { month: "March", monthZh: "三月", focus: "Technical Mastery", focusZh: "技术精通", habits: ["Deep learning sessions", "Code review"], habitsZh: ["深度学习", "代码审查"], goal: "Master a new technology", goalZh: "掌握新技术" },
      { month: "April", monthZh: "四月", focus: "Communication", focusZh: "沟通", habits: ["Public speaking", "Writing articles"], habitsZh: ["公开演讲", "撰写文章"], goal: "Improve communication skills", goalZh: "提高沟通技能" },
      { month: "May", monthZh: "五月", focus: "Execution", focusZh: "执行", habits: ["Project completion", "Accountability"], habitsZh: ["项目完成", "问责"], goal: "Finish 2 major projects", goalZh: "完成2个重大项目" },
      { month: "June", monthZh: "六月", focus: "Work-Life Balance", focusZh: "工作生活平衡", habits: ["Exercise", "Family time"], habitsZh: ["运动", "家庭时间"], goal: "Establish healthy routines", goalZh: "建立健康的日常" }
    ],
    // Additional MBTI plans can be added here
  };

  // Default growth plan if not specified
  const defaultPlan: GrowthMilestone[] = Array.from({ length: 6 }, (_, i) => ({
    month: ["January", "February", "March", "April", "May", "June"][i],
    monthZh: ["一月", "二月", "三月", "四月", "五月", "六月"][i],
    focus: "Personal Growth Phase " + (i + 1),
    focusZh: "个人成长阶段 " + (i + 1),
    habits: ["Reflect on progress", "Learn new skills", "Network"],
    habitsZh: ["反思进展", "学习新技能", "建立网络"],
    goal: "Grow 10% better than last month",
    goalZh: "比上个月进步10%"
  }));

  return growthMap[mbti] || defaultPlan;
};