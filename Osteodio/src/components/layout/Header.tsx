import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  onProfileClick: () => void;
  onNotificationsClick: () => void;
  onSettingsClick: () => void;
}

export function Header({ onProfileClick, onNotificationsClick, onSettingsClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#121212]/80 backdrop-blur-md pt-[calc(1rem+env(safe-area-inset-top))]">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center bg-primary rounded-xl size-10 shadow-lg shadow-primary/20">
          <span className="font-bold text-black text-xl">O</span>
        </div>
        <h1 className="text-xl font-bold tracking-tighter text-white">Osteodio</h1>
      </div>
      <div className="flex items-center gap-2 text-white">
        <button 
          onClick={onNotificationsClick} 
          className="p-2 rounded-full hover:bg-primary/20 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-6" />
        </button>
        <button 
          onClick={onSettingsClick} 
          className="p-2 rounded-full hover:bg-primary/20 transition-colors"
          aria-label="Settings"
        >
          <Settings className="size-6" />
        </button>
      </div>
    </header>
  );
}
