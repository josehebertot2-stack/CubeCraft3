
import React, { useEffect, useState } from 'react';
import { ScreenState, PlayerStats, InventoryItem, GameSettings } from '../types';
import { IMAGES } from '../constants';
import GameEngine from './GameEngine';

interface HUDProps {
  onNavigate: (screen: ScreenState) => void;
  stats: PlayerStats;
  activeSlot: number;
  setActiveSlot: (slot: number) => void;
  hotbarItems: InventoryItem[];
  settings: GameSettings;
}

const HUD: React.FC<HUDProps> = ({ onNavigate, stats, activeSlot, setActiveSlot, hotbarItems, settings }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [coords, setCoords] = useState(stats.coordinates);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPaused(prev => !prev);
      }
      if (!isPaused) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 9) setActiveSlot(num - 1);
        if (e.key.toLowerCase() === 'e') {
          onNavigate('INVENTORY');
        }
      }
    };
    
    const onLockChange = () => {
      setIsLocked(document.pointerLockElement !== null);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerlockchange', onLockChange);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerlockchange', onLockChange);
    };
  }, [onNavigate, isPaused, setActiveSlot]);

  const requestLock = () => {
    // Garante que o lock seja solicitado ao corpo ou canvas
    document.body.requestPointerLock();
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      {/* 3D Game World */}
      <GameEngine 
        isPaused={isPaused} 
        activeItem={hotbarItems[activeSlot]} 
        onCoordinatesUpdate={setCoords}
      />

      {/* Crosshair Central */}
      {!isPaused && isLocked && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <div className="relative size-6 flex items-center justify-center">
             <div className="absolute w-4 h-[2.5px] bg-white mix-blend-difference"></div>
             <div className="absolute h-4 w-[2.5px] bg-white mix-blend-difference"></div>
          </div>
        </div>
      )}

      {/* Overlay de Início */}
      {!isPaused && !isLocked && (
        <div 
          onClick={requestLock}
          className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group"
        >
          <div className="text-center transition-transform group-hover:scale-105 duration-300">
            <div className="bg-white/10 p-8 rounded-full mb-6 border border-white/20 animate-pulse inline-block">
              <span className="material-symbols-outlined text-white text-7xl">mouse</span>
            </div>
            <h3 className="text-white text-4xl font-black uppercase tracking-[0.3em] drop-shadow-md">CLIQUE PARA JOGAR</h3>
            <p className="text-green-400 text-sm mt-4 font-black uppercase tracking-widest bg-black/50 px-6 py-2 rounded-full inline-block">WASD para mover | Espaço para pular | SHIFT para correr</p>
          </div>
        </div>
      )}

      {/* HUD Layer */}
      <div className={`absolute inset-0 z-10 flex flex-col justify-between p-6 pointer-events-none transition-all duration-500 ${isPaused ? 'blur-md opacity-50' : 'opacity-100'}`}>
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-4 pointer-events-auto">
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-xl">
               <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-500 text-lg">explore</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-tighter">Posição</span>
                    <span className="text-sm font-mono font-bold text-white">X:{coords.x} Y:{coords.y} Z:{coords.z}</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 pointer-events-auto">
            <button onClick={() => setIsPaused(true)} className="size-10 bg-black/60 hover:bg-zinc-800 backdrop-blur-md rounded-full border border-white/10 text-white flex items-center justify-center">
              <span className="material-symbols-outlined">pause</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center w-full pointer-events-auto gap-4 mb-2">
          <div className="flex gap-2 p-2 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <button 
                key={i}
                onClick={() => setActiveSlot(i)}
                className={`relative size-14 rounded-xl transition-all flex items-center justify-center border ${activeSlot === i ? 'bg-white/10 border-green-500 scale-110 -translate-y-2 z-10 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-black/40 border-white/5'}`}
              >
                <span className="absolute top-1 left-2 text-[10px] font-black text-white/30">{i + 1}</span>
                {hotbarItems[i] && <img src={hotbarItems[i].icon} className="size-10 object-contain" alt={hotbarItems[i].name} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu de Pausa */}
      {isPaused && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center pointer-events-auto">
          <div className="w-full max-w-sm flex flex-col gap-6 p-10 bg-zinc-900 rounded-3xl border border-white/10 shadow-2xl text-center">
            <h2 className="text-5xl font-black text-white italic">PAUSE</h2>
            <div className="flex flex-col gap-3">
              <button onClick={() => setIsPaused(false)} className="py-4 bg-green-500 text-zinc-950 font-black rounded-2xl hover:bg-green-400 transition-colors uppercase tracking-widest">RETOMAR</button>
              <button onClick={() => onNavigate('HOME')} className="py-4 bg-red-500/10 text-red-500 border border-red-500/20 font-black rounded-2xl hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest">SAIR DO MUNDO</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HUD;
