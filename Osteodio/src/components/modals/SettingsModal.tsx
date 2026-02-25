import { motion } from "motion/react";
import { X, Moon, Volume2 } from "lucide-react";

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-white">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose} 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }} 
        className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Paramètres</h3>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white" aria-label="Fermer">
            <X className="size-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-white/5 cursor-pointer hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <Moon className="size-5 text-zinc-400" />
              <span className="font-medium">Mode Sombre</span>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative">
              <div className="absolute right-1 top-1 size-4 bg-black rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-white/5 cursor-pointer hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <Volume2 className="size-5 text-zinc-400" />
              <span className="font-medium">Qualité Audio</span>
            </div>
            <span className="text-primary text-sm font-bold">Haute</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
