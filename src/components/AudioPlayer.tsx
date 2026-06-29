'use client';
import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isUnlockedRef = useRef(false);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.preload = 'auto';
      }
    }, 5000);

    const unlockAudio = () => {
      if (isUnlockedRef.current || !audioRef.current) return;
      
      audioRef.current.play().then(() => {
        isUnlockedRef.current = true;
        if (!isPlayingRef.current && audioRef.current) {
          audioRef.current.pause();
        }
      }).catch(() => {});

      ['touchstart', 'click', 'scroll'].forEach(e => document.removeEventListener(e, unlockAudio));
    };

    ['touchstart', 'click', 'scroll'].forEach(e => document.addEventListener(e, unlockAudio, { passive: true }));

    const playAudio = () => {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(e => {
            console.log('Audio play prevented by browser policy', e);
          });
        }
      }
    };

    window.addEventListener('playMusic', playAudio);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('playMusic', playAudio);
      ['touchstart', 'click', 'scroll'].forEach(e => document.removeEventListener(e, unlockAudio));
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => console.log('Audio play prevented', e));
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/Enta_El_Ostaz.mp3" preload="none" loop />
      <button
        onClick={togglePlay}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 ${
          isPlaying ? 'bg-gold-500 text-obsidian animate-pulse' : 'bg-luxury-900 border-2 border-gold-500/50 text-gold-500 hover:bg-gold-500 hover:text-obsidian'
        }`}
        title={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      >
        <i className={`fas ${isPlaying ? 'fa-volume-up' : 'fa-music'} text-2xl`}></i>
      </button>
    </>
  );
}
