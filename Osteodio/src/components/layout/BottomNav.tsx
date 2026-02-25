import { Home, Search, Library, User } from "lucide-react";

interface BottomNavProps {
  activeTab: 'home' | 'search' | 'library' | 'profile';
  setActiveTab: (tab: 'home' | 'search' | 'library' | 'profile') => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 z-50 pointer-events-none pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
      <nav className="mx-auto max-w-sm pointer-events-auto bg-zinc-900/90 backdrop-blur-xl border border-white/5 rounded-full flex items-center justify-around px-4 py-3 shadow-2xl">
        <button 
          onClick={() => setActiveTab('home')} 
          className={`flex flex-col items-center gap-1 group transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-zinc-400 hover:text-primary'}`}
          aria-label="Accueil"
        >
          <Home className={`size-6 ${activeTab === 'home' ? 'fill-current' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Accueil</span>
        </button>
        <button 
          onClick={() => setActiveTab('search')} 
          className={`flex flex-col items-center gap-1 group transition-colors ${activeTab === 'search' ? 'text-primary' : 'text-zinc-400 hover:text-primary'}`}
          aria-label="Recherche"
        >
          <Search className="size-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Rechercher</span>
        </button>
        <button 
          onClick={() => setActiveTab('library')} 
          className={`flex flex-col items-center gap-1 group transition-colors ${activeTab === 'library' ? 'text-primary' : 'text-zinc-400 hover:text-primary'}`}
          aria-label="Bibliothèque"
        >
          <Library className={`size-6 ${activeTab === 'library' ? 'fill-current' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Favoris</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')} 
          className={`flex flex-col items-center gap-1 group transition-colors ${activeTab === 'profile' ? 'text-primary' : 'text-zinc-400 hover:text-primary'}`}
          aria-label="Profil"
        >
          <User className={`size-6 ${activeTab === 'profile' ? 'fill-current' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Profil</span>
        </button>
      </nav>
    </div>
  );
}
