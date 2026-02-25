import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Track } from "@/data/mockData";

interface AudioPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onEnded: () => void;
}

export function AudioPlayer({ currentTrack, isPlaying, onPlayPause, onEnded }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

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
    <>
      <audio 
        ref={audioRef}
        src={currentTrack?.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
      />
      <AnimatePresence>
        {currentTrack && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] left-4 right-4 z-40 bg-zinc-900 border border-white/10 rounded-2xl p-3 shadow-2xl flex items-center gap-4 text-white"
          >
            <div className="size-12 rounded-lg overflow-hidden shrink-0">
              <img src={currentTrack.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold truncate">{currentTrack.title}</h4>
              <p className="text-xs text-zinc-400 truncate">{currentTrack.episode}</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Previous Track"
              >
                <SkipBack className="size-5" />
              </button>
              <button 
                onClick={onPlayPause}
                className="size-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}
              </button>
              <button 
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Next Track"
              >
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
    </>
  );
}
