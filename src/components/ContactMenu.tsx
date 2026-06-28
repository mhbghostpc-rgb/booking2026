'use client';
import { useState, useRef, useEffect } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaPhoneVolume, FaHeadset } from 'react-icons/fa';

export default function ContactMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const phone1 = process.env.NEXT_PUBLIC_CONTACT_PHONE || "01200621226";
  const phone2 = "01145540015";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" ref={menuRef}>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gold-500/40 rounded-full animate-ping" style={{ animationDuration: '2s', zIndex: -1 }}></div>
      
      {isOpen && (
        <div className="bg-luxury-900 border border-gold-500/50 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] overflow-hidden w-64 mb-4 transition-all duration-300 origin-bottom-right flex flex-col">
          <div className="bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 text-obsidian font-bold text-center py-3 flex justify-center items-center gap-2">
            <FaHeadset /> تواصل معنا
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 hover:border-gold-500/30 transition-colors">
              <div className="text-gold-300 font-bold text-lg text-center mb-3 tracking-widest" dir="ltr">{phone1}</div>
              <div className="flex gap-2 justify-center">
                <a href={`https://wa.me/20${phone1.substring(1)}`} target="_blank" rel="noreferrer" className="flex-1 bg-green-600/20 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/50 py-2 rounded-lg text-center transition-all flex items-center justify-center gap-1 text-sm font-bold shadow-sm">
                  <FaWhatsapp className="text-lg" /> واتس
                </a>
                <a href={`tel:${phone1}`} className="flex-1 bg-gold-600/20 hover:bg-gold-500 text-gold-400 hover:text-obsidian border border-gold-500/50 py-2 rounded-lg text-center transition-all flex items-center justify-center gap-1 text-sm font-bold shadow-sm">
                  <FaPhoneAlt /> اتصال
                </a>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 hover:border-gold-500/30 transition-colors">
              <div className="text-gold-300 font-bold text-lg text-center mb-3 tracking-widest" dir="ltr">{phone2}</div>
              <div className="flex gap-2 justify-center">
                <a href={`https://wa.me/20${phone2.substring(1)}`} target="_blank" rel="noreferrer" className="flex-1 bg-green-600/20 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/50 py-2 rounded-lg text-center transition-all flex items-center justify-center gap-1 text-sm font-bold shadow-sm">
                  <FaWhatsapp className="text-lg" /> واتس
                </a>
                <a href={`tel:${phone2}`} className="flex-1 bg-gold-600/20 hover:bg-gold-500 text-gold-400 hover:text-obsidian border border-gold-500/50 py-2 rounded-lg text-center transition-all flex items-center justify-center gap-1 text-sm font-bold shadow-sm">
                  <FaPhoneAlt /> اتصال
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <button onClick={() => setIsOpen(!isOpen)} aria-label="تواصل معنا" className="w-16 h-16 bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-600 text-obsidian rounded-full shadow-[0_5px_15px_rgba(212,175,55,0.5)] border-2 border-white/20 flex items-center justify-center text-3xl hover:scale-110 transition-transform hover:shadow-[0_8px_30px_rgba(212,175,55,0.8)] relative z-10">
        <FaPhoneVolume className="animate-pulse-slow" />
      </button>
    </div>
  );
}
