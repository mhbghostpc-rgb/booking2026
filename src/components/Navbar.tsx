'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-luxury-900/80 backdrop-blur-md border-b border-gold-500/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onDoubleClick={() => window.location.href = '/admin'}
          title="الإدارة (اضغط مرتين)"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 flex items-center justify-center text-obsidian font-bold text-xl">
            M
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-gold-600 group-hover:animate-shine select-none">
            مستر محب موسى
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-300">
          <Link href="/" className={`hover:text-gold-400 transition-colors ${pathname === '/' ? 'text-gold-400' : ''}`}>الرئيسية</Link>
          <Link href="/courses" className={`hover:text-gold-400 transition-colors ${pathname === '/courses' ? 'text-gold-400' : ''}`}>الكورسات</Link>
          <Link href="/mr-moheb-mousa" className={`hover:text-gold-400 transition-colors ${pathname === '/mr-moheb-mousa' ? 'text-gold-400' : ''}`}>عن الأكاديمية</Link>
          <Link href="/faq" className={`hover:text-gold-400 transition-colors ${pathname === '/faq' ? 'text-gold-400' : ''}`}>الأسئلة الشائعة</Link>
        </div>

        <Link href="/booking" className="btn-luxury px-6 py-2 text-sm">
          احجز مكانك الآن
        </Link>
      </div>
    </nav>
  );
}
