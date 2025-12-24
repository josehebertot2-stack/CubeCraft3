
import React, { useState, useEffect } from 'react';
import { ScreenState, World, InventoryItem, PlayerStats, GameSettings } from './types';
import { MOCK_WORLDS, INVENTORY_ITEMS } from './constants';
import MainMenu from './components/MainMenu';
import HUD from './components/HUD';
import Inventory from './components/Inventory';
import Settings from './components/Settings';
import WorldManager from './components/WorldManager';
import Multiplayer from './components/Multiplayer';
import Help from './components/Help';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('HOME');
  const [worlds, setWorlds] = useState<World[]>(MOCK_WORLDS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INVENTORY_ITEMS);
  const [activeSlot, setActiveSlot] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    health: 100,
    energy: 85,
    xp: 1240,
    level: 12,
    coordinates: { x: 124, y: 64, z: -200 }
  });

  const [settings, setSettings] = useState<GameSettings>({
    resolution: '1920 x 1080 (16:9)',
    textureQuality: 'Alta',
    fullScreen: true,
    vSync: false,
    mainVolume: 75,
    musicVolume: 40,
    sfxVolume: 90,
    showFps: true,
    language: 'English (US)'
  });

  const handleAddWorld = (newWorld: World) => {
    setWorlds([newWorld, ...worlds]);
    startLoadingWorld();
  };

  const handleEquipItem = (item: InventoryItem, slotIndex: number) => {
    // Basic equip logic: move item to the hotbar position
    const newInventory = [...inventory];
    const existingIndex = newInventory.findIndex(i => i.id === item.id);
    
    if (existingIndex !== -1) {
      const itemToMove = newInventory.splice(existingIndex, 1)[0];
      newInventory.splice(slotIndex, 0, itemToMove);
      setInventory(newInventory);
    }
  };

  const startLoadingWorld = () => {
    setCurrentScreen('LOADING_WORLD');
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentScreen('HUD'), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return <MainMenu onNavigate={setCurrentScreen} onPlay={startLoadingWorld} />;
      case 'HUD':
        return (
          <HUD 
            onNavigate={setCurrentScreen} 
            stats={playerStats} 
            activeSlot={activeSlot} 
            setActiveSlot={setActiveSlot}
            hotbarItems={inventory.slice(0, 9)}
            settings={settings}
          />
        );
      case 'INVENTORY':
        return (
          <Inventory 
            onNavigate={setCurrentScreen} 
            items={inventory} 
            activeSlot={activeSlot}
            setActiveSlot={setActiveSlot}
            onEquip={handleEquipItem}
          />
        );
      case 'SETTINGS':
        return <Settings onNavigate={setCurrentScreen} settings={settings} setSettings={setSettings} />;
      case 'WORLD_MANAGER':
        return <WorldManager onNavigate={setCurrentScreen} worlds={worlds} onCreateWorld={handleAddWorld} />;
      case 'MULTIPLAYER':
        return <Multiplayer onNavigate={setCurrentScreen} onJoinServer={startLoadingWorld} />;
      case 'HELP':
        return <Help onNavigate={setCurrentScreen} />;
      case 'LOADING_WORLD':
        return (
          <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-12">
            <div className="w-full max-w-md flex flex-col items-center gap-8 text-center">
              <div className="size-24 bg-green-500 rounded-2xl flex items-center justify-center animate-bounce shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                <span className="material-symbols-outlined text-black text-5xl font-bold">view_in_ar</span>
              </div>
              <div className="w-full space-y-4">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-green-500">
                  <span>Configurando Mundo...</span>
                  <span>{Math.floor(loadingProgress)}%</span>
                </div>
                <div className="w-full h-3 bg-zinc-900 rounded-full border border-white/5 overflow-hidden p-0.5 shadow-inner">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>
              <div className="space-y-1">
                 <p className="text-white text-sm font-bold uppercase tracking-wider">Carregando Chunks</p>
                 <p className="text-zinc-500 text-xs font-medium animate-pulse italic">"O segredo da mineração é nunca cavar diretamente para baixo!"</p>
              </div>
            </div>
          </div>
        );
      default:
        return <MainMenu onNavigate={setCurrentScreen} onPlay={startLoadingWorld} />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {renderScreen()}
    </div>
  );
};

export default App;
