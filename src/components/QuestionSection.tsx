import { useState } from 'react';
import { FaHeart, FaUsers, FaBriefcase, FaStar, FaArrowRight } from 'react-icons/fa';
import { GiRose } from 'react-icons/gi';
import { IoFlower } from 'react-icons/io5';

interface QuestionSectionProps {
  onContinue: () => void;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({ onContinue }) => {
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [isContainerOpen, setIsContainerOpen] = useState(true);
  const [showFlowers, setShowFlowers] = useState(false);

  const responses = {
    family: {
      text: "Family is everything! We're so grateful to have you as part of our lives and can't wait to celebrate this special day with you. Your presence means the world to us.",
      color: "bg-rose-100",
      photo: "/assets/images/family.jpg",
      icon: <FaUsers className="text-rose-500" />,
    },
    friend: {
      text: "Our dear friend! You've been with us through so many memories, and we wouldn't want to start this new chapter without you. Get ready for lots of love, laughter, and dancing!",
      color: "bg-lavender-100",
      photo: "/assets/images/friends.jpg",
      icon: <FaHeart className="text-lavender-500" />,
    },
    colleague: {
      text: "How wonderful that our professional relationship has brought us to this celebration! We're honored you'll be joining us as we take this next step together.",
      color: "bg-sky-100",
      photo: "/assets/images/colleagues.jpg",
      icon: <FaBriefcase className="text-sky-500" />,
    },
    guest: {
      text: "We're truly honored you'll be joining us on our special day. Your presence will make our celebration even more meaningful. Thank you for being part of our journey!",
      color: "bg-violet-100",
      photo: "/assets/images/guests.jpg",
      icon: <FaStar className="text-violet-500" />,
    },
  };

  const handleResponseClick = (responseType: string) => {
    setSelectedResponse(responseType);
    setIsContainerOpen(false);
    setShowFlowers(true);
    setTimeout(() => setShowFlowers(false), 3000);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-lavender-50 px-4 relative overflow-hidden">
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

      {/* Flower petals animation */}
      {showFlowers && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-30">
          {[...Array(20)].map((_, i) => (
            <FlowerPetal key={i} />
          ))}
        </div>
      )}

      <div
        className={`max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform ${
          isContainerOpen ? 'scale-95' : 'scale-100'
        } ${selectedResponse ? responses[selectedResponse as keyof typeof responses].color : 'bg-white'} 
        border border-white/50 backdrop-blur-sm bg-white/80 z-10`}
      >
        <div className="p-8 text-center">
          <h2 className="font-serif text-3xl text-rose-800 mb-6">
            How do you know the couple?
          </h2>

          <div
            className={`question-container overflow-hidden transition-all duration-500 ${
              isContainerOpen ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="space-y-4">
              <button
                onClick={() => handleResponseClick('family')}
                className="option-btn w-full py-3 px-6 bg-rose-100/50 text-rose-800 rounded-lg font-medium hover:bg-rose-200/50 transition-all flex items-center justify-center border border-rose-200/50 shadow-sm hover:shadow-md"
              >
                <FaUsers className="mr-2" /> I'm family
              </button>
              <button
                onClick={() => handleResponseClick('friend')}
                className="option-btn w-full py-3 px-6 bg-lavender-100/50 text-lavender-800 rounded-lg font-medium hover:bg-lavender-200/50 transition-all flex items-center justify-center border border-lavender-200/50 shadow-sm hover:shadow-md"
              >
                <FaHeart className="mr-2" /> Close friend
              </button>
              <button
                onClick={() => handleResponseClick('colleague')}
                className="option-btn w-full py-3 px-6 bg-sky-100/50 text-sky-800 rounded-lg font-medium hover:bg-sky-200/50 transition-all flex items-center justify-center border border-sky-200/50 shadow-sm hover:shadow-md"
              >
                <FaBriefcase className="mr-2" /> Colleague
              </button>
              <button
                onClick={() => handleResponseClick('guest')}
                className="option-btn w-full py-3 px-6 bg-violet-100/50 text-violet-800 rounded-lg font-medium hover:bg-violet-200/50 transition-all flex items-center justify-center border border-violet-200/50 shadow-sm hover:shadow-md"
              >
                <FaStar className="mr-2" /> Honored guest
              </button>
            </div>
          </div>

          <div
            className={`mt-8 transition-all duration-500 ${
              selectedResponse ? 'block' : 'hidden'
            }`}
          >
            {selectedResponse && (
              <>
                <div className="mb-6 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                  <img
                    src={responses[selectedResponse as keyof typeof responses].photo}
                    alt="Relationship type"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-white/80 shadow-sm border border-white">
                    {responses[selectedResponse as keyof typeof responses].icon}
                  </div>
                </div>
                <p className="text-lg mb-6 text-rose-900/80 font-serif">
                  {responses[selectedResponse as keyof typeof responses].text}
                </p>
              </>
            )}
            <button
              onClick={onContinue}
              className="px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full hover:from-rose-500 hover:to-rose-700 transition-all flex items-center mx-auto shadow-lg hover:shadow-rose-200/50 animate-bounce-slow"
            >
              Continue to Wedding Site <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
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
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        
        .option-btn {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .option-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default QuestionSection;