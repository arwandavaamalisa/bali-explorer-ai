
import React from 'react';
import { BALI_RECOMMENDATIONS } from '../constants';
import { MapPin, Compass } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-slate-200 h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-serif font-bold tracking-tight">BaliExplorer</h1>
        </div>

        <section className="mb-8">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Must-Visit Spots</h2>
          <div className="space-y-4">
            {BALI_RECOMMENDATIONS.map((spot, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative h-24 w-full rounded-xl overflow-hidden mb-2">
                  <img 
                    src={spot.image} 
                    alt={spot.title} 
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-emerald-700">
                    {spot.category}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                  {spot.title}
                </h3>
                <p className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3 h-3" />
                  {spot.location}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <h3 className="text-emerald-800 font-bold text-sm mb-2">Local Tip!</h3>
            <p className="text-xs text-emerald-700 leading-relaxed">
              When visiting temples, remember to wear a sarong and sash. Most temples provide them for a small donation at the entrance.
            </p>
          </div>
        </section>
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 text-center">
          © 2024 Bali Explorer AI. <br/> Island expertise at your fingertips.
        </p>
      </div>
    </aside>
  );
};
