import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Play, Pause, Heart, ArrowRight } from "lucide-react";
import { Track, VIDEOS, LEARNING_PATHS } from "@/data/mockData";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface HomeTabProps {
  podcasts: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
  onTogglePlay: (track: Track) => void;
  onUploadClick: () => void;
}

export function HomeTab({ 
  podcasts, 
  currentTrack, 
  isPlaying, 
  favorites, 
  onToggleFavorite, 
  onTogglePlay, 
  onUploadClick 
}: HomeTabProps) {
  return (
    <>
      {/* Filters */}
      <ScrollArea className="w-full whitespace-nowrap px-6 py-4">
        <div className="flex w-max space-x-3">
          <Button variant="default" className="rounded-full px-6 font-bold h-10">Tout</Button>
          <Button variant="outline" className="rounded-full px-6 font-medium h-10 bg-zinc-800 border-white/5 text-white hover:bg-zinc-700 hover:text-white">Anatomie</Button>
          <Button variant="outline" className="rounded-full px-6 font-medium h-10 bg-zinc-800 border-white/5 text-white hover:bg-zinc-700 hover:text-white">Techniques</Button>
          <Button variant="outline" className="rounded-full px-6 font-medium h-10 bg-zinc-800 border-white/5 text-white hover:bg-zinc-700 hover:text-white">Études de cas</Button>
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>

      {/* Podcasts Section */}
      <section className="mt-4">
        <div className="flex items-center justify-between px-6 mb-4">
          <h3 className="text-xl font-bold tracking-tight">Podcasts récents</h3>
          <div className="flex items-center gap-4">
            <button 
              onClick={onUploadClick}
              className="flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
            >
              <Plus className="size-4" />
              Importer
            </button>
            <button className="text-sm font-semibold text-zinc-400">Tout afficher</button>
          </div>
        </div>
        
        <ScrollArea className="w-full px-6 pb-4">
          <div className="flex w-max space-x-4">
            <AnimatePresence mode="popLayout">
              {podcasts.map((podcast) => (
                <motion.div 
                  key={podcast.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col gap-3 w-40 group cursor-pointer relative"
                >
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg bg-zinc-900 border border-white/5">
                    <img 
                      alt={podcast.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      src={podcast.image}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center" onClick={() => onTogglePlay(podcast)}>
                      {(currentTrack?.id === podcast.id && isPlaying) ? (
                        <Pause className="size-12 text-primary fill-current" />
                      ) : (
                        <Play className="size-12 text-white fill-current opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(podcast.id); }}
                      className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all ${favorites.has(podcast.id) ? 'bg-primary text-black' : 'bg-black/40 text-white opacity-0 group-hover:opacity-100'}`}
                    >
                      <Heart className={`size-4 ${favorites.has(podcast.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div onClick={() => onTogglePlay(podcast)}>
                    <p className={`font-bold text-sm truncate ${currentTrack?.id === podcast.id ? 'text-primary' : 'text-white'}`}>
                      {podcast.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">{podcast.duration} • {podcast.episode}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </section>

      {/* Videos Section */}
      <section className="mt-10">
        <div className="flex items-center justify-between px-6 mb-4">
          <h3 className="text-xl font-bold tracking-tight">Vidéos populaires</h3>
          <button className="text-sm font-semibold text-primary">Tout afficher</button>
        </div>
        <ScrollArea className="w-full px-6 pb-4">
          <div className="flex w-max space-x-4">
            {VIDEOS.map((video) => (
              <motion.div 
                key={video.id}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col gap-3 w-72 group cursor-pointer relative"
              >
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-zinc-900 border border-white/5">
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
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(video.id); }}
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
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
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
              className="relative h-80 w-full rounded-3xl overflow-hidden group shadow-2xl cursor-pointer border border-white/5"
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
  );
}
