'use client';
import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const playAudio = () => {
      if (!audioRef.current) {
        const audio = new Audio('/assets/Enta_El_Ostaz.mp3');
        audio.loop = true;
        audioRef.current = audio;
      }
      
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => {
          console.log('Audio play prevented by browser policy', e);
        });
      }
    };

    window.addEventListener('playMusic', playAudio);

    return () => {
      window.removeEventListener('playMusic', playAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      const audio = new Audio('/assets/Enta_El_Ostaz.mp3');
      audio.loop = true;
      audioRef.current = audio;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.log('Audio play prevented', e));
    }
  };

  return (
    <button
      onClick={togglePlay}
      className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 ${
        isPlaying ? 'bg-gold-500 text-obsidian animate-pulse' : 'bg-luxury-900 border-2 border-gold-500/50 text-gold-500 hover:bg-gold-500 hover:text-obsidian'
      }`}
      title={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
    >
      <i className={`fas ${isPlaying ? 'fa-volume-up' : 'fa-music'} text-2xl`}></i>
    </button>
  );
}
