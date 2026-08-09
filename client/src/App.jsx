import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Search,
  Home,
  Library,
  Heart,
  Globe,
  X,
  Check,
} from "lucide-react";

/* ---------------------------------------------------------
   ROMA (羅馬) — single-file, fully self-contained App.jsx
--------------------------------------------------------- */

const ACCENT = "#FFB84D";
const CULTURE = {
  ar: "#FF6B35",
  en: "#2DD4BF",
  hi: "#EC4899",
  zh: "#FBBF24",
};
const BG_GRADIENT = "linear-gradient(165deg, #2A1454 0%, #7A2C7A 50%, #E8623C 100%)";
const TEXT = "#FFF7EC";
const TEXT_MUTED = "rgba(255,247,236,0.72)";
const SURFACE = "rgba(255,255,255,0.08)";
const SURFACE_2 = "rgba(255,255,255,0.14)";
const BORDER = "rgba(255,255,255,0.18)";

const FONT = {
  ar: "'Noto Sans Arabic', sans-serif",
  en: "'Inter', sans-serif",
  hi: "'Noto Sans Devanagari', sans-serif",
  zh: "'Noto Sans SC', sans-serif",
};

const LANG_META = {
  ar: { native: "العربية", dir: "rtl" },
  en: { native: "English", dir: "ltr" },
  hi: { native: "हिन्दी", dir: "ltr" },
  zh: { native: "中文", dir: "ltr" },
};

const UI = {
  ar: {
    appName: "روما",
    tagline: "حيث تلتقي دروب العالم",
    home: "الرئيسية",
    search: "بحث",
    library: "مكتبتي",
    chooseLanguage: "اختر اللغة",
    languageSub: "أربع لغات، طريق واحد للموسيقى",
    featured: "المختارات",
    allSongs: "كل الأغاني",
    searchPlaceholder: "ابحث عن أغنية أو فنان…",
    nowPlaying: "قيد التشغيل",
    noResults: "لا توجد نتائج",
    songsCount: "أغاني",
    likedTitle: "الأغاني المفضّلة",
    likedEmpty: "لم تُضِف أي أغنية بعد. اضغط على القلب لحفظ أغنية هنا.",
  },
  en: {
    appName: "ROMA",
    tagline: "Where the world's roads meet",
    home: "Home",
    search: "Search",
    library: "Library",
    chooseLanguage: "Choose a language",
    languageSub: "Four languages, one road of music",
    featured: "Featured",
    allSongs: "All songs",
    searchPlaceholder: "Search songs or artists…",
    nowPlaying: "Now playing",
    noResults: "No results",
    songsCount: "songs",
    likedTitle: "Liked songs",
    likedEmpty: "Nothing saved yet. Tap the heart to keep a song here.",
  },
  hi: {
    appName: "रोमा",
    tagline: "जहाँ दुनिया की राहें मिलती हैं",
    home: "होम",
    search: "खोजें",
    library: "लाइब्रेरी",
    chooseLanguage: "भाषा चुनें",
    languageSub: "चार भाषाएँ, संगीत की एक राह",
    featured: "चुनिंदा",
    allSongs: "सभी गाने",
    searchPlaceholder: "गाना या कलाकार खोजें…",
    nowPlaying: "अभी बज रहा है",
    noResults: "कोई परिणाम नहीं",
    songsCount: "गाने",
    likedTitle: "पसंदीदा गाने",
    likedEmpty: "अभी कुछ सेव नहीं है। गाना यहाँ रखने के लिए दिल पर टैप करें।",
  },
  zh: {
    appName: "羅馬",
    tagline: "世界之路的交汇处",
    home: "主页",
    search: "搜索",
    library: "音乐库",
    chooseLanguage: "选择语言",
    languageSub: "四种语言，一条音乐之路",
    featured: "精选",
    allSongs: "全部歌曲",
    searchPlaceholder: "搜索歌曲或歌手…",
    nowPlaying: "正在播放",
    noResults: "没有结果",
    songsCount: "首歌",
    likedTitle: "我喜欢的歌曲",
    likedEmpty: "还没有收藏。点击心形图标即可保存到这里。",
  },
};

