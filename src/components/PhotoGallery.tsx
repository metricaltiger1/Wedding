import { useState, useEffect } from 'react';
import { FaImages, FaHeart, FaArrowDown } from 'react-icons/fa';
import { GiRose } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

const photos = [
  {
    src: "/assets/images/couple1.jpg",
    caption: "Our first date at the coffee shop",
    date: "June 2004",
    heartCount: 24,
  },
  {
    src: "/assets/images/couple2.jpg",
    caption: "Christmas together",
    date: "December 2009",
    heartCount: 32,
  },
  {
    src: "/assets/images/couple3.jpg",
    caption: "Sunday service",
    date: "February 2020",
    heartCount: 18,
  },
  {
    src: "/assets/images/couple4.jpg",
    caption: "Family gathering",
    date: "July 2021",
    heartCount: 28,
  },
  {
    src: "/assets/images/couple5.jpg",
    caption: "Proposal moment",
    date: "March 2009",
    heartCount: 56,
  },
  {
    src: "/assets/images/couple6.jpg",
    caption: "Engagement photo",
    date: "April 2025",
    heartCount: 42,
  },
];

const PhotoGallery = () => {
  const [showMore, setShowMore] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [flowerPositions, setFlowerPositions] = useState<Array<{x: number, y: number}>>([]);

  const addFlower = (e: React.MouseEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    setFlowerPositions([...flowerPositions, {
      x: e.clientX - container.left,
      y: e.clientY - container.top
    }]);
  };

  useEffect(() => {
    if (flowerPositions.length > 0) {
      const timer = setTimeout(() => {
        setFlowerPositions(flowerPositions.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [flowerPositions]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-rose-50 to-lavender-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20 rotate-12">
        <GiRose className="text-rose-300 text-6xl" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 -rotate-12">
        <GiRose className="text-lavender-300 text-8xl" />
      </div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl md:text-5xl text-center mb-12 text-rose-800"
        >
          Our Journey Together
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {photos.slice(0, showMore ? photos.length : 3).map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative overflow-hidden rounded-xl shadow-lg bg-white border border-white/50"
              onClick={addFlower}
            >
              {/* Interactive flower effect */}
              {flowerPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute text-rose-400 pointer-events-none"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1 }}
                  style={{
                    left: pos.x,
                    top: pos.y,
                  }}
                >
                  <FaHeart />
                </motion.div>
              ))}

              <div className="relative overflow-hidden h-64 md:h-80">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6"
                    >
                      <div>
                        <motion.p 
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          className="text-white font-medium text-lg"
                        >
                          {photo.caption}
                        </motion.p>
                        <motion.p 
                          initial={{ y: 30 }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-rose-100 text-sm"
                        >
                          {photo.date}
                        </motion.p>
                        <motion.div
                          initial={{ y: 40 }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center mt-2 text-rose-200"
                        >
                          <FaHeart className="mr-1" />
                          <span className="text-sm">{photo.heartCount} hearts</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Always visible caption for mobile */}
              <div className="p-4 sm:hidden">
                <p className="text-rose-800 font-medium">{photo.caption}</p>
                <p className="text-sm text-rose-600">{photo.date}</p>
                <div className="flex items-center mt-1 text-rose-500">
                  <FaHeart className="mr-1 text-sm" />
                  <span className="text-xs">{photo.heartCount}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-8 py-3 bg-gradient-to-r from-rose-400 to-rose-600 text-white rounded-full hover:from-rose-500 hover:to-rose-700 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-rose-200/50"
          >
            <FaImages className="mr-2" /> 
            {showMore ? "Show Less Memories" : "View More Memories"}
            {!showMore && <FaArrowDown className="ml-2 animate-bounce" />}
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default PhotoGallery;