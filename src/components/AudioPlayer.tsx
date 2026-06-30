'use client';
import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const primeAudio = () => {
      if (isPlayingRef.current) return;
      audio.play()
        .then(() => {
          if (!isPlayingRef.current) {
            audio.pause();
          }
          // Remove priming listeners after successful prime
          document.removeEventListener('touchstart', primeAudio);
          document.removeEventListener('click', primeAudio);
          document.removeEventListener('scroll', primeAudio);
        })
        .catch(() => {});
    };

    // Prime audio on any first user interaction (touch, click, scroll)
    document.addEventListener('touchstart', primeAudio, { passive: true });
    document.addEventListener('click', primeAudio, { passive: true });
    document.addEventListener('scroll', primeAudio, { passive: true });

    // Play actual music when reaching gallery
    const onPlayMusic = () => {
      if (isPlayingRef.current) return;
      audio.volume = 0.7;
      audio.play().then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
      }).catch(() => {});
    };
    
    window.addEventListener('playMusic', onPlayMusic);

    return () => {
      document.removeEventListener('touchstart', primeAudio);
      document.removeEventListener('click', primeAudio);
      document.removeEventListener('scroll', primeAudio);
      window.removeEventListener('playMusic', onPlayMusic);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
      }).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/Enta_El_Ostaz.mp3" preload="auto" loop />
      <button
        onClick={togglePlay}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 ${
          isPlaying
            ? 'bg-gold-500 text-obsidian animate-pulse'
            : 'bg-luxury-900 border-2 border-gold-500/50 text-gold-500 hover:bg-gold-500 hover:text-obsidian'
        }`}
        title={isPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
      >
        <i className={`fas ${isPlaying ? 'fa-volume-up' : 'fa-music'} text-2xl`}></i>
      </button>
    </>
  );
}
