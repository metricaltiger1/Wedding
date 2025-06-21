import { useState, useEffect, useRef } from 'react';
import { FaMusic, FaPause, FaHeart } from 'react-icons/fa';
import Confetti from './Confetti';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const heartsInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Use local music file
    audioRef.current = new Audio('/assets/audio/Stephen_Sanchez_-_Until_I_Found_You.mp3');
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (heartsInterval.current) {
        clearInterval(heartsInterval.current);
      }
    };
  }, []);


  const togglePlay = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setShowHearts(false);
        if (heartsInterval.current) {
          clearInterval(heartsInterval.current);
        }
      } else {
        audioRef.current.play();
        setShowHearts(true);
        // Spray hearts periodically while music plays
        heartsInterval.current = setInterval(() => {
          setShowHearts(true);
          setTimeout(() => setShowHearts(false), 1000);
        }, 3000);
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Auto-play when user interacts with the page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.play();
        setIsPlaying(true);
        setShowHearts(true);
        heartsInterval.current = setInterval(() => {
          setShowHearts(true);
          setTimeout(() => setShowHearts(false), 1000);
        }, 3000);
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, [hasInteracted]);

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 z-50 bg-white rounded-full p-4 shadow-lg cursor-pointer transition-all ${
          isPlaying ? 'playing animate-spin-slow' : ''
        } hover:shadow-xl hover:scale-110 group`}
        onClick={togglePlay}
      >
        {isPlaying ? (
          <FaPause className="text-xl text-gold-600" />
        ) : (
          <FaMusic className="text-xl text-gold-600" />
        )}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs">
          <FaHeart />
        </div>
      </div>

      {showHearts && <Confetti type="hearts" />}
    </>
  );
};

export default MusicPlayer;