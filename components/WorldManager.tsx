
import React, { useState } from 'react';
import { ScreenState, World } from '../types';
import { IMAGES } from '../constants';

interface WorldManagerProps {
  onNavigate: (screen: ScreenState) => void;
  worlds: World[];
  onCreateWorld: (world: World) => void;
}

const WorldManager: React.FC<WorldManagerProps> = ({ onNavigate, worlds, onCreateWorld }) => {
  const [tab, setTab] = useState<'local' | 'servers'>('local');
  const [newWorldName, setNewWorldName] = useState('');
  const [newWorldMode, setNewWorldMode] = useState<'Survival' | 'Creative'>('Survival');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorldName.trim()) return;
    
    const world: World = {
      id: Math.random().toString(36).substr(2, 9),
      name: newWorldName,
      lastPlayed: new Date().toLocaleDateString(),
      mode: newWorldMode as any,
      seed: Math.floor(Math.random() * 1000000).toString(),
    };
    
    onCreateWorld(world);
  };

  return (
    <div className="relative w-full h-screen bg-zinc-950 flex flex-col font-display">
      <header className="flex items-center justify-between px-8 py-4 border-b border-green-500/20 bg-zinc-900/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="size-9 flex items-center justify-center text-green-500">
            <span className="material-symbols-outlined text-3xl font-bold">deployed_code</span>
          </div>
          <h2 className="text-white text-xl font-black tracking-tight">CubeCraft</h2>
        </div>
        <button 
          onClick={() => onNavigate('HOME')}
          className="flex items-center gap-2 px-6 py-2 bg-green-500 rounded-xl text-zinc-950 font-black text-sm hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
          Main Menu
        </button>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left: Saved Worlds */}
        <section className="flex-1 flex flex-col border-r border-green-500/10 bg-black/20 backdrop-blur-sm z-10">
          <div className="p-8 pb-4">
            <h1 className="text-5xl font-black text-white tracking-tight">Select World</h1>
            <p className="text-zinc-500 mt-2 font-medium">Jump back into your saved adventures.</p>
          </div>

          <div className="px-8 border-b border-green-500/10">
            <div className="flex gap-10">
              <button 
                onClick={() => setTab('local')}
                className={`py-4 border-b-2 font-black text-sm uppercase tracking-widest transition-all ${tab === 'local' ? 'border-green-500 text-green-500' : 'border-transparent text-zinc-600 hover:text-zinc-400'}`}
              >
                Local Worlds
              </button>
              <button 
                onClick={() => setTab('servers')}
                className={`py-4 border-b-2 font-black text-sm uppercase tracking-widest transition-all ${tab === 'servers' ? 'border-green-500 text-green-500' : 'border-transparent text-zinc-600 hover:text-zinc-400'}`}
              >
                Cloud Sync
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar">
            {worlds.map(world => (
              <div key={world.id} className="group flex items-center gap-6 p-5 rounded-2xl bg-zinc-900/50 border border-green-500/10 hover:border-green-500/50 transition-all cursor-pointer shadow-lg hover:bg-zinc-800">
                <div className="size-24 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden shrink-0 relative shadow-inner">
                  <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `url(${IMAGES.VOXEL_LANDSCAPE})` }}></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold group-hover:text-green-500 transition-colors">{world.name}</h3>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${world.mode === 'Creative' ? 'border-blue-500 text-blue-500 bg-blue-500/10' : world.mode === 'Hardcore' ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-yellow-500 text-yellow-500 bg-yellow-500/10'}`}>
                      {world.mode.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">schedule</span> {world.lastPlayed}</span>
                    <span className="font-mono opacity-60 uppercase">Seed: {world.seed}</span>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => onNavigate('LOADING_WORLD')} className="size-10 rounded-xl bg-green-500 flex items-center justify-center text-zinc-950 hover:bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                    <span className="material-symbols-outlined">play_arrow</span>
                  </button>
                  <button className="size-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Create New World Form */}
        <section className="w-full max-w-xl bg-zinc-900/30 backdrop-blur-xl p-10 flex flex-col gap-8 custom-scrollbar overflow-y-auto z-10">
          <div>
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-green-500 text-4xl">add_circle</span>
              Create New World
            </h2>
            <p className="text-zinc-500 mt-2">Configure your new world settings below.</p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] px-1">World Name</label>
              <input 
                value={newWorldName}
                onChange={(e) => setNewWorldName(e.target.value)}
                className="w-full bg-zinc-950 border border-green-500/10 rounded-xl px-5 h-14 text-white focus:ring-1 focus:ring-green-500 placeholder:text-zinc-700 outline-none" 
                placeholder="e.g. My Awesome Kingdom" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] px-1 flex justify-between">
                World Seed
                <span className="text-green-500/50 normal-case italic font-medium">Optional</span>
              </label>
              <div className="relative">
                <input className="w-full bg-zinc-950 border border-green-500/10 rounded-xl px-5 h-14 text-white focus:ring-1 focus:ring-green-500 placeholder:text-zinc-700 outline-none" placeholder="Enter custom seed" />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-green-500 transition-colors">
                  <span className="material-symbols-outlined">shuffle</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] px-1">Game Mode</label>
              <div className="grid grid-cols-2 gap-4">
                {['Survival', 'Creative'].map((mode) => (
                  <button 
                    key={mode}
                    type="button"
                    onClick={() => setNewWorldMode(mode as any)}
                    className={`relative group cursor-pointer p-5 rounded-2xl bg-zinc-950 border transition-all text-left ${newWorldMode === mode ? 'border-green-500 bg-green-500/5' : 'border-zinc-800'}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`material-symbols-outlined ${mode === 'Survival' ? 'text-yellow-500' : 'text-blue-500'}`}>
                        {mode === 'Survival' ? 'favorite' : 'construction'}
                      </span>
                      <span className="font-black text-white">{mode}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-relaxed font-bold">
                      {mode === 'Survival' ? 'Search for resources, craft, gain levels.' : 'Unlimited resources, free flying.'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end px-1">
                <label className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Difficulty</label>
                <span className="text-green-500 text-xs font-black uppercase">Normal</span>
              </div>
              <div className="bg-zinc-950 p-1 rounded-xl border border-zinc-800 flex gap-1 shadow-inner">
                {['Peaceful', 'Easy', 'Normal', 'Hard'].map(d => (
                  <button key={d} type="button" className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase transition-all ${d === 'Normal' ? 'bg-green-500 text-zinc-950 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'text-zinc-600 hover:text-zinc-300'}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 flex gap-4">
              <button 
                type="submit"
                className="flex-1 h-16 bg-green-500 hover:bg-green-400 text-zinc-950 font-black text-base uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all flex items-center justify-center gap-2 group"
              >
                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">public</span>
                Generate World
              </button>
              <button 
                type="button"
                onClick={() => onNavigate('HOME')}
                className="h-16 px-8 border border-zinc-800 text-zinc-500 font-bold uppercase text-xs rounded-xl hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>

      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#13ec37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    </div>
  );
};

export default WorldManager;
