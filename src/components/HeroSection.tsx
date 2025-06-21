import { useEffect, useState, useRef } from 'react';
import { FaChevronDown, FaHeart, FaEnvelope, FaEnvelopeOpen, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import MusicPlayer from './MusicPlayer';
import { GiRose } from 'react-icons/gi';

const HeroSection = () => {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showFormalInvite, setShowFormalInvite] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Prevent scrolling when invitation is open
  useEffect(() => {
    if (showFormalInvite) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showFormalInvite]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const weddingDate = new Date('August 9, 2025 09:00:00').getTime();
      const now = new Date().getTime();
      const distance = weddingDate - now;

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'));
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0'));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setShowFormalInvite(true);
    }, 800);
  };

  const handleCloseInvite = () => {
    setShowFormalInvite(false);
    setTimeout(() => {
      setIsEnvelopeOpen(false);
    }, 300);
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-900/95 to-rose-950/95 overflow-hidden px-4 py-12"
      ref={ref}
      style={{
        backgroundImage: 'url("/images/subtle-linen-texture.jpg")',
        backgroundBlendMode: 'overlay'
      }}

      
    >
      {/* Romantic floral background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/soft-circle-pattern.png')] opacity-10 mix-blend-soft-light"></div>
        
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20 rotate-12">
        <GiRose className="text-rose-300 text-6xl" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 -rotate-12">
        <GiRose className="text-lavender-300 text-8xl" />
      </div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10"></div>



        {/* Floating rose petals */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl text-rose-300/40"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
              opacity: 0
            }}
            animate={{
              y: [`${Math.random() * 100}%`, `${Math.random() * 100 + 100}%`],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: Math.random() * 360,
              opacity: [0, 0.6, 0],
              transition: {
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatDelay: Math.random() * 5
              }
            }}
          >
            {i % 2 === 0 ? '❀' : '✿'}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-auto text-center">
        {/* Couple photo */}
        <motion.div 
          className="mx-auto mb-8 w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-rose-300/50 p-1 shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
          <img 
            src="/assets/images/couple.jpg" 
            alt="Daniel and Stellah" 
            className="w-full h-full object-cover rounded-full grayscale-[15%]"
          />
        </motion.div>

        {/* Interactive Envelope */}
        <motion.div 
          className="relative mb-8 cursor-pointer"
          onClick={!isEnvelopeOpen ? handleEnvelopeClick : undefined}
          whileHover={!isEnvelopeOpen ? { scale: 1.05 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence>
            {!isEnvelopeOpen ? (
              <motion.div
                key="closed-envelope"
                className="text-yellow-400/90 text-5xl relative"
                initial={{ rotate: -5 }}
                animate={{ 
                  rotate: [-5, 5, -5],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }
                }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <FaEnvelope />
                <motion.p 
                  className="text-sm mt-2 absolute left-0 right-0"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.6, 1, 0.6],
                    transition: {
                      duration: 2,
                      repeat: Infinity
                    }
                  }}
                >
                  Open Invitation
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="open-envelope"
                className="text-rose-200/90 text-5xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <FaEnvelopeOpen />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Formal Invitation Reveal */}
        <AnimatePresence>
          {showFormalInvite && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseInvite}
            >
              <motion.div 
                className="bg-rose-50/95 rounded-lg p-6 max-w-md relative mx-4 border border-rose-200/30 shadow-xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-3 right-3 text-rose-700 hover:text-rose-900 transition-colors"
                  onClick={handleCloseInvite}
                >
                  ✕
                </button>
                <div className="text-center">
                  <h3 className="font-serif text-2xl text-rose-900 mb-4">Wedding Invitation</h3>
                  <div className="border-t border-rose-200/50 pt-4 text-rose-800">
                    <p className="mb-4 leading-relaxed">
                      Together with the families of<br />
                      <span className="font-medium text-rose-900">John Okumu & the Late Syprine Aoko</span><br />
                      and<br />
                      <span className="font-medium text-rose-900">the Late Kizito Ettyang & the Late Emily Abbo</span>
                    </p>
                    <p className="text-xl font-serif text-rose-900 mb-4">
                      Stellah and Daniel
                    </p>
                    <p className="mb-4">
                      invite you to join their wedding celebration
                    </p>
                    <div className="my-4 py-2 border-y border-rose-200/50">
                      <p className="font-medium text-rose-900">
                        Saturday, August 9th, 2025<br />
                        at 9:00 AM
                      </p>
                    </div>
                    <p className="mt-4">
                      St. Leonida Catholic Church – Nyawita
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Couple names with centered heart */}
        <motion.div 
          className="flex items-center justify-center mb-6"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6
              }
            }
          }}
        >
          <motion.span 
            className="font-serif text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-200/90 to-rose-300/90"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { type: 'spring', stiffness: 300 }
              }
            }}
          >
            Daniel
          </motion.span>
          
          <motion.span 
            className="mx-2 sm:mx-3 text-3xl sm:text-4xl text-rose-400/90"
            animate={{
              scale: [1, 1.2, 1],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
            }}
          >
            <FaHeart />
          </motion.span>
           
          <motion.span 
            className="font-serif text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-300/90 to-rose-200/90"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { type: 'spring', stiffness: 300 }
              }
            }}
          >
            Stellah
          </motion.span>
        </motion.div>

        {/* Countdown timer */}
        <motion.div 
          className="mb-8 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-rose-200/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <div className="text-xs text-rose-800/90 mb-2 tracking-wider font-medium">COUNTDOWN TO OUR WEDDING</div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: days, label: 'Days' },
              { value: hours, label: 'Hours' },
              { value: minutes, label: 'Mins' },
              { value: seconds, label: 'Secs' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-rose-900/90 font-serif">
                  {item.value}
                </div>
                <div className="text-xs text-rose-700/90 mt-1 uppercase tracking-wider">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Wedding details */}
        <motion.div 
          className="space-y-4 mb-8 text-burnt-orange"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <FaCalendarAlt className="text-rose-300/90" />
            <span>August 9, 2025</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaMapMarkerAlt className="text-rose-300/90" />
            <span>St. Leonida Catholic Church – Nyawita</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        {!showFormalInvite && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <a
              href="#details"
              className="inline-flex flex-col items-center group"
            >
              <motion.p
                className="text-rose-200/90 text-xs mb-2 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                See Wedding Details
              </motion.p>
              <motion.div
                className="p-2 rounded-full border border-rose-300/40 text-metallic-gold hover:bg-rose-300/10 transition-all duration-300"
                animate={{
                  y: [0, 6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop'
                }}
              >
                <FaChevronDown />
              </motion.div>
            </a>
          </motion.div>
        )}
      </div>

      {/* Music player */}
      <div className="fixed bottom-4 right-4 z-20">
        <MusicPlayer />
      </div>
    </section>
  );
};

export default HeroSection;