
import React, { useState } from 'react';
import { ScreenState, InventoryItem } from '../types';
import { IMAGES } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface InventoryProps {
  onNavigate: (screen: ScreenState) => void;
  items: InventoryItem[];
  activeSlot: number;
  setActiveSlot: (slot: number) => void;
  onEquip: (item: InventoryItem, slotIndex: number) => void;
}

const Inventory: React.FC<InventoryProps> = ({ onNavigate, items, activeSlot, setActiveSlot, onEquip }) => {
  const [activeCategory, setActiveCategory] = useState<'building' | 'nature' | 'tools' | 'logic' | 'blueprints'>('building');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleEquipClick = () => {
    if (selectedItem) {
      onEquip(selectedItem, activeSlot);
    }
  };

  const handleGenerateAI = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A 2D pixel art minecraft block texture of: ${prompt}. Stylized, high detail, top-down view.` }]
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          if (selectedItem) {
            selectedItem.icon = imageUrl;
            selectedItem.name = prompt;
            setSelectedItem({ ...selectedItem }); // Trigger re-render
          }
          break;
        }
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("Failed to generate texture. Check your API key or connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
      {/* Background Simulation */}
      <div className="absolute inset-0 z-0 scale-110 blur-md">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: `url(${IMAGES.VOXEL_LANDSCAPE})` }}
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl h-[90vh] bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-6">
            <h1 className="text-white text-3xl font-black tracking-tighter italic">INVENTORY</h1>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest border border-white/5">
                <span className="material-symbols-outlined text-sm">sort</span> Sort
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">search</span>
              <input 
                className="bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:ring-1 focus:ring-green-500 placeholder:text-zinc-600 w-72 outline-none"
                placeholder="Filter blocks & items..."
              />
            </div>
            <button 
              onClick={() => onNavigate('HUD')}
              className="size-12 flex items-center justify-center bg-zinc-800 hover:bg-red-500 text-zinc-400 hover:text-white transition-all rounded-xl border border-white/10"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Categories Sidebar */}
          <aside className="w-72 border-r border-white/5 bg-black/30 flex flex-col">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-1">Tabs</h3>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: 'building', icon: 'foundation' },
                  { id: 'nature', icon: 'grass' },
                  { id: 'tools', icon: 'construction' },
                  { id: 'logic', icon: 'memory' },
                  { id: 'blueprints', icon: 'auto_fix' }
                ].map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`aspect-square rounded-xl flex items-center justify-center transition-all ${activeCategory === cat.id ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-white'}`}
                  >
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4">
              <h4 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest px-1">Selected Item</h4>
              {selectedItem ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
                  <div className="size-24 mx-auto bg-cover bg-center rounded-xl shadow-lg border border-white/10" style={{ backgroundImage: `url(${selectedItem.icon})` }}></div>
                  <div className="text-center">
                    <h5 className="text-white font-black text-lg">{selectedItem.name}</h5>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Type: {selectedItem.category}</p>
                  </div>
                  
                  {selectedItem.category === 'blueprints' && (
                    <div className="space-y-3 pt-2 border-t border-white/5 mt-4">
                      <p className="text-[10px] font-black text-green-500 uppercase text-center animate-pulse">AI Power Detected</p>
                      <input 
                        type="text" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="What should this be?"
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:ring-1 focus:ring-green-500"
                      />
                      <button 
                        onClick={handleGenerateAI}
                        disabled={isGenerating}
                        className={`w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:brightness-125 transition-all ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isGenerating ? 'Synthesizing...' : 'Generate with AI'}
                      </button>
                    </div>
                  )}

                  <div className="pt-2">
                    <button 
                      onClick={handleEquipClick}
                      className="w-full py-2.5 bg-green-500 text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-green-400 transition-all shadow-[0_5px_15px_rgba(34,197,94,0.3)]"
                    >
                      Equip to Slot {activeSlot + 1}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="aspect-square bg-white/5 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-zinc-600 italic text-[10px] text-center p-6 uppercase font-bold tracking-widest">
                  Select an item to see details
                </div>
              )}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-black/10">
            {/* Grid display logic */}
            <section className="bg-zinc-950/40 p-8 rounded-3xl border border-white/5 shadow-inner">
              <h3 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                 <span className="material-symbols-outlined text-sm">inventory_2</span>
                 {activeCategory.toUpperCase()} Storage
              </h3>
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-4">
                {items.filter(i => i.category === activeCategory).map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className={`relative aspect-square rounded-2xl p-1 group transition-all cursor-pointer border ${selectedItem?.id === item.id ? 'bg-green-500/10 border-green-500 ring-4 ring-green-500/20' : 'bg-zinc-950 border-white/5 hover:border-white/20'}`}
                  >
                    <div className="w-full h-full bg-cover bg-center rounded-xl shadow-inner group-hover:scale-95 transition-transform" style={{ backgroundImage: `url(${item.icon})` }}></div>
                    <span className="absolute bottom-2 right-2.5 text-white text-[10px] font-black drop-shadow-lg">{item.count}</span>
                  </div>
                ))}
                {/* Visual Empty Slots - Styled to look like actual slots, not paper */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-zinc-950/50 border border-white/5 rounded-2xl p-1 hover:border-white/10 transition-colors shadow-inner"></div>
                ))}
              </div>
            </section>
          </main>
        </div>

        {/* Hotbar Footer */}
        <footer className="bg-black/80 p-8 border-t border-white/10 backdrop-blur-3xl">
          <div className="flex items-center justify-between mb-6 px-10">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">bolt</span> Active Hotbar
            </span>
          </div>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <button 
                key={i} 
                onClick={() => setActiveSlot(i)}
                className={`relative size-16 rounded-2xl border transition-all group flex items-center justify-center ${activeSlot === i ? 'bg-green-500/10 border-green-500 ring-4 ring-green-500/20 scale-110 -translate-y-2 shadow-[0_0_25px_rgba(34,197,94,0.4)]' : 'bg-zinc-950 border-white/5 hover:border-white/20'}`}
              >
                 <span className={`absolute top-1 left-2 text-[10px] font-black ${activeSlot === i ? 'text-green-500' : 'text-zinc-600'}`}>{i + 1}</span>
                 {items.find((_, idx) => idx === i) && (
                    <div className="size-10 bg-cover bg-center rounded-lg shadow-md group-hover:scale-110 transition-transform" style={{ backgroundImage: `url(${items[i].icon})` }}></div>
                 )}
                 <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors rounded-2xl"></div>
              </button>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Inventory;
