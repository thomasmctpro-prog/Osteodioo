import { Settings, Shield, HelpCircle, LogOut, ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProfileTabProps {
  onShowSettings: () => void;
}

export function ProfileTab({ onShowSettings }: ProfileTabProps) {
  return (
    <div className="px-6 py-4">
      <div className="flex flex-col items-center mb-10 text-white">
        <Avatar className="size-24 border-4 border-primary/20 mb-4 bg-zinc-800">
          <AvatarImage 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvchlloXo8jUGHOCT0VmzW6i80wbuGV2csiLUOPAb6XiLbgejkJCbv3Hqfmg8aLNrjPZOrR_N2VBPnYSIDoHClFrdfL6r1BjxrLStrVehPDcW9BiQGTaMLWGn8o95wViAHhg9ooCCxKDvTAKUKJ7xObmZoJ8jqc3IKAF1_1bQai0BeSOEAZgqOWn6ghU_3Ha6hTIjxM-h407fXtDE5saG6QLROjj9iFj9XUKURlCZ_8MwmQHHR9Z3ZW_93VBSvmy_jPKAFDovMn-Kz" 
            alt="Alex Sterling" 
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold">Alex Sterling</h3>
        <p className="text-zinc-500 text-sm">Ostéopathe Animalier</p>
      </div>

      <div className="space-y-2 text-white">
        <button 
          onClick={onShowSettings} 
          className="w-full flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-white/5 hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          <div className="flex items-center gap-3">
            <Settings className="size-5 text-zinc-400" />
            <span className="font-medium">Paramètres</span>
          </div>
          <ChevronLeft className="size-5 text-zinc-600 flex-shrink-0" style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button className="w-full flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-white/5 hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">
          <div className="flex items-center gap-3">
            <Shield className="size-5 text-zinc-400" />
            <span className="font-medium">Sécurité</span>
          </div>
          <ChevronLeft className="size-5 text-zinc-600 flex-shrink-0" style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button className="w-full flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-white/5 hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">
          <div className="flex items-center gap-3">
            <HelpCircle className="size-5 text-zinc-400" />
            <span className="font-medium">Aide & Support</span>
          </div>
          <ChevronLeft className="size-5 text-zinc-600 flex-shrink-0" style={{ transform: 'rotate(180deg)' }} />
        </button>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center p-4 bg-red-500/10 rounded-2xl border border-red-500/20 hover:bg-red-500/20 hover:text-red-400 text-red-500 transition-colors mt-8 h-14"
        >
          <div className="flex items-center gap-3">
            <LogOut className="size-5" />
            <span className="font-medium">Déconnexion</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
