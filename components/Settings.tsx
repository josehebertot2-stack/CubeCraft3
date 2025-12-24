
import React, { useState } from 'react';
import { ScreenState, GameSettings } from '../types';

interface SettingsProps {
  onNavigate: (screen: ScreenState) => void;
  settings: GameSettings;
  setSettings: (settings: GameSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate, settings, setSettings }) => {
  const [activeTab, setActiveTab] = useState('Geral');
  const [localSettings, setLocalSettings] = useState<GameSettings>(settings);

  const tabs = ['Geral', 'Gráficos', 'Áudio', 'Controles', 'Interface'];

  const handleSave = () => {
    setSettings(localSettings);
    onNavigate('HOME');
  };

  const updateField = (field: keyof GameSettings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-white font-display overflow-hidden animate-in fade-in duration-500">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 bg-zinc-900/50 flex flex-col h-full z-20">
        <div className="p-8 border-b border-white/5 flex items-center gap-4">
          <div className="size-10 rounded-xl bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center justify-center text-zinc-950">
            <span className="material-symbols-outlined font-bold">settings</span>
          </div>
          <div>
            <h1 className="text-lg font-black leading-none tracking-tight italic">CONFIGS</h1>
            <p className="text-green-500 text-[10px] font-bold mt-1 uppercase tracking-wider">v2.5.0 Alpha</p>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1.5">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${activeTab === tab ? 'bg-green-500 text-zinc-950 font-black' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}`}
            >
              <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
                {tab === 'Geral' ? 'tune' : tab === 'Gráficos' ? 'monitor' : tab === 'Áudio' ? 'volume_up' : tab === 'Controles' ? 'keyboard' : 'layers'}
              </span>
              <span className="text-sm font-bold uppercase tracking-wider">{tab}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="size-10 rounded-full bg-zinc-800 border-2 border-green-500/50 overflow-hidden">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-ioLlgzKZwvRkA93uQrFhzS0yhM4L60u1XJfMpiLb7yWS3IowOGEfjxpO5BjkQrcbao_9tPcSUhZU9i37yrh1kS4FcztzpqDVhg0p9D11gVEeHAvllL2cTxC1HD3yN1wAY_x5x1e9aVuNBifnF9H4QLYAytGxreIFJV05oAjT2cOYE9LD9rx3ubfUBrsC3EQLO_yMdNIdsZKNQNXSGYQunqXA7hgy_WkL-rQ5XjUm9tSmxFNZ--PR1vpedQ2Fn4Erw-nEQFfKO8V7" className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-tight">SteveBuilder</p>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Sync Ativo</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-zinc-950 to-zinc-900 z-10">
        <header className="px-10 py-10 border-b border-white/5 backdrop-blur-md flex justify-between items-end">
          <div>
            <h2 className="text-5xl font-black tracking-tight uppercase italic">{activeTab}</h2>
            <p className="text-zinc-500 text-sm mt-1 font-medium">Personalize sua experiência de jogo.</p>
          </div>
          <button 
            onClick={() => setLocalSettings(settings)}
            className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400"
          >
            Resetar Padrão
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-3xl flex flex-col gap-12 pb-32">
            
            {activeTab === 'Gráficos' && (
              <section className="flex flex-col gap-10 animate-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] px-1">Resolução</label>
                    <select 
                      value={localSettings.resolution}
                      onChange={(e) => updateField('resolution', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-sm focus:ring-1 focus:ring-green-500 outline-none hover:border-zinc-700 transition-all"
                    >
                      <option>1920 x 1080 (16:9)</option>
                      <option>2560 x 1440 (16:9)</option>
                      <option>3840 x 2160 (16:9)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] px-1">Qualidade das Texturas</label>
                    <select 
                      value={localSettings.textureQuality}
                      onChange={(e) => updateField('textureQuality', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-sm focus:ring-1 focus:ring-green-500 outline-none hover:border-zinc-700 transition-all"
                    >
                      <option>Baixa</option>
                      <option>Média</option>
                      <option>Alta</option>
                      <option>Ultra</option>
                    </select>
                  </div>
                </div>

                <div className="bg-zinc-900/30 rounded-3xl p-8 border border-white/5 flex flex-col gap-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-lg uppercase tracking-tight">Tela Cheia</p>
                      <p className="text-xs text-zinc-500 font-medium">Ocupar toda a tela do monitor para imersão total.</p>
                    </div>
                    <button 
                      onClick={() => updateField('fullScreen', !localSettings.fullScreen)}
                      className={`w-14 h-8 rounded-full p-1 transition-all flex items-center ${localSettings.fullScreen ? 'bg-green-500 justify-end' : 'bg-zinc-800 justify-start'}`}
                    >
                      <div className="size-6 bg-zinc-950 rounded-full shadow-md"></div>
                    </button>
                  </div>
                  <div className="h-px bg-white/5"></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-lg uppercase tracking-tight">V-Sync</p>
                      <p className="text-xs text-zinc-500 font-medium">Sincronizar quadros para evitar cortes visuais (Screen Tearing).</p>
                    </div>
                    <button 
                      onClick={() => updateField('vSync', !localSettings.vSync)}
                      className={`w-14 h-8 rounded-full p-1 transition-all flex items-center ${localSettings.vSync ? 'bg-green-500 justify-end' : 'bg-zinc-800 justify-start'}`}
                    >
                      <div className="size-6 bg-zinc-950 rounded-full shadow-md"></div>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'Áudio' && (
              <section className="flex flex-col gap-10 animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-zinc-900/30 rounded-3xl p-10 border border-white/5 flex flex-col gap-12 shadow-xl">
                  {[
                    { label: 'Volume Principal', field: 'mainVolume' },
                    { label: 'Música', field: 'musicVolume' },
                    { label: 'Efeitos Sonoros', field: 'sfxVolume' }
                  ].map((item) => (
                    <div key={item.field} className="flex flex-col gap-5">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-sm uppercase tracking-widest">{item.label}</span>
                        <span className="text-green-500 font-mono text-sm font-black">{(localSettings as any)[item.field]}%</span>
                      </div>
                      <div className="relative group">
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          value={(localSettings as any)[item.field]}
                          onChange={(e) => updateField(item.field as any, parseInt(e.target.value))}
                          className="w-full h-1.5 bg-zinc-950 rounded-full appearance-none cursor-pointer accent-green-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'Interface' && (
              <section className="flex flex-col gap-10 animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-zinc-900/30 rounded-3xl p-8 border border-white/5 flex flex-col gap-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-lg uppercase tracking-tight">Exibir FPS</p>
                      <p className="text-xs text-zinc-500 font-medium">Mostrar contador de quadros por segundo no HUD.</p>
                    </div>
                    <button 
                      onClick={() => updateField('showFps', !localSettings.showFps)}
                      className={`w-14 h-8 rounded-full p-1 transition-all flex items-center ${localSettings.showFps ? 'bg-green-500 justify-end' : 'bg-zinc-800 justify-start'}`}
                    >
                      <div className="size-6 bg-zinc-950 rounded-full shadow-md"></div>
                    </button>
                  </div>
                  <div className="h-px bg-white/5"></div>
                  <div className="flex flex-col gap-3">
                    <label className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] px-1">Idioma da Interface</label>
                    <select 
                      value={localSettings.language}
                      onChange={(e) => updateField('language', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-sm focus:ring-1 focus:ring-green-500 outline-none"
                    >
                      <option>English (US)</option>
                      <option>Português (Brasil)</option>
                      <option>Español</option>
                      <option>Deutsch</option>
                    </select>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'Geral' && (
              <div className="p-10 bg-zinc-900/20 border border-dashed border-white/10 rounded-3xl text-center flex flex-col items-center gap-4">
                 <span className="material-symbols-outlined text-zinc-700 text-6xl">account_circle</span>
                 <p className="text-zinc-500 text-sm font-medium">As configurações gerais de conta e sincronização em nuvem são gerenciadas pelo CubeCloud™.</p>
                 <button className="px-6 py-2 bg-zinc-800 text-xs font-black uppercase tracking-widest rounded-xl border border-white/5 hover:bg-zinc-700 transition-all">Vincular Conta</button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="w-full p-6 lg:px-12 backdrop-blur-3xl bg-zinc-950/95 border-t border-white/10 flex justify-end gap-5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <button 
            onClick={() => onNavigate('HOME')}
            className="px-8 py-4 rounded-2xl border border-white/5 text-zinc-400 font-bold hover:bg-white/5 transition-all text-sm uppercase tracking-widest"
          >
            CANCELAR
          </button>
          <button 
            onClick={handleSave}
            className="px-12 py-4 rounded-2xl bg-green-500 text-zinc-950 font-black tracking-[0.1em] hover:bg-green-400 transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] text-sm uppercase"
          >
            SALVAR CONFIGURAÇÕES
          </button>
        </footer>
      </main>

      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#13ec37 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
    </div>
  );
};

export default Settings;
