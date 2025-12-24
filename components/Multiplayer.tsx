
import React from 'react';
import { ScreenState } from '../types';
import { MOCK_SERVERS, IMAGES } from '../constants';

interface MultiplayerProps {
  onNavigate: (screen: ScreenState) => void;
  // Added onJoinServer to handle server connections
  onJoinServer: () => void;
}

const Multiplayer: React.FC<MultiplayerProps> = ({ onNavigate, onJoinServer }) => {
  return (
    <div className="flex h-screen w-full bg-zinc-950 text-white font-display overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-zinc-950 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5 mb-6">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-green-500 rounded flex items-center justify-center text-black">
              <span className="material-symbols-outlined">deployed_code</span>
            </div>
            <h2 className="font-black text-lg">CubeCraft</h2>
          </div>
        </div>

        <div className="px-4 flex flex-col gap-6">
          <div>
            <h3 className="px-3 text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-3">Browser</h3>
            <nav className="flex flex-col gap-1">
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20">
                <span className="material-symbols-outlined fill-1">public</span>
                <span className="text-sm font-bold">Public Servers</span>
              </button>
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined">star</span>
                <span className="text-sm font-bold">Favorites</span>
              </button>
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined">history</span>
                <span className="text-sm font-bold">History</span>
              </button>
            </nav>
          </div>

          <div>
            <h3 className="px-3 text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-3">Social</h3>
            <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-zinc-500 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">group</span>
                <span className="text-sm font-bold">Friends</span>
              </div>
              <span className="bg-green-500 text-black text-[10px] font-black px-1.5 rounded">3</span>
            </button>
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-white/5">
          <div className="rounded-xl overflow-hidden relative h-32 group cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${IMAGES.VOXEL_LANDSCAPE})` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-[10px] text-green-500 font-black uppercase mb-1">Update v1.2</p>
              <p className="text-xs font-bold leading-tight">Nether blocks now available!</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Server Browser */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-950">
        <header className="px-10 py-10 flex flex-wrap justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Multiplayer Lobby</h1>
            <p className="text-zinc-500 text-sm mt-1">Join a world or connect with friends online.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 font-bold hover:bg-zinc-800 transition-all text-sm">
              Refresh List
            </button>
            <button className="px-6 py-3 rounded-xl bg-green-500 text-zinc-950 font-black hover:bg-green-400 transition-all text-sm shadow-glow-primary">
              Create Server
            </button>
          </div>
        </header>

        <div className="px-10 mb-6 flex gap-4">
           <div className="relative flex-1 max-w-lg">
             <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">search</span>
             <input className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-5 h-12 text-sm text-white focus:ring-1 focus:ring-green-500" placeholder="Search servers..." />
           </div>
           <select className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-sm font-bold text-zinc-400">
             <option>All Modes</option>
             <option>Survival</option>
             <option>PVP</option>
           </select>
        </div>

        <div className="flex-1 flex overflow-hidden px-10 pb-10 gap-8">
          {/* Server List */}
          <div className="flex-1 flex flex-col bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-md">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-black/40 text-[10px] font-black text-zinc-600 uppercase tracking-widest border-b border-white/5">
              <div className="col-span-6">Server Name</div>
              <div className="col-span-2 text-center">Mode</div>
              <div className="col-span-2 text-center">Players</div>
              <div className="col-span-2 text-right">Ping</div>
            </div>
            
            <div className="overflow-y-auto flex-1 p-3 space-y-1 custom-scrollbar">
              {MOCK_SERVERS.map((server, idx) => (
                // Added onClick to trigger onJoinServer when a server is selected
                <div key={server.id} onClick={onJoinServer} className={`grid grid-cols-12 gap-4 px-4 py-4 items-center rounded-xl transition-all cursor-pointer border border-transparent hover:bg-zinc-800 hover:border-green-500/30 group ${idx === 1 ? 'bg-green-500/5 border-green-500/10' : ''}`}>
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-zinc-950 overflow-hidden shrink-0 border border-zinc-800">
                      <div className="w-full h-full bg-cover bg-center opacity-70 group-hover:opacity-100" style={{ backgroundImage: `url(${IMAGES.VOXEL_LANDSCAPE})` }}></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm group-hover:text-green-500 transition-colors">{server.name}</h4>
                      <p className="text-zinc-500 text-[10px] uppercase font-bold truncate">{server.description}</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black border border-zinc-700 text-zinc-400 uppercase">{server.mode}</span>
                  </div>
                  <div className="col-span-2 text-center text-sm font-mono font-bold">
                    <span className="text-green-500">{server.players}</span><span className="text-zinc-600">/{server.maxPlayers}</span>
                  </div>
                  <div className="col-span-2 flex justify-end items-center gap-2">
                    <span className="text-xs font-mono text-green-500 font-bold">{server.ping}ms</span>
                    <span className="material-symbols-outlined text-green-500 text-lg">signal_cellular_alt</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Cards */}
          <div className="w-80 flex flex-col gap-6 shrink-0">
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500">badge</span> Identity
              </h3>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-zinc-600 px-1">Player Name</label>
                <div className="relative">
                  <input className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:ring-green-500" defaultValue="BlockMaster99" />
                  <span className="material-symbols-outlined absolute right-3 top-3 text-zinc-600 text-lg cursor-pointer">edit</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 shadow-xl flex-1 flex flex-col">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500">lan</span> Direct Connect
              </h3>
              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-600 px-1">Server Address</label>
                  <input className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold placeholder:text-zinc-800" placeholder="play.cubecraft.net" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-zinc-600 px-1">Port</label>
                  <input className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-mono text-green-500" defaultValue="25565" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer group mt-2">
                  <input type="checkbox" className="size-4 rounded border-zinc-700 bg-zinc-950 text-green-500 focus:ring-0" />
                  <span className="text-xs font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">Add to favorites</span>
                </label>
              </div>
              <button 
                // Changed from onNavigate('HUD') to onJoinServer for proper loading transition
                onClick={onJoinServer}
                className="w-full mt-8 bg-green-500 text-zinc-950 font-black py-4 rounded-xl hover:bg-green-400 transition-all shadow-glow-primary uppercase tracking-widest text-xs"
              >
                Connect to Server
              </button>
            </div>
            
            <div className="bg-zinc-900/50 rounded-xl p-4 border border-dashed border-green-500/20 flex items-center gap-4">
              <div className="size-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <span className="material-symbols-outlined">public</span>
              </div>
              <div>
                <p className="text-xs font-black text-green-500 uppercase tracking-widest">Network Status</p>
                <p className="text-[10px] text-zinc-600 font-bold uppercase">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Multiplayer;
