import { useRef, ChangeEvent } from "react";
import { motion } from "motion/react";
import { X, Upload, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadModalProps {
  onClose: () => void;
  onFileUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export function UploadModal({ onClose, onFileUpload }: UploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="Fermer"
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
            onChange={onFileUpload}
          />
          
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full text-black font-bold py-6 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Search className="size-5" />
            Parcourir les fichiers
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
