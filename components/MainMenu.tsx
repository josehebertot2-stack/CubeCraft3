
import React from 'react';
import { ScreenState } from '../types';
import { IMAGES } from '../constants';

interface MainMenuProps {
  onNavigate: (screen: ScreenState) => void;
  onPlay: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate, onPlay }) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[40s] scale-110 animate-[pulse_20s_infinite]" 
          style={{ backgroundImage: `url(${IMAGES.MAIN_MENU_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%2313ec37" fill-opacity="0.05" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E')` }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col h-full w-full">
        <header className="flex items-center justify-between px-6 py-8 lg:px-12 w-full animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="size-10 bg-green-500 rounded-lg flex items-center justify-center text-black shadow-[0_0_20px_rgba(34,197,94,0.4)] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl font-bold">view_in_ar</span>
            </div>
            <h2 className="text-white text-2xl font-black tracking-tighter uppercase drop-shadow-md">CubeCraft</h2>
          </div>
          
          <div className="flex items-center gap-4 bg-zinc-900/60 rounded-full pl-5 pr-1 py-1.5 border border-white/5 backdrop-blur-md shadow-lg">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-gray-200 text-xs font-bold leading-tight">SteveBuilder</span>
              <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest">Online</span>
            </div>
            <button className="size-9 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 overflow-hidden hover:border-green-500 transition-colors">
              <img src={IMAGES.AVATAR} className="w-full h-full object-cover" alt="Profile" />
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-center px-6 lg:px-24 pb-10">
          <div className="w-full max-w-[480px] flex flex-col gap-8 animate-in fade-in slide-in-from-left duration-1000 delay-300">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-bold text-green-400 border border-green-500/20 backdrop-blur-sm uppercase tracking-wider">Early Access v2.5</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-[-0.03em] drop-shadow-2xl">
                CRAFT<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">YOUR</span><br/>
                WORLD
              </h1>
              <p className="text-gray-400 text-lg mt-4 font-medium max-w-sm border-l-2 border-green-500/50 pl-4 leading-relaxed">
                Explore, build and survive in an infinite universe of blocks.
              </p>
            </div>

            <nav className="flex flex-col gap-3 w-full mt-2">
              <button 
                onClick={onPlay}
                className="group relative flex w-full items-center justify-between overflow-hidden rounded-xl h-16 px-6 bg-green-500 hover:bg-green-400 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_35px_rgba(34,197,94,0.5)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                <div className="flex flex-col items-start z-10 text-zinc-950 text-left">
                  <span className="text-lg font-black uppercase tracking-wider">Resume Game</span>
                  <span className="opacity-70 text-xs font-bold tracking-wide">World: Survival Island</span>
                </div>
                <div className="size-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors z-10">
                  <span className="material-symbols-outlined text-zinc-950 text-2xl group-hover:scale-110 transition-transform">play_arrow</span>
                </div>
              </button>

              <button 
                onClick={() => onNavigate('WORLD_MANAGER')}
                className="group flex w-full items-center justify-between overflow-hidden rounded-xl h-14 px-6 bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur-md border border-white/5 hover:border-green-500/50 transition-all duration-200"
              >
                <span className="text-gray-200 group-hover:text-white text-base font-bold uppercase tracking-wide">World Manager</span>
                <span className="material-symbols-outlined text-gray-600 group-hover:text-green-500 transition-colors">public</span>
              </button>

              <button 
                onClick={() => onNavigate('MULTIPLAYER')}
                className="group flex w-full items-center justify-between overflow-hidden rounded-xl h-14 px-6 bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur-md border border-white/5 hover:border-green-500/50 transition-all duration-200"
              >
                <span className="text-gray-200 group-hover:text-white text-base font-bold uppercase tracking-wide">Multiplayer</span>
                <span className="material-symbols-outlined text-gray-600 group-hover:text-green-500 transition-colors">groups</span>
              </button>

              <button 
                onClick={() => onNavigate('SETTINGS')}
                className="group flex w-full items-center justify-between overflow-hidden rounded-xl h-14 px-6 bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur-md border border-white/5 hover:border-green-500/50 transition-all duration-200"
              >
                <span className="text-gray-200 group-hover:text-white text-base font-bold uppercase tracking-wide">Settings</span>
                <span className="material-symbols-outlined text-gray-600 group-hover:text-green-500 transition-colors">settings</span>
              </button>
            </nav>
          </div>
        </main>

        <footer className="w-full px-6 lg:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/5 backdrop-blur-md bg-zinc-950/30">
          <div className="flex items-center gap-4">
            <button className="size-10 flex items-center justify-center rounded-lg bg-zinc-900 hover:bg-zinc-800 text-gray-400 hover:text-green-500 transition-all border border-white/5 shadow-md group">
              <span className="material-symbols-outlined group-hover:scale-110">forum</span>
            </button>
            <button className="size-10 flex items-center justify-center rounded-lg bg-zinc-900 hover:bg-zinc-800 text-gray-400 hover:text-green-500 transition-all border border-white/5 shadow-md group">
              <span className="material-symbols-outlined group-hover:scale-110">public</span>
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-lg">language</span>
              <span>English (US)</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-800"></div>
            <div className="text-gray-600">© 2024 CubeCraft Project. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainMenu;
