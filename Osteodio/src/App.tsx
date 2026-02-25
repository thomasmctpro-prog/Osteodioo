import { useState, ChangeEvent, useEffect, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import { Track, INITIAL_PODCASTS } from "@/data/mockData";

// Layout & Global Components
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { AudioPlayer } from "@/components/AudioPlayer";

// Modals
import { SettingsModal } from "@/components/modals/SettingsModal";
import { NotificationsModal } from "@/components/modals/NotificationsModal";
import { UploadModal } from "@/components/modals/UploadModal";

// Tabs
import { HomeTab } from "@/components/tabs/HomeTab";
import { SearchTab } from "@/components/tabs/SearchTab";
import { LibraryTab } from "@/components/tabs/LibraryTab";
import { ProfileTab } from "@/components/tabs/ProfileTab";

export default function App() {
  const [podcasts, setPodcasts] = useState<Track[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'library' | 'profile'>('home');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      
      localStorage.setItem('osteodio_favorites', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const filteredPodcasts = useMemo(() => {
    return podcasts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [podcasts, searchQuery]);

  const favoriteTracks = useMemo(() => {
    return podcasts.filter(p => favorites.has(p.id));
  }, [podcasts, favorites]);

  // Initial Data Fetch
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("/api/podcasts");
        if (response.ok) {
          const data = await response.json();
          const mappedData = data.map((p: any) => ({
            ...p,
            audioUrl: `/api/podcasts/${p.id}/audio`
          }));
          if (mappedData.length > 0) {
            setPodcasts(mappedData);
            return;
          }
        }
      } catch (error) {
        console.error("Server fetch failed, falling back to local mode:", error);
      } finally {
        setIsLoading(false);
      }
      
      const savedPodcasts = localStorage.getItem('osteodio_podcasts');
      if (savedPodcasts) {
        setPodcasts(JSON.parse(savedPodcasts));
      } else {
        setPodcasts(INITIAL_PODCASTS);
      }
      const savedFavorites = localStorage.getItem('osteodio_favorites');
      if (savedFavorites) {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      }
    };
    fetchPodcasts();
  }, []);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
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

          try {
            const response = await fetch("/api/podcasts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });

            if (response.ok) {
              const newPodcast = await response.json();
              const track: Track = { ...newPodcast, audioUrl: `/api/podcasts/${newPodcast.id}/audio` };
              setPodcasts([track, ...podcasts]);
              setCurrentTrack(track);
              setIsPlaying(true);
              setIsUploading(false);
              setIsLoading(false);
              return;
            }
          } catch (serverError) {
            console.log("Server not available, using localStorage upload");
          }

          const newId = Date.now();
          const track: Track = {
            id: newId,
            title: payload.title,
            duration: payload.duration,
            episode: payload.episode,
            image: payload.image,
            audioUrl: base64Data 
          };
          
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

  return (
    <div className="min-h-screen bg-[#121212] font-sans pb-40">
      
      <Header 
        onProfileClick={() => setActiveTab('profile')}
        onNotificationsClick={() => setShowNotifications(true)}
        onSettingsClick={() => setShowSettings(true)}
      />

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
          <HomeTab 
            podcasts={podcasts}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onTogglePlay={togglePlay}
            onUploadClick={() => setIsUploading(true)}
          />
        )}

        {activeTab === 'search' && (
          <SearchTab 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredPodcasts={filteredPodcasts}
            onTogglePlay={togglePlay}
          />
        )}

        {activeTab === 'library' && (
          <LibraryTab 
            favoriteTracks={favoriteTracks}
            onTogglePlay={togglePlay}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab onShowSettings={() => setShowSettings(true)} />
        )}
      </main>

      <AudioPlayer 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onEnded={() => setIsPlaying(false)}
      />

      <AnimatePresence>
        {isUploading && (
          <UploadModal 
            onClose={() => setIsUploading(false)}
            onFileUpload={handleFileUpload}
          />
        )}
        {showNotifications && (
          <NotificationsModal onClose={() => setShowNotifications(false)} />
        )}
        {showSettings && (
          <SettingsModal onClose={() => setShowSettings(false)} />
        )}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
