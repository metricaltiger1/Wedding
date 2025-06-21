import { useRef, useState } from 'react';
import { FaHeart, FaLeaf } from 'react-icons/fa';
import { GiRose, GiFlowerEmblem } from 'react-icons/gi';
import { IoFlower } from 'react-icons/io5';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!isOpen) {
      setSealBroken(true);
      setIsOpen(true);
      setTimeout(() => {
        setShowMessage(true);
        setShowFlowers(true);
      }, 2000);
      setTimeout(() => {
        setShowFlowers(false);
        setTimeout(() => {
          onOpen();
        }, 2000);
      }, 5000);
    }
  };

  // Floating flowers effect
  const FlowerPetal = () => {
    const size = Math.random() * 15 + 5;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    const opacity = Math.random() * 0.7 + 0.3;
    const rotation = Math.random() * 360;
    const flowerType = Math.random() > 0.5 ? 'heart' : 'flower';

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${left}%`,
          top: '-10%',
          width: `${size}px`,
          height: `${size}px`,
          animation: `fall ${animationDuration}s linear ${delay}s infinite`,
          opacity: opacity,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {flowerType === 'heart' ? (
          <FaHeart className="text-rose-300" />
        ) : (
          <IoFlower className="text-lavender-300" />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center transition-all duration-1000 relative overflow-hidden">
      {/* Watercolor overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/70 to-lavender-50/70 z-0"></div>
      
      {/* Decorative corner flowers */}
      <div className="absolute top-10 left-10 opacity-40 rotate-12 z-0">
        <GiRose className="text-rose-300 text-6xl" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-40 -rotate-12 z-0">
        <GiRose className="text-lavender-300 text-8xl" />
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10 z-0"></div>

      <div 
        ref={envelopeRef}
        className={`envelope mx-auto mb-8 ${isOpen ? 'open' : ''} relative z-10`}
        onClick={handleClick}
      >
        {/* Envelope flap pattern */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-1">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] opacity-10"></div>
        </div>
        
        {/* Wax seal */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${sealBroken ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-lg flex items-center justify-center animate-glow">
              <GiFlowerEmblem className="text-white text-2xl" />
            </div>
            <div className="absolute -inset-2 border-2 border-rose-300 rounded-full animate-ping-slow pointer-events-none"></div>
          </div>
        </div>

        {/* Envelope contents */}
        <div className="paper">
          {!showMessage ? (
            <>
              <h1 className="text-3xl font-serif text-rose-800 mb-2 tracking-wider">
                Daniel & Stellah
              </h1>
              <p className="text-rose-600 font-light italic">Open our wedding invitation</p>
              <div className="w-12 h-12 mt-4 bg-rose-100/50 rounded-full flex items-center justify-center shadow-inner border border-rose-200/50">
                <FaHeart className="text-rose-500 animate-pulse" />
              </div>
            </>
          ) : (
            <div className="relative w-full h-full">
              {/* Wedding Card Content */}
              <div className="paper-card">
                {/* Couple Names */}
                <h1 className="text-3xl font-serif text-rose-800 mb-1">
                  Daniel & Stellah
                </h1>
                
                {/* Invitation Text */}
                <p className="text-rose-600 font-serif italic mb-1">
                  You're Invited
                </p>
                
                {/* Wedding Details */}
                <p className="text-orange-600 text-sm mb-2">
                  9th August 2025 • Kisumu
                </p>
                
                {/* Decorative Elements */}
                <div className="flex justify-center mt-3">
                  <FaHeart className="text-rose-500 mx-1 animate-bounce" />
                  <FaLeaf className="text-emerald-400 mx-1 animate-wiggle" />
                  <FaHeart className="text-rose-500 mx-1 animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Flower petals animation */}
        {showFlowers && (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-30">
            {[...Array(20)].map((_, i) => (
              <FlowerPetal key={i} />
            ))}
          </div>
        )}
      </div>

      {!isOpen && (
        <p className="text-rose-700/80 mt-8 font-light tracking-wider animate-pulse z-10 text-shadow">
          Touch the envelope to reveal your invitation
        </p>
      )}

      <style>{`
        .envelope {
          position: relative;
          width: 340px;
          height: 240px;
          background: linear-gradient(135deg, #f9e8e4 0%, #f5d9d1 100%);
          border-radius: 8px;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.15),
            inset 0 0 30px rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform-style: preserve-3d;
          perspective: 1000px;
          z-index: 10;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .envelope:before {
          content: "";
          position: absolute;
          top: 0;
          width: 0;
          height: 0;
          border-left: 170px solid transparent;
          border-right: 170px solid transparent;
          border-top: 120px solid #f8d7c7;
          transform-origin: top;
          transform: rotateX(0deg);
          transition: all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 5;
          box-shadow: 
            0 0 15px rgba(0, 0, 0, 0.1),
            inset 0 -10px 20px rgba(255, 255, 255, 0.4);
          border-radius: 0 0 8px 8px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
          background-image: url('https://www.transparenttextures.com/patterns/soft-circle-scatter.png');
          background-blend-mode: overlay;
          opacity: 0.9;
        }

        .envelope:after {
          content: "";
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 12px;
          background: #e8c4b8;
          border-radius: 0 0 8px 8px;
          z-index: 1;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .envelope.open:before {
          transform: rotateX(180deg);
        }

        .envelope .paper {
          position: absolute;
          width: 320px;
          height: 220px;
          background: linear-gradient(to bottom right, #fff9f8, #fff0ed);
          border-radius: 4px;
          top: 10px;
          left: 10px;
          transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform-origin: center;
          box-shadow: 
            inset 0 0 10px rgba(0, 0, 0, 0.05),
            0 3px 6px rgba(0, 0, 0, 0.1);
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          text-align: center;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.5);
          background-image: url('https://www.transparenttextures.com/patterns/rice-paper.png');
        }

        /* Remove the translateY animation for the paper */
        .envelope.open .paper {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .paper-card {
          width: 280px;
          height: 160px;
          background: linear-gradient(to bottom right, #fff9f8, #fff0ed);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 
            inset 0 0 10px rgba(0, 0, 0, 0.05),
            0 4px 15px rgba(0, 0, 0, 0.1);
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.5);
          position: relative;
          overflow: hidden;
          background-image: url('https://www.transparenttextures.com/patterns/rice-paper.png');
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(300px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(225, 95, 150, 0.5); }
          50% { box-shadow: 0 0 20px rgba(225, 95, 150, 0.8); }
          100% { box-shadow: 0 0 5px rgba(225, 95, 150, 0.5); }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        .envelope:hover:not(.open) {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        .text-shadow {
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
        }

        .animate-glow {
          animation: glow 2s infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s infinite;
        }

        .animate-wiggle {
          animation: wiggle 1s infinite;
        }

        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default Envelope;