const PLAYLISTS = [
  {
    id: "amber",
    accent: CULTURE.ar,
    name: { ar: "ليالي العود", en: "Oud Nights", hi: "ऊद की रातें", zh: "乌德琴之夜" },
    tracks: [
      {
        id: "t1",
        title: { ar: "همسات الصحراء", en: "Desert Whispers", hi: "रेगिस्तान की फुसफुसाहट", zh: "沙漠的低语" },
        artist: { ar: "ياسمين النجار", en: "Yasmine Al-Najjar", hi: "यास्मीन अल-नज्जार", zh: "亚斯敏·纳贾尔" },
        duration: 214,
      },
      {
        id: "t2",
        title: { ar: "درب الحرير", en: "Silk Road", hi: "रेशम मार्ग", zh: "丝绸之路" },
        artist: { ar: "كريم رياض", en: "Karim Riad", hi: "करीम रियाद", zh: "卡里姆·里亚德" },
        duration: 251,
      },
      {
        id: "t3",
        title: { ar: "سهرة على القمر", en: "Evening Under the Moon", hi: "चाँद के नीचे शाम", zh: "月下夜话" },
        artist: { ar: "لمى حسن", en: "Lama Hassan", hi: "लमा हसन", zh: "拉玛·哈桑" },
        duration: 198,
      },
    ],
  },
  {
    id: "rose",
    accent: CULTURE.hi,
    name: { ar: "نبض بوليوود", en: "Bollywood Pulse", hi: "बॉलीवुड की धड़कन", zh: "宝莱坞律动" },
    tracks: [
      {
        id: "t4",
        title: { ar: "أحلام ملونة", en: "Colorful Dreams", hi: "रंगीन सपने", zh: "缤纷之梦" },
        artist: { ar: "أنجالي ميهرا", en: "Anjali Mehra", hi: "अंजलि मेहरा", zh: "安贾莉·梅赫拉" },
        duration: 227,
      },
      {
        id: "t5",
        title: { ar: "مطر الرياح الموسمية", en: "Monsoon Rain", hi: "मानसून की बारिश", zh: "季风雨" },
        artist: { ar: "روهان كابور", en: "Rohan Kapoor", hi: "रोहन कपूर", zh: "罗汉·卡普尔" },
        duration: 205,
      },
      {
        id: "t6",
        title: { ar: "نغمة القلب", en: "Tune of the Heart", hi: "दिल की धुन", zh: "心之旋律" },
        artist: { ar: "بريا شارما", en: "Priya Sharma", hi: "प्रिया शर्मा", zh: "普里娅·夏尔马" },
        duration: 240,
      },
    ],
  },
  {
    id: "gold",
    accent: CULTURE.zh,
    name: { ar: "لحن الشرق الجديد", en: "New Eastern Rhyme", hi: "नया पूर्वी सुर", zh: "国风新韵" },
    tracks: [
      {
        id: "t7",
        title: { ar: "تحت ضوء القمر", en: "Under the Moonlight", hi: "चाँदनी के नीचे", zh: "月光下" },
        artist: { ar: "لين مينغ", en: "Lin Meng", hi: "लिन मेंग", zh: "林梦" },
        duration: 233,
      },
      {
        id: "t8",
        title: { ar: "مطر جيانغنان", en: "Jiangnan Rain", hi: "जियांगनान की बारिश", zh: "江南雨" },
        artist: { ar: "تشين زيهان", en: "Chen Zihan", hi: "चेन ज़िहान", zh: "陈子涵" },
        duration: 219,
      },
      {
        id: "t9",
        title: { ar: "درب الحرير", en: "Silk Road Reprise", hi: "रेशम मार्ग की गूँज", zh: "丝路回响" },
        artist: { ar: "تشو شياو", en: "Zhou Xiao", hi: "चाओ श्याओ", zh: "周晓" },
        duration: 248,
      },
    ],
  },
  {
    id: "teal",
    accent: CULTURE.en,
    name: { ar: "مفترق أنديز", en: "Indie Crossroads", hi: "इंडी चौराहा", zh: "独立音乐十字路" },
    tracks: [
      {
        id: "t10",
        title: { ar: "أضواء المدينة", en: "City Lights", hi: "शहर की रोशनी", zh: "城市之光" },
        artist: { ar: "نوفا راي", en: "Nova Ray", hi: "नोवा रे", zh: "诺娃·雷" },
        duration: 202,
      },
      {
        id: "t11",
        title: { ar: "قوارب ورقية", en: "Paper Boats", hi: "कागज़ की नावें", zh: "纸船" },
        artist: { ar: "ذا واندرينغ آورز", en: "The Wandering Hours", hi: "द वांडरिंग आवर्स", zh: "游荡时光乐队" },
        duration: 211,
      },
      {
        id: "t12",
        title: { ar: "الساعة الذهبية", en: "Golden Hour", hi: "सुनहरा समय", zh: "黄金时刻" },
        artist: { ar: "ميرا لين", en: "Mira Lane", hi: "मीरा लेन", zh: "米拉·莱恩" },
        duration: 236,
      },
    ],
  },
];

