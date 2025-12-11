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

export const getColorMeaning = (hex: string) => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  if (r > g && r > b) {
    return {
      vibe: "The Red Supergiant 🔴",
      desc: "Energi lo di 2025 bakal meledak. Ambisius, berani ambil risiko, dan siap 'membakar' semua halangan. Hati-hati jangan burnout.",
      wavelength: "620-750 nm"
    };
  } else if (g > r && g > b) {
    return {
      vibe: "Quantum Growth 🌱",
      desc: "Tahun penyembuhan dan pertumbuhan stabil. Lo bakal nemu balance hidup yang orang lain cari-cari. Rezeki ngalir tenang tapi pasti.",
      wavelength: "495-570 nm"
    };
  } else if (b > r && b > g) {
    return {
      vibe: "Deep Ocean Logic 🌊",
      desc: "Tahunnya logika dan ketenangan. Emosi stabil, otak jalan terus. Cocok buat ambil keputusan besar atau belajar skill susah.",
      wavelength: "450-495 nm"
    };
  } else if (r > 200 && g > 200 && b < 100) {
    return {
      vibe: "Golden Photon ⚡",
      desc: "Lo bakal jadi pusat perhatian. Karisma lo lagi tinggi-tingginya. Apa yang lo sentuh jadi emas tahun ini.",
      wavelength: "570-590 nm"
    };
  } else {
    return {
      vibe: "Dark Matter Mystery 🌌",
      desc: "Misterius tapi powerful. Lo gerak di bawah radar, tapi impact-nya gede banget. Gak banyak omong, tau-tau sukses.",
      wavelength: "Invisible Spectrum"
    };
  }
};