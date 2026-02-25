import { motion } from "motion/react";
import { X } from "lucide-react";

interface NotificationsModalProps {
  onClose: () => void;
}

export function NotificationsModal({ onClose }: NotificationsModalProps) {
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
        initial={{ x: 300, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        exit={{ x: 300, opacity: 0 }} 
        className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Notifications</h3>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white" aria-label="Fermer">
            <X className="size-6" />
          </button>
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
  );
}