const ALL_TRACKS = PLAYLISTS.flatMap((p) => p.tracks.map((t) => ({ ...t, accent: p.accent })));

function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Wordmark() {
  return (
    <div className="flex flex-col items-center">
      <span style={{ fontWeight: 700, fontSize: 30, color: TEXT, textShadow: "0 2px 14px rgba(0,0,0,0.25)" }}>
        羅馬
      </span>
      <div className="flex items-center gap-1.5 mt-2">
        {Object.values(CULTURE).map((c, i) => (
          <span key={i} style={{ width: 6, height: 6, borderRadius: 9999, background: c }} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [tab, setTab] = useState("home");
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState(new Set());
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  const t = UI[lang];
  const dir = LANG_META[lang].dir;
  const currentTrack = ALL_TRACKS[trackIndex];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => {
          if (e + 1 >= currentTrack.duration) {
            setTrackIndex((i) => (i + 1) % ALL_TRACKS.length);
            return 0;
          }
          return e + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentTrack]);

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const playTrack = (idx) => {
    setTrackIndex(idx);
    setElapsed(0);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  const next = () => {
    setTrackIndex((i) => (i + 1) % ALL_TRACKS.length);
    setElapsed(0);
  };
  const prev = () => {
    setTrackIndex((i) => (i - 1 + ALL_TRACKS.length) % ALL_TRACKS.length);
    setElapsed(0);
  };

  const filteredTracks = useMemo(() => {
    if (!query.trim()) return ALL_TRACKS;
    const q = query.trim().toLowerCase();
    return ALL_TRACKS.filter(
      (tr) =>
        Object.values(tr.title).some((v) => v.toLowerCase().includes(q)) ||
        Object.values(tr.artist).some((v) => v.toLowerCase().includes(q))
    );
  }, [query]);

  const likedTracks = ALL_TRACKS.filter((tr) => liked.has(tr.id));

  return (
    <div
      dir={dir}
      style={{ fontFamily: FONT[lang] }}
      className="min-h-screen w-full flex items-center justify-center py-6 px-3"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap');
        .roma-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .roma-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 999px; }
        .roma-btn { cursor: pointer; -webkit-tap-highlight-color: transparent; transition: transform 0.15s ease, background-color 0.2s ease; }
        .roma-btn:active { transform: scale(0.96); }
        .lang-card {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .lang-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      <div
        className="w-full max-w-md relative overflow-hidden flex flex-col"
        style={{
          height: "860px",
          maxHeight: "92vh",
          borderRadius: "28px",
          background: BG_GRADIENT,
          boxShadow: "0 30px 70px rgba(232,98,60,0.28), 0 0 0 1px rgba(255,255,255,0.12)",
          color: TEXT,
        }}
      >
        {/* ambient glow accents */}
        <div
          aria-hidden
          style={{
            position: "absolute", top: -60, right: -60, width: 220, height: 220,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${ACCENT}66 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", bottom: 140, left: -70, width: 220, height: 220,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${CULTURE.en}55 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 relative z-10 flex-shrink-0">
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "0.06em" }}>{t.appName}</span>
          <button
            type="button"
            onClick={() => setShowLangMenu(true)}
            aria-label={t.chooseLanguage}
            className="roma-btn flex items-center gap-1.5 rounded-full px-3.5 py-1.5 shadow-sm"
            style={{ background: SURFACE_2, border: `1px solid ${BORDER}`, color: TEXT }}
          >
            <Globe size={15} />
            <span className="text-xs font-semibold">{LANG_META[lang].native}</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto roma-scrollbar px-5 relative z-10" style={{ paddingBottom: 190 }}>
          {tab === "home" && (
            <>
              <div className="flex flex-col items-center text-center pt-4 pb-7">
                <Wordmark />
                <p className="mt-3 text-sm" style={{ color: TEXT_MUTED }}>{t.tagline}</p>
              </div>

              <h2 className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: TEXT_MUTED }}>
                {t.featured}
              </h2>
              <div className="flex gap-3 overflow-x-auto roma-scrollbar pb-5 -mx-1 px-1">
                {PLAYLISTS.map((pl) => (
                  <div
                    key={pl.id}
                    className="flex-shrink-0 rounded-2xl p-4 flex flex-col justify-between"
                    style={{
                      width: 148,
                      height: 112,
                      background: `linear-gradient(160deg, ${pl.accent}CC, ${pl.accent}55)`,
                      border: "1px solid rgba(255,255,255,0.3)",
                      boxShadow: `0 8px 20px ${pl.accent}40`,
                    }}
                  >
                    <div className="w-6 h-6 rounded-full" style={{ background: TEXT }} />
                    <div>
                      <p className="text-sm font-semibold leading-snug">{pl.name[lang]}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>
                        {pl.tracks.length} {t.songsCount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-xs font-semibold mt-2 mb-2 uppercase tracking-wide" style={{ color: TEXT_MUTED }}>
                {t.allSongs}
              </h2>
              <TrackList
                tracks={ALL_TRACKS}
                lang={lang}
                currentId={currentTrack.id}
                isPlaying={isPlaying}
                liked={liked}
                onToggleLike={toggleLike}
                onPlay={(id) => playTrack(ALL_TRACKS.findIndex((tr) => tr.id === id))}
              />
            </>
          )}

          {tab === "search" && (
            <div className="pt-5">
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-5 shadow-inner"
                style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
              >
                <Search size={16} style={{ color: TEXT_MUTED }} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="bg-transparent outline-none text-sm flex-1"
                  style={{ color: TEXT }}
                />
              </div>
              {filteredTracks.length === 0 ? (
                <p className="text-sm text-center pt-8" style={{ color: TEXT_MUTED }}>{t.noResults}</p>
              ) : (
                <TrackList
                  tracks={filteredTracks}
                  lang={lang}
                  currentId={currentTrack.id}
                  isPlaying={isPlaying}
                  liked={liked}
                  onToggleLike={toggleLike}
                  onPlay={(id) => playTrack(ALL_TRACKS.findIndex((tr) => tr.id === id))}
                />
              )}
            </div>
          )}

          {tab === "library" && (
            <div className="pt-5">
              <h2 className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: TEXT_MUTED }}>
                {t.likedTitle}
              </h2>
              {likedTracks.length === 0 ? (
                <p className="text-sm pt-2" style={{ color: TEXT_MUTED }}>{t.likedEmpty}</p>
              ) : (
                <TrackList
                  tracks={likedTracks}
                  lang={lang}
                  currentId={currentTrack.id}
                  isPlaying={isPlaying}
                  liked={liked}
                  onToggleLike={toggleLike}
                  onPlay={(id) => playTrack(ALL_TRACKS.findIndex((tr) => tr.id === id))}
                />
              )}
            </div>
          )}
        </div>

        {/* Mini player + bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div
            className="mx-4 mb-3 rounded-2xl px-3 py-2.5 flex items-center gap-3 shadow-lg"
            style={{ background: "rgba(28,16,48,0.75)", backdropFilter: "blur(12px)", border: `1px solid ${BORDER}` }}
          >
            <div className="w-11 h-11 rounded-lg flex-shrink-0 shadow" style={{ background: `linear-gradient(145deg, ${currentTrack.accent}, ${ACCENT})` }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{currentTrack.title[lang]}</p>
              <p className="text-[11px] truncate" style={{ color: TEXT_MUTED }}>{currentTrack.artist[lang]}</p>
              <div className="mt-1.5 h-[3px] rounded-full w-full overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(elapsed / currentTrack.duration) * 100}%`, background: ACCENT }} />
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button type="button" onClick={prev} aria-label="previous" className="roma-btn p-2" style={{ color: TEXT }}>
                <SkipBack size={17} />
              </button>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? t.nowPlaying : "play"}
                className="roma-btn w-9 h-9 rounded-full flex items-center justify-center shadow-md"
                style={{ background: `linear-gradient(135deg, ${ACCENT}, #FF8A5B)`, color: "#2A1454" }}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button type="button" onClick={next} aria-label="next" className="roma-btn p-2" style={{ color: TEXT }}>
                <SkipForward size={17} />
              </button>
            </div>
          </div>

          <div
            className="flex items-stretch justify-around px-2 pb-5 pt-2"
            style={{ background: "rgba(20,10,36,0.95)", borderTop: `1px solid ${BORDER}` }}
          >
            {[
              { key: "home", icon: Home, label: t.home },
              { key: "search", icon: Search, label: t.search },
              { key: "library", icon: Library, label: t.library },
            ].map(({ key, icon: Icon, label }) => (
              <button
                type="button"
                key={key}
                onClick={() => setTab(key)}
                className="roma-btn flex flex-col items-center gap-1 py-1.5 px-4"
                style={{ color: tab === key ? ACCENT : TEXT_MUTED }}
              >
                <Icon size={19} />
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Language modal - Updated with smooth appearance and active positive styling */}
        {showLangMenu && (
          <div
            className="absolute inset-0 z-30 flex items-end justify-center backdrop-blur-sm transition-opacity"
            style={{ background: "rgba(10,5,20,0.65)" }}
            onClick={() => setShowLangMenu(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-t-3xl px-6 pt-6 pb-9 shadow-2xl animate-in fade-in slide-in-from-bottom duration-300"
              style={{ background: "linear-gradient(180deg, #4A2586 0%, #2A1454 100%)", borderTop: `1px solid ${BORDER}` }}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold" style={{ color: TEXT }}>{t.chooseLanguage}</h3>
                <button type="button" onClick={() => setShowLangMenu(false)} aria-label="close" className="roma-btn p-1.5 rounded-full bg-white/10 hover:bg-white/20" style={{ color: TEXT }}>
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs mb-6" style={{ color: "rgba(255,247,236,0.75)" }}>{t.languageSub}</p>
              
              <div className="grid grid-cols-2 gap-3.5">
                {Object.keys(LANG_META).map((code) => {
                  const isSelected = lang === code;
                  return (
                    <button
                      type="button"
                      key={code}
                      onClick={() => {
                        setLang(code);
                        setShowLangMenu(false);
                      }}
                      className="roma-btn lang-card rounded-2xl px-4 py-4 flex items-center justify-between relative overflow-hidden"
                      style={{
                        background: isSelected 
                          ? `linear-gradient(135deg, ${CULTURE[code]}, ${ACCENT})` 
                          : "rgba(255,255,255,0.08)",
                        border: isSelected ? "1px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.15)",
                        boxShadow: isSelected ? `0 8px 20px ${CULTURE[code]}55` : "none",
                      }}
                    >
                      <span 
                        style={{ 
                          fontFamily: FONT[code], 
                          color: isSelected ? "#1C0A30" : TEXT,
                          fontWeight: isSelected ? 700 : 500
                        }} 
                        className="text-sm"
                      >
                        {LANG_META[code].native}
                      </span>
                      
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-transform"
                        style={{
                          background: isSelected ? "#1C0A30" : "rgba(255,255,255,0.1)",
                          color: isSelected ? ACCENT : "transparent"
                        }}
                      >
                        {isSelected && <Check size={13} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TrackList({ tracks, lang, currentId, isPlaying, liked, onToggleLike, onPlay }) {
  return (
    <div className="flex flex-col gap-1 pb-2">
      {tracks.map((tr) => {
        const active = tr.id === currentId;
        return (
          <div
            key={tr.id}
            className="flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors"
            style={{ background: active ? "rgba(255,255,255,0.14)" : "transparent" }}
          >
            <button
              type="button"
              onClick={() => onPlay(tr.id)}
              className="roma-btn w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow"
              style={{ background: `linear-gradient(145deg, ${tr.accent}, ${ACCENT})` }}
              aria-label="play"
            >
              {active && isPlaying ? <Pause size={14} color="#2A1454" /> : <Play size={14} color="#2A1454" />}
            </button>
            <button type="button" onClick={() => onPlay(tr.id)} className="roma-btn flex-1 min-w-0 text-left rtl:text-right">
              <p className="text-sm font-medium truncate" style={{ color: active ? ACCENT : TEXT }}>{tr.title[lang]}</p>
              <p className="text-[11px] truncate" style={{ color: TEXT_MUTED }}>{tr.artist[lang]}</p>
            </button>
            <span className="text-[11px] flex-shrink-0" style={{ color: TEXT_MUTED }}>{fmtTime(tr.duration)}</span>
            <button type="button" onClick={() => onToggleLike(tr.id)} className="roma-btn flex-shrink-0 p-1" aria-label="like">
              <Heart size={16} color={liked.has(tr.id) ? "#EC4899" : "rgba(255,247,236,0.55)"} fill={liked.has(tr.id) ? "#EC4899" : "none"} />
            </button>
          </div>
        );
      })}
    </div>
  );
}