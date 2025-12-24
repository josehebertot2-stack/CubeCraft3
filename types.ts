
export type ScreenState = 'SPLASH' | 'HOME' | 'HUD' | 'INVENTORY' | 'SETTINGS' | 'WORLD_MANAGER' | 'MULTIPLAYER' | 'HELP' | 'LOADING_WORLD';

export interface World {
  id: string;
  name: string;
  lastPlayed: string;
  mode: 'Survival' | 'Creative' | 'Hardcore';
  seed: string;
  thumbnail?: string;
}

export interface Server {
  id: string;
  name: string;
  description: string;
  mode: string;
  players: number;
  maxPlayers: number;
  ping: number;
  thumbnail?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  count?: number;
  icon: string;
  category: 'building' | 'nature' | 'tools' | 'logic' | 'blueprints';
}

export interface PlayerStats {
  health: number;
  energy: number;
  xp: number;
  level: number;
  coordinates: { x: number; y: number; z: number };
}

export interface GameSettings {
  resolution: string;
  textureQuality: string;
  fullScreen: boolean;
  vSync: boolean;
  mainVolume: number;
  musicVolume: number;
  sfxVolume: number;
  showFps: boolean;
  language: string;
}
