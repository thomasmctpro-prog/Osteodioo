import { motion } from "motion/react";
import { Search } from "lucide-react";
import { Track } from "@/data/mockData";
import { Input } from "@/components/ui/input";

interface SearchTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPodcasts: Track[];
  onTogglePlay: (track: Track) => void;
}

export function SearchTab({ searchQuery, setSearchQuery, filteredPodcasts, onTogglePlay }: SearchTabProps) {
  return (
    <div className="px-6 py-4">
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 size-5" />
        <Input 
          type="text" 
          placeholder="Rechercher un podcast, une vidéo..." 
          className="w-full h-14 bg-zinc-900 border-white/10 rounded-2xl pl-12 pr-4 text-white focus-visible:ring-primary transition-colors text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {filteredPodcasts.map(podcast => (
          <motion.div 
            key={podcast.id}
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-900/50 rounded-2xl p-3 border border-white/5 cursor-pointer"
            onClick={() => onTogglePlay(podcast)}
          >
            <div className="aspect-square rounded-xl overflow-hidden mb-3 border border-white/5">
              <img src={podcast.image} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="font-bold text-sm truncate text-white">{podcast.title}</p>
            <p className="text-xs text-zinc-500">{podcast.duration}</p>
          </motion.div>
        ))}
        {filteredPodcasts.length === 0 && (
          <div className="col-span-2 text-center py-10 text-zinc-500">
            Aucun résultat ne correspond à votre recherche.
          </div>
        )}
      </div>
    </div>
  );
}
