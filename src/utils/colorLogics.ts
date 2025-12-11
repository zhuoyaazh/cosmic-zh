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