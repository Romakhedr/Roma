import React, { useState } from 'react';
import { Music, Globe, Play, Pause, Search, Heart, Settings } from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [lang, setLang] = useState('ar');

  const content = {
    ar: {
      title: 'تطبيق روما للموسيقى متعدد اللغات',
      subtitle: 'استمتع بأفضل الألحان العالمية والمحلية',
      search: 'ابحث عن أغنية أو الفنان...',
      play: 'تشغيل',
      pause: 'إيقاف مؤقت'
    },
    en: {
      title: 'Roma Multilingual Music App',
      subtitle: 'Enjoy the best global and local melodies',
      search: 'Search for a song or artist...',
      play: 'Play',
      pause: 'Pause'
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Music className="w-8 h-8 text-indigo-500" />
          <span className="text-xl font-bold">Roma Music</span>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center space-x-1 space-x-reverse bg-gray-800 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-700 transition"
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="text-center my-8">
          <h1 className="text-3xl font-extrabold mb-2">{t.title}</h1>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className={`absolute top-3.5 ${lang === 'ar' ? 'right-4' : 'left-4'} w-5 h-5 text-gray-400`} />
          <input 
            type="text" 
            placeholder={t.search} 
            className={`w-full bg-gray-800 border border-gray-700 rounded-xl py-3 ${lang === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'} focus:outline-none focus:border-indigo-500`}
          />
        </div>

        {/* Player Banner */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6 rounded-2xl flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center">
              <Music className="w-8 h-8 text-indigo-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg">أغنية تجريبية</h3>
              <p className="text-sm text-indigo-200">فنان روما</p>
            </div>
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
          </button>
        </div>
      </main>
    </div>
  );
}
