
import React from 'react';
import { World, Server, InventoryItem } from './types';

export const IMAGES = {
  VOXEL_LANDSCAPE: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa8fqMXnUE0nzotz9jGa0W3QVCw8oW1t6iSed_RaeZCU2AJfyOXUkAcjAkZMFHFlcqV1On1wP6yGjGwk0oVyEPJouBjmQ_mgsve-yJn9RNMRIbF3F48yEbPUtJDcmaDpg_xVGljeE2BRZfnXjwTljBcGDEbyvC53YTJONnVh0npRMYmyzZCIsaVIki8CzoMLkln0in6F9hJ3plUMjj1cek5D5FtS_5lBq5jVoZX2SDOHQ4nCXnDnTReKYxtFVqLq6wTHmid4hbTJot",
  MAIN_MENU_BG: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7VBn4lBn-nFKK_oS5GZf34Qw7zPBaTXzr76NtvRCtsQwqTiQ1rd_5aE6FiD4ZIkkAA0Gh4bI3ypHGYubBHnh2vPxB6Af2Of4tfOJbDPQe-o8oD6YXFERW3cjyNVPON-2OCLygCIjfJdgSIAyBjFohw9VtCjY5kC75-TN2SPmho9k20E_k57XcjSZjsJCN2Uexvw7brqd6Eqnj7Dz8fuVRQuzCbz_7CcaNkUG2LlcHuTt8Xd0NGjw4sQtTBf4wSfx0EIWszv11d85J",
  STONE: "https://minecraft.wiki/images/Stone_JE6_BE2.png",
  DIRT: "https://minecraft.wiki/images/Dirt_JE2_BE2.png",
  GRASS_TOP: "https://minecraft.wiki/images/Grass_Block_Top_JE4.png",
  GRASS_SIDE: "https://minecraft.wiki/images/Grass_Block_Side_JE2_BE2.png",
  PLANKS: "https://minecraft.wiki/images/Oak_Planks_JE6_BE2.png",
  BRICK: "https://minecraft.wiki/images/Bricks_JE3_BE2.png",
  POPPY: "https://minecraft.wiki/images/Poppy_JE3_BE2.png",
  LOG: "https://minecraft.wiki/images/Oak_Log_Side_JE5_BE2.png",
  LEAVES: "https://minecraft.wiki/images/Oak_Leaves_JE4_BE2.png",
  WATER: "https://minecraft.wiki/images/Water_JE2_BE2.png",
  PAPER: "https://minecraft.wiki/images/Map_JE2_BE2.png", // Usando o ícone de mapa para Blueprint
  AVATAR: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-ioLlgzKZwvRkA93uQrFhzS0yhM4L60u1XJfMpiLb7yWS3IowOGEfjxpO5BjkQrcbao_9tPcSUhZU9i37yrh1kS4FcztzpqDVhg0p9D11gVEeHAvllL2cTxC1HD3yN1wAY_x5x1e9aVuNBifnF9H4QLYAytGxreIFJV05oAjT2cOYE9LD9rx3ubfUBrsC3EQLO_yMdNIdsZKNQNXSGYQunqXA7hgy_WkL-rQ5XjUm9tSmxFNZ--PR1vpedQ2Fn4Erw-nEQFfKO8V7",
};

export const MOCK_WORLDS: World[] = [
  { id: '1', name: 'Exploração Infinita', lastPlayed: 'Hoje', mode: 'Survival', seed: 'INFINITE' },
  { id: '2', name: 'Meu Castelo', lastPlayed: '12/10/2023', mode: 'Survival', seed: '8392104' },
  { id: '3', name: 'Mundo de Testes', lastPlayed: '05/11/2023', mode: 'Creative', seed: '11223344' },
];

export const MOCK_SERVERS: Server[] = [
  { id: 's1', name: 'CubeEarth Official', description: 'O maior servidor survival do Brasil!', mode: 'SURVIVAL', players: 128, maxPlayers: 500, ping: 12 },
  { id: 's2', name: 'Creative Hub', description: 'Construa livremente com seus amigos.', mode: 'CREATIVE', players: 45, maxPlayers: 100, ping: 24 },
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  { id: 'item3', name: 'Grass Block', icon: IMAGES.GRASS_SIDE, category: 'building', count: 64 },
  { id: 'item2', name: 'Dirt', icon: IMAGES.DIRT, category: 'building', count: 64 },
  { id: 'item1', name: 'Stone', icon: IMAGES.STONE, category: 'building', count: 64 },
  { id: 'item4', name: 'Oak Planks', icon: IMAGES.PLANKS, category: 'building', count: 64 },
  { id: 'item5', name: 'Brick', icon: IMAGES.BRICK, category: 'building', count: 64 },
  { id: 'item7', name: 'Oak Log', icon: IMAGES.LOG, category: 'nature', count: 64 },
  { id: 'item8', name: 'Leaves', icon: IMAGES.LEAVES, category: 'nature', count: 64 },
  { id: 'item6', name: 'Poppy', icon: IMAGES.POPPY, category: 'nature', count: 64 },
  { id: 'bp1', name: 'AI Schematic', icon: IMAGES.PAPER, category: 'blueprints', count: 1 },
];
