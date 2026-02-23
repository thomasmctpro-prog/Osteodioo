/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, ChangeEvent, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bell, 
  Settings, 
  Play, 
  Pause,
  ArrowRight, 
  Home, 
  Search, 
  Library, 
  User,
  Plus,
  Upload,
  X,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  ChevronLeft,
  LogOut,
  Shield,
  HelpCircle,
  Moon
} from "lucide-react";

interface Track {
  id: number;
  title: string;
  duration: string;
  episode: string;
  image: string;
  audioUrl?: string;
}

const INITIAL_PODCASTS: Track[] = [
  {
    id: 1,
    title: "[DEMO] Mécanique vertébrale équine",
    duration: "45 min",
    episode: "Ép. 24",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4v39BbS60beRD6w9CNEm3fU2OJZAcbNkNKbKByspiofYkNZ4dky3gCgP0zD3GqBzuYyQk8N9raCwIyexZFF1f8dr_ToyfcD_5YsNW_G4xvK_S0ABYjVVMNgz2uzDi9tioFWgS0eY1-7bUA-1D1YLqEDpUjatJUf3fywYI9AS2MFgVOb--aaVB9Z0rmKRSqhrAgcs_P3WIxLGd0GxiQi-5IAyst4WmLekBtb1YUsRN44Ey2KmqXdICYTBC7b9DeiaIBFseTgP-XsdT",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "[DEMO] Mobilisation bovine",
    duration: "32 min",
    episode: "Ép. 22",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDU03J-dO4DkRdLvtdapbKDkzu8f45riQhIRXTO5o2vCS-gtGKZHgtAwPe4rgMhJp-PIuoLdupufpMwlKBP2Xm2Ao5MWtnxHBPZxjc5ntIerQl7OecbATmeE0Jxf1XxuwsEFvahukWqBdbZmKDuCIIzIcDRzSezjdWholbMQZQqLPMLpN5bZKih8AvF1D19ckVIoXCwt9S1oC_jwyHACScq5pLyvNEIN8JxAUoJaCODaGtbBqcSZ5_0q9E0CFTUMyV1ReiKcm6XdaLU",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "[DEMO] Analyse de la marche canine",
    duration: "58 min",
    episode: "Ép. 21",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG3P9jHUcCeS8z_VIRud8aSIYq50vp5KpelZTsQiUywsILBpS8G1U2lzgZEogMc0KJnPGmo8MyJeDWGVIuo1_q20GWqZYpaUod5GdrHquyC9MfJRzYpXWgxdYAifmCanmXcZwy_hW5DHCCAV41vovZRc1-tvtQSULWH-WFsxyawubW0PkF52z621WtA1ZM_jTk3Vo6g62vMRfzNtuD6a9R8u7j2S7pZzkHlq-YuwE-l9jxVe5Fqz2iAzDlVZkR8pduWGp0ydPCmo76",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

const VIDEOS = [
  {
    id: 1,
    title: "[DEMO] Technique de thrust cervical",
    views: "12k vues",
    duration: "12:45",
    image: "https://picsum.photos/seed/thrust/800/450"
  },
  {
    id: 2,
    title: "[DEMO] Examen clinique du cheval",
    views: "8.5k vues",
    duration: "24:10",
    image: "https://picsum.photos/seed/horse-exam/800/450"
  },
  {
    id: 3,
    title: "[DEMO] Bases de l'anatomie canine",
    views: "15k vues",
    duration: "18:30",
    image: "https://picsum.photos/seed/dog-anatomy/800/450"
  }
];

const LEARNING_PATHS = [
  {
    id: 1,
    tag: "Masterclass",
    title: "Ostéopathie équine",
    stats: "12 Cours • 48 Leçons",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4vUKyZm0e-EYf1suZ4YX_FwkMjUbjGn5yNv7jS4CEIy1_7dxbLZvy1X2GEGOZrEYrlL5JzAH5_Ba7Heywqu6FFJ8Cr0L3W5ILtiP1pPAhfh34IdY6oeZpE37i4JoB36Ipbwip72pY-SbikZImtHIf9okh0oBZuhXhIpQwOWmx-7DSGRnXPBiPAaLqijZ93q6ew6B3Omzk_CDN9CQ9fkt2NzhJSAMXrU6YOe5MEaIhQsB_SMaXnZKCYOW-DBzEopAAAthWCTHjyfjW"
  },
  {
    id: 2,
    tag: "Pratique",
    title: "Techniques bovines",
    stats: "8 Cours • 32 Leçons",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClG_GbHWuQmzaQrwPt2w4jaJb-zgCZ50tLJOxcbkFG6ANR1ImxCuvoCou7gyBuPwL2dm0O5b_JGWcATpU2b5j5APzH7Da3zOY4fWcpeX2caoncIw-HCJDOmYrUqQCJIRecOADSP-GbSRc4EGa5PBHnAP82gE5RppRJjKGn3jCiVvAwfXPApJQmmPd7vANNCSccy-zJ3iOL9aoRWmyfzqBer8WYn7Aa04oC2GwnonpKNKUbMpBz2MwIFBMQ0YVp05l0krE-2oy-vC30"
  },
  {
    id: 3,
    tag: "Clinique",
    title: "Pratique canine",
    stats: "15 Cours • 60 Leçons",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFsC9gGzTS1pZLQv4-ppiYzYiFapr_3_zmzv9JNWpmdc94hGT3qdtZCHzR01Z7hM0E2M_Uu-DIl4K1oHFH6d2cRcMMUMtwbqKwkfJc4eeO-NsFUEIol4UZKWIiLRGmA6nlxjyirZzAcYTgLupeH-8iFGWrLkOstEU4QxlMiqxxq_hbgkUDYYnsvu7q6y6oIvjwKfhW7TEf-PYquBHp9s9EHj-tcOC45aOKEnomdt1edrx3VXUQn5In3KIoRqvEET2HWlkC9M1uiVgt"
  }
];

export default function App() {
  const [podcasts, setPodcasts] = useState<Track[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // New States
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'library' | 'profile'>('home');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredPodcasts = useMemo(() => {
    return podcasts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [podcasts, searchQuery]);

  const favoriteTracks = useMemo(() => {
    return podcasts.filter(p => favorites.has(p.id));
  }, [podcasts, favorites]);

  // Fetch podcasts on mount - works in both static and server modes
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        // Try to fetch from server first (for dev mode or server deployment)
        const response = await fetch("/api/podcasts");
        
        if (response.ok) {
          const data = await response.json();
          
          // Map server data to Track interface
          const mappedData = data.map((p: any) => ({
            ...p,
            audioUrl: `/api/podcasts/${p.id}/audio`
          }));
          
          if (mappedData.length > 0) {
            setPodcasts(mappedData);
          } else {
            // Fall back to localStorage or initial podcasts
            const savedPodcasts = localStorage.getItem('osteodio_podcasts');
            if (savedPodcasts) {
              setPodcasts(JSON.parse(savedPodcasts));
            } else {
              setPodcasts(INITIAL_PODCASTS);
            }
          }
        } else {
          // Server not available, use localStorage or initial podcasts
          const savedPodcasts = localStorage.getItem('osteodio_podcasts');
          if (savedPodcasts) {
            setPodcasts(JSON.parse(savedPodcasts));
          } else {
            setPodcasts(INITIAL_PODCASTS);
          }
        }
      } catch (error) {
        console.error("Failed to fetch podcasts:", error);
        // Fall back to localStorage or initial podcasts
        const savedPodcasts = localStorage.getItem('osteodio_podcasts');
        if (savedPodcasts) {
          setPodcasts(JSON.parse(savedPodcasts));
        } else {
          setPodcasts(INITIAL_PODCASTS);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        // Read file as base64
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64Data = e.target?.result as string;
          
          const payload = {
            title: file.name.replace(/\.[^/.]+$/, ""),
            duration: "Importé",
            episode: "Local",
            image: `https://picsum.photos/seed/${Date.now()}/400/400`,
            audioData: base64Data,
            mimeType: file.type
          };

          // Try to upload to server first (for server deployment)
          try {
            const response = await fetch("/api/podcasts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });

            if (response.ok) {
              const newPodcast = await response.json();
              const track: Track = {
                ...newPodcast,
                audioUrl: `/api/podcasts/${newPodcast.id}/audio`
              };
              setPodcasts([track, ...podcasts]);
              setCurrentTrack(track);
              setIsPlaying(true);
              setIsUploading(false);
              setIsLoading(false);
              return;
            }
          } catch (serverError) {
            console.log("Server not available, using localStorage");
          }

          // Fallback: Store in localStorage for static deployment
          const newId = Date.now();
          const track: Track = {
            id: newId,
            title: payload.title,
            duration: payload.duration,
            episode: payload.episode,
            image: payload.image,
            audioUrl: base64Data // Store base64 directly for local playback
          };
          
          // Save to localStorage
          const savedPodcasts = localStorage.getItem('osteodio_podcasts');
          const existingPodcasts = savedPodcasts ? JSON.parse(savedPodcasts) : [];
          const updatedPodcasts = [track, ...existingPodcasts];
          localStorage.setItem('osteodio_podcasts', JSON.stringify(updatedPodcasts));
          
          setPodcasts(updatedPodcasts);
          setCurrentTrack(track);
          setIsPlaying(true);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
        setIsLoading(false);
      }
    }
  };

  const togglePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans pb-40">
      <audio 
        ref={audioRef}
        src={currentTrack?.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#121212]/80 backdrop-blur-md">
        <div className="flex items-center gap-3" onClick={() => setActiveTab('profile')}>
          <div className="size-10 rounded-full bg-zinc-800 overflow-hidden border border-primary/20 cursor-pointer">
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvchlloXo8jUGHOCT0VmzW6i80wbuGV2csiLUOPAb6XiLbgejkJCbv3Hqfmg8aLNrjPZOrR_N2VBPnYSIDoHClFrdfL6r1BjxrLStrVehPDcW9BiQGTaMLWGn8o95wViAHhg9ooCCxKDvTAKUKJ7xObmZoJ8jqc3IKAF1_1bQai0BeSOEAZgqOWn6ghU_3Ha6hTIjxM-h407fXtDE5saG6QLROjj9iFj9XUKURlCZ_8MwmQHHR9Z3ZW_93VBSvmy_jPKAFDovMn-Kz"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="cursor-pointer">
            <p className="text-xs text-zinc-400 font-medium">Bonsoir</p>
            <h2 className="text-sm font-bold tracking-tight">Alex Sterling</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowNotifications(true)} className="p-2 rounded-full hover:bg-primary/10 transition-colors">
            <Bell className="size-6" />
          </button>
          <button onClick={() => setShowSettings(true)} className="p-2 rounded-full hover:bg-primary/10 transition-colors">
            <Settings className="size-6" />
          </button>
        </div>
      </header>

      <main>
        {isLoading && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="font-bold text-primary">Chargement...</p>
            </div>
          </div>
        )}

        {activeTab === 'home' && (
          <>
            {/* Filters */}
            <div className="flex gap-3 px-6 py-4 overflow-x-auto hide-scrollbar">
              <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-primary px-6 text-black font-bold text-sm">Tout</button>
              <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 px-6 text-white font-medium text-sm border border-white/5">Anatomie</button>
              <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 px-6 text-white font-medium text-sm border border-white/5">Techniques</button>
              <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 px-6 text-white font-medium text-sm border border-white/5">Études de cas</button>
            </div>

            {/* Podcasts Section */}
            <section className="mt-4">
              <div className="flex items-center justify-between px-6 mb-4">
                <h3 className="text-xl font-bold tracking-tight">Podcasts récents</h3>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsUploading(true)}
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
                  >
                    <Plus className="size-4" />
                    Importer
                  </button>
                  <button className="text-sm font-semibold text-zinc-400">Tout afficher</button>
                </div>
              </div>
              
              <div className="flex gap-4 px-6 overflow-x-auto hide-scrollbar">
                <AnimatePresence mode="popLayout">
                  {podcasts.map((podcast) => (
                    <motion.div 
                      key={podcast.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex flex-col gap-3 min-w-[160px] w-40 group cursor-pointer relative"
                    >
                      <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg bg-zinc-900">
                        <img 
                          alt={podcast.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          src={podcast.image}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center" onClick={() => togglePlay(podcast)}>
                          {(currentTrack?.id === podcast.id && isPlaying) ? (
                            <Pause className="size-12 text-primary fill-current" />
                          ) : (
                            <Play className="size-12 text-white fill-current opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(podcast.id); }}
                          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all ${favorites.has(podcast.id) ? 'bg-primary text-black' : 'bg-black/40 text-white opacity-0 group-hover:opacity-100'}`}
                        >
                          <Heart className={`size-4 ${favorites.has(podcast.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <div onClick={() => togglePlay(podcast)}>
                        <p className={`font-bold text-sm truncate ${currentTrack?.id === podcast.id ? 'text-primary' : 'text-white'}`}>
                          {podcast.title}
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">{podcast.duration} • {podcast.episode}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            {/* Videos Section */}
            <section className="mt-10">
              <div className="flex items-center justify-between px-6 mb-4">
                <h3 className="text-xl font-bold tracking-tight">Vidéos populaires</h3>
                <button className="text-sm font-semibold text-primary">Tout afficher</button>
              </div>
              <div className="flex gap-4 px-6 overflow-x-auto hide-scrollbar">
                {VIDEOS.map((video) => (
                  <motion.div 
                    key={video.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col gap-3 min-w-[280px] w-72 group cursor-pointer relative"
                  >
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-zinc-900">
                      <img 
                        alt={video.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        src={video.image}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold">
                        {video.duration}
                      </div>
                      <button className="absolute inset-0 m-auto size-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="size-6 text-white fill-current" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(video.id); }}
                        className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all ${favorites.has(video.id) ? 'bg-primary text-black' : 'bg-black/40 text-white opacity-0 group-hover:opacity-100'}`}
                      >
                        <Heart className={`size-4 ${favorites.has(video.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <div>
                      <p className="font-bold text-sm truncate">{video.title}</p>
                      <p className="text-xs text-zinc-400 mt-1">{video.views} • Il y a 2 jours</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Learning Paths Section */}
            <section className="mt-10 px-6">
              <h3 className="text-2xl font-bold tracking-tight mb-6">Parcours d'apprentissage</h3>
              <div className="grid grid-cols-1 gap-6">
                {LEARNING_PATHS.map((path) => (
                  <motion.div 
                    key={path.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative h-80 w-full rounded-3xl overflow-hidden group shadow-2xl cursor-pointer"
                  >
                    <img 
                      alt={path.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src={path.image}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-[10px] uppercase tracking-widest font-bold mb-2">
                          {path.tag}
                        </span>
                        <h4 className="text-3xl font-bold text-white tracking-tight">{path.title}</h4>
                        <p className="text-zinc-300 text-sm mt-1">{path.stats}</p>
                      </div>
                      <button className="size-14 bg-primary rounded-full flex items-center justify-center shadow-lg transform transition-transform active:scale-90">
                        <ArrowRight className="size-8 text-black" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'search' && (
          <div className="px-6 py-4">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 size-5" />
              <input 
                type="text" 
                placeholder="Rechercher un podcast, une vidéo..." 
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {filteredPodcasts.map(podcast => (
                <motion.div 
                  key={podcast.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-zinc-900/50 rounded-2xl p-3 border border-white/5"
                  onClick={() => togglePlay(podcast)}
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-3">
                    <img src={podcast.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-bold text-sm truncate">{podcast.title}</p>
                  <p className="text-xs text-zinc-500">{podcast.duration}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="px-6 py-4">
            <h3 className="text-2xl font-bold mb-6">Ma Bibliothèque</h3>
            
            <div className="flex gap-4 mb-8">
              <button className="bg-primary text-black px-6 py-2 rounded-full font-bold text-sm">Favoris</button>
              <button className="bg-zinc-800 text-white px-6 py-2 rounded-full font-bold text-sm">Téléchargements</button>
            </div>

            {favoriteTracks.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="size-12 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-500">Vous n'avez pas encore de favoris.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {favoriteTracks.map(track => (
                  <div key={track.id} className="flex items-center gap-4 bg-zinc-900/50 p-3 rounded-2xl border border-white/5" onClick={() => togglePlay(track)}>
                    <img src={track.image} alt="" className="size-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{track.title}</p>
                      <p className="text-xs text-zinc-500">{track.episode}</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(track.id); }}
                      className="text-primary"
                    >
                      <Heart className="size-5 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="px-6 py-4">
            <div className="flex flex-col items-center mb-10">
              <div className="size-24 rounded-full bg-zinc-800 overflow-hidden border-4 border-primary/20 mb-4">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvchlloXo8jUGHOCT0VmzW6i80wbuGV2csiLUOPAb6XiLbgejkJCbv3Hqfmg8aLNrjPZOrR_N2VBPnYSIDoHClFrdfL6r1BjxrLStrVehPDcW9BiQGTaMLWGn8o95wViAHhg9ooCCxKDvTAKUKJ7xObmZoJ8jqc3IKAF1_1bQai0BeSOEAZgqOWn6ghU_3Ha6hTIjxM-h407fXtDE5saG6QLROjj9iFj9XUKURlCZ_8MwmQHHR9Z3ZW_93VBSvmy_jPKAFDovMn-Kz" alt="" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">Alex Sterling</h3>
              <p className="text-zinc-500 text-sm">Ostéopathe Animalier</p>
            </div>

            <div className="space-y-2">
              <button onClick={() => setShowSettings(true)} className="w-full flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-white/5 hover:bg-zinc-800 transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="size-5 text-zinc-400" />
                  <span className="font-medium">Paramètres</span>
                </div>
                <ChevronLeft className="size-5 text-zinc-600 rotate-180" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-white/5 hover:bg-zinc-800 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="size-5 text-zinc-400" />
                  <span className="font-medium">Sécurité</span>
                </div>
                <ChevronLeft className="size-5 text-zinc-600 rotate-180" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-white/5 hover:bg-zinc-800 transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="size-5 text-zinc-400" />
                  <span className="font-medium">Aide & Support</span>
                </div>
                <ChevronLeft className="size-5 text-zinc-600 rotate-180" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-red-500/10 rounded-2xl border border-red-500/20 hover:bg-red-500/20 transition-colors mt-8">
                <div className="flex items-center gap-3 text-red-500">
                  <LogOut className="size-5" />
                  <span className="font-medium">Déconnexion</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Persistent Audio Player */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-24 left-4 right-4 z-50 bg-zinc-900 border border-white/10 rounded-2xl p-3 shadow-2xl flex items-center gap-4"
          >
            <div className="size-12 rounded-lg overflow-hidden shrink-0">
              <img src={currentTrack.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold truncate">{currentTrack.title}</h4>
              <p className="text-xs text-zinc-400 truncate">{currentTrack.episode}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-zinc-400 hover:text-white transition-colors">
                <SkipBack className="size-5" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="size-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}
              </button>
              <button className="text-zinc-400 hover:text-white transition-colors">
                <SkipForward className="size-5" />
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-2 ml-4">
              <Volume2 className="size-5 text-zinc-400" />
              <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-primary" />
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-800 rounded-t-2xl overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploading && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploading(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsUploading(false)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="size-6" />
              </button>
              
              <div className="text-center">
                <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="size-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Importer un audio</h3>
                <p className="text-zinc-400 text-sm mb-8">
                  Sélectionnez un fichier audio (MP3, WAV) pour l'ajouter à votre bibliothèque.
                </p>
                
                <input 
                  type="file" 
                  accept="audio/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-primary text-black font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Search className="size-5" />
                  Parcourir les fichiers
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-50 pointer-events-none">
        <nav className="mx-auto max-w-sm pointer-events-auto bg-zinc-900/90 backdrop-blur-xl border border-white/5 rounded-full flex items-center justify-around px-4 py-3 shadow-2xl">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 group transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-zinc-400 hover:text-primary'}`}>
            <Home className={`size-6 ${activeTab === 'home' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Accueil</span>
          </button>
          <button onClick={() => setActiveTab('search')} className={`flex flex-col items-center gap-1 group transition-colors ${activeTab === 'search' ? 'text-primary' : 'text-zinc-400 hover:text-primary'}`}>
            <Search className="size-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Rechercher</span>
          </button>
          <button onClick={() => setActiveTab('library')} className={`flex flex-col items-center gap-1 group transition-colors ${activeTab === 'library' ? 'text-primary' : 'text-zinc-400 hover:text-primary'}`}>
            <Library className={`size-6 ${activeTab === 'library' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Favoris</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 group transition-colors ${activeTab === 'profile' ? 'text-primary' : 'text-zinc-400 hover:text-primary'}`}>
            <User className={`size-6 ${activeTab === 'profile' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Profil</span>
          </button>
        </nav>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {/* Notifications Modal */}
        {showNotifications && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowNotifications(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Notifications</h3>
                <button onClick={() => setShowNotifications(false)} className="p-2 text-zinc-400 hover:text-white"><X className="size-6" /></button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-zinc-800/50 rounded-2xl border border-white/5">
                  <p className="text-sm font-bold">Nouveau Podcast !</p>
                  <p className="text-xs text-zinc-400 mt-1">"Techniques de massage canin" est maintenant disponible.</p>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-2xl border border-white/5 opacity-50">
                  <p className="text-sm font-bold">Mise à jour système</p>
                  <p className="text-xs text-zinc-400 mt-1">Votre bibliothèque a été synchronisée avec succès.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSettings(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Paramètres</h3>
                <button onClick={() => setShowSettings(false)} className="p-2 text-zinc-400 hover:text-white"><X className="size-6" /></button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <Moon className="size-5 text-zinc-400" />
                    <span className="font-medium">Mode Sombre</span>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 size-4 bg-black rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <Volume2 className="size-5 text-zinc-400" />
                    <span className="font-medium">Qualité Audio</span>
                  </div>
                  <span className="text-primary text-sm font-bold">Haute</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
