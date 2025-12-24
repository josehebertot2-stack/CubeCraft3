
import React from 'react';
import { ScreenState } from '../types';

interface HelpProps {
  onNavigate: (screen: ScreenState) => void;
}

const Help: React.FC<HelpProps> = ({ onNavigate }) => {
  return (
    <div className="h-screen w-full bg-zinc-950 flex flex-col font-display overflow-hidden">
      <header className="px-10 py-6 border-b border-green-500/20 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="size-8 text-green-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl font-bold">grid_view</span>
          </div>
          <h2 className="text-white text-xl font-black tracking-tight uppercase">CubeCraft</h2>
        </div>
        <button 
          onClick={() => onNavigate('HOME')}
          className="flex items-center gap-2 px-5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-all text-sm font-bold"
        >
          <span className="material-symbols-outlined text-xl">close</span>
          Fechar
        </button>
      </header>

      <main className="flex-1 overflow-y-auto custom-scrollbar p-10">
        <div className="max-w-5xl mx-auto space-y-12 pb-24">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tight">Ajuda & Tutorial</h1>
            <p className="text-zinc-500 mt-2 text-lg font-medium">Guia rápido de sobrevivência, controles e construção no mundo dos cubos.</p>
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white border-l-4 border-green-500 pl-4 uppercase tracking-widest">Movimentação Básica</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Mover-se', icon: 'keyboard', desc: 'Use as teclas WASD para caminhar pelo mundo.' },
                { title: 'Câmera', icon: 'mouse', desc: 'Mova o Mouse para olhar ao redor e mirar.' },
                { title: 'Pular', icon: 'space_bar', desc: 'Pressione Barra de Espaço para saltar obstáculos.' },
              ].map(card => (
                <div key={card.title} className="p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-green-500/50 transition-all group">
                  <div className="size-14 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-zinc-950 transition-all">
                    <span className="material-symbols-outlined text-3xl font-bold">{card.icon}</span>
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">{card.title}</h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white border-l-4 border-green-500 pl-4 uppercase tracking-widest">Ações e Construção</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Quebrar', icon: 'front_hand', desc: 'Segure LMB para minerar blocos.' },
                { title: 'Colocar', icon: 'layers', desc: 'Clique RMB para posicionar blocos.' },
                { title: 'Inventário', icon: 'backpack', desc: 'Aperte E para abrir sua mochila.' },
                { title: 'Hotbar', icon: 'filter_1', desc: 'Use números 1-9 para trocar itens.' },
              ].map(card => (
                <div key={card.title} className="p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-green-500/50 transition-all group">
                  <div className="size-14 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-zinc-950 transition-all">
                    <span className="material-symbols-outlined text-3xl font-bold">{card.icon}</span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-1">{card.title}</h3>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-10 rounded-3xl bg-gradient-to-r from-zinc-900 to-green-950/20 border border-green-500/20 shadow-2xl flex flex-col md:flex-row items-center gap-10">
            <div className="size-24 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0 shadow-[0_0_40px_rgba(34,197,94,0.1)]">
              <span className="material-symbols-outlined text-5xl">emoji_objects</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-white tracking-tight">Objetivo do Jogo</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                O mundo de CubeCraft é infinito e totalmente moldável. Explore terrenos gerados aleatoriamente, colete recursos raros e construa desde simples abrigos até castelos complexos. Não há limites para sua imaginação!
              </p>
            </div>
          </section>

          <div className="flex justify-center pt-8">
            <button 
              onClick={() => onNavigate('HUD')}
              className="px-12 py-5 bg-green-500 text-zinc-950 font-black text-lg uppercase tracking-[0.2em] rounded-2xl shadow-glow-primary hover:bg-green-400 hover:scale-105 transition-all flex items-center gap-4"
            >
              <span className="material-symbols-outlined font-black">play_arrow</span>
              Voltar ao Jogo
            </button>
          </div>
        </div>
      </main>

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 -right-20 size-96 bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 -left-20 size-[500px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none"></div>
    </div>
  );
};

export default Help;
