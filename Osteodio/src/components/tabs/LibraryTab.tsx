import { Heart } from "lucide-react";
import { Track } from "@/data/mockData";
import { Button } from "@/components/ui/button";

interface LibraryTabProps {
  favoriteTracks: Track[];
  onTogglePlay: (track: Track) => void;
  onToggleFavorite: (id: number) => void;
}

export function LibraryTab({ favoriteTracks, onTogglePlay, onToggleFavorite }: LibraryTabProps) {
  return (
    <div className="px-6 py-4">
      <h3 className="text-2xl font-bold text-white mb-6">Ma Bibliothèque</h3>
      
      <div className="flex gap-4 mb-8">
        <Button variant="default" className="rounded-full px-6 font-bold h-10">Favoris</Button>
        <Button variant="outline" className="rounded-full px-6 font-bold h-10 bg-zinc-800 text-white border-white/5 hover:bg-zinc-700 hover:text-white">Téléchargements</Button>
      </div>

      {favoriteTracks.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="size-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500">Vous n'avez pas encore de favoris.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {favoriteTracks.map(track => (
            <div 
              key={track.id} 
              className="flex items-center gap-4 bg-zinc-900/50 p-3 rounded-2xl border border-white/5 cursor-pointer hover:bg-zinc-800/80 transition-colors text-white" 
              onClick={() => onTogglePlay(track)}
            >
              <img src={track.image} alt="" className="size-16 rounded-xl object-cover border border-white/5" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{track.title}</p>
                <p className="text-xs text-zinc-500">{track.episode}</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(track.id); }}
                className="text-primary p-2 hover:scale-110 transition-transform"
                aria-label="Remove from favorites"
              >
                <Heart className="size-5 fill-current" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
