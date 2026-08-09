import React, { useState } from 'react';
import { Play, Pause, Search, Heart, Music, Globe, Library, Home, ChevronDown } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // تعريف اللغات الأربع
  const languages = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'zh', label: '中文' },
  ];

  // نظام الألوان المخصص من تصميمك
  const colors = {
    arabic: '#FF6B35',
    english: '#2DD4BF',
    hindi: '#EC4899',
    chinese: '#FBBF24',
    accent: '#FFB84D'
  };

  const featured = [
    { title: 'Oud Nights', songs: '3 songs', color: colors.arabic },
    { title: 'Bollywood Pulse', songs: '3 songs', color: colors.hindi },
    { title: 'New Eastern Rhyme', songs: '3 songs', color: colors.chinese },
  ];

  const songs = [
    { title: 'Desert Whispers', artist: 'Yasmine Al-Najjar', duration: '3:34', color: colors.arabic },
    { title: 'Colorful Dreams', artist: 'Anjali Mehra', duration: '3:47', color: colors.hindi },
    { title: 'Under the Moonlight', artist: 'Lin Meng', duration: '3:53', color: colors.chinese },
  ];

  return (
    <div 
      className="min-h-screen text-white font-sans overflow-hidden bg-gradient-to-br from-[#2A1454] via-[#7A2C7A] to-[#E8623C]" 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <header className="p-6 flex justify-between items-center relative">
        <h1 className="text-2xl font-bold tracking-wider">ROMA</h1>
        
        {/* Language Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-white/20 hover:bg-white/20 transition-all"
          >
            <Globe className="w-4 h-4" />
            {languages.find(l => l.code === lang)?.label}
            <ChevronDown className="w-4 h-4 opacity-70" />
          </button>

          {isLangMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-32 bg-[#1a0b33] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-start px-4 py-3 hover:bg-white/10 transition-colors ${lang === l.code ? 'text-[#FFB84D] font-bold' : ''}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center my-6">
        <h2 className="text-4xl font-bold mb-2">羅馬</h2>
        <p className="text-white/70">Where the world's roads meet</p>
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-[#FFB84D]"></div>
          <div className="w-2 h-2 rounded-full bg-[#2DD4BF]"></div>
          <div className="w-2 h-2 rounded-full bg-[#EC4899]"></div>
          <div className="w-2 h-2 rounded-full bg-[#FBBF24]"></div>
        </div>
      </section>

      {/* Featured */}
      <section className="px-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 opacity-80">FEATURED</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {featured.map((item, i) => (
            <div key={i} style={{ backgroundColor: item.color }} className="min-w-[140px] h-[140px] rounded-2xl p-4 flex flex-col justify-end shadow-lg">
              <Music className="w-6 h-6 mb-2" />
              <p className="font-bold">{item.title}</p>
              <p className="text-xs opacity-80">{item.songs}</p>
            </div>
          ))}
        </div>
      </section>

      {/* All Songs */}
      <section className="px-6 pb-24">
        <h3 className="text-lg font-semibold mb-4 opacity-80">ALL SONGS</h3>
        <div className="space-y-4">
          {songs.map((song, i) => (
            <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{ color: song.color }} 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-xs text-white/60">{song.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span>{song.duration}</span>
                <Heart className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mini Player */}
      <div className="fixed bottom-20 left-4 right-4 bg-black/30 backdrop-blur-lg p-4 rounded-2xl flex items-center justify-between border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#FFB84D]"></div>
          <div>
            <p className="text-sm font-bold">Under the Moonlight</p>
            <p className="text-xs text-white/60">Lin Meng</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button><Play className="w-6 h-6 fill-current" /></button>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-[#1a0b33] p-4 flex justify-around border-t border-white/10">
        <div className="text-[#FFB84D] flex flex-col items-center gap-1"><Home className="w-6 h-6" /><span className="text-[10px]">Home</span></div>
        <div className="text-white/50 flex flex-col items-center gap-1"><Search className="w-6 h-6" /><span className="text-[10px]">Search</span></div>
        <div className="text-white/50 flex flex-col items-center gap-1"><Library className="w-6 h-6" /><span className="text-[10px]">Library</span></div>
      </nav>
    </div>
  );
}
