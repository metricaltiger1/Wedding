import { useState, type JSX, useEffect } from 'react';
import { FaGem, FaHeart, FaChevronRight, FaTimes, FaUtensils } from 'react-icons/fa';
import { GiRose, GiHearts } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { FaBuilding } from 'react-icons/fa6';

interface Story {
  title: string;
  content: string;
  icon: JSX.Element;
  date: string;
  tags: string[];
  color: string;
  image?: string;
}

const LoveStory = () => {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeStory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeStory]);

const stories: Story[] = [
  {
    title: "How We Met",
    content: `<p>It began with a simple “Hi” and a smile — a brief encounter that sparked curiosity and connection.</p>
    <p class="mt-4">Later that day, a mysterious call confirmed what one heart already knew — something special had begun.</p>
    <p class="mt-4 text-rose-600 italic">"I just knew that voice — it was him." - Stellah</p>`,
    icon: <FaBuilding className="text-2xl" />,
    date: "2004",
    tags: ["Fateful Encounter"],
    color: "bg-amber-100",
    image: "/assets/images/how-we-met.jpg"
  },
  {
    title: "Our First Date",
    content: `<p>A simple meal, laughter, and one lighthearted moment — that’s all it took to turn comfort into connection.</p>
    <p class="mt-4">From that day forward, spending time together became something they looked forward to.</p>
    <p class="mt-4 text-rose-600 italic">"That moment sealed it." - Stellah</p>`,
    icon: <FaUtensils className="text-2xl" />,
    date: "2004",
    tags: ["First Date", "Simple Joys"],
    color: "bg-orange-100",
    image: "/assets/images/first-date.jpg"
  },
  {
    title: "The Proposal",
    content: `<p>After time apart, a call came — not dramatic, just honest. “Are we moving forward or not?”</p>
    <p class="mt-4">She said YES. The quiet, thoughtful commitment meant everything.</p>
    <p class="mt-4 text-rose-600 italic">"Classic Dan — no flowers, just truth." - Stellah</p>`,
    icon: <FaGem className="text-2xl" />,
    date: "2009",
    tags: ["Commitment", "Engagement"],
    color: "bg-rose-100",
    image: "/assets/images/proposal.jpg"
  },
  {
    title: "We Say I Do",
    content: `<p>For years, the dream of a church wedding lingered. One day, Dan simply said, “Let’s do it.”</p>
    <p class="mt-4">This moment is a fulfillment of faith, love, and answered prayers.</p>
    <p class="mt-4 text-rose-600 italic">"The Lord appeared to him... and now here we are." - Stellah</p>`,
    icon: <FaHeart className="text-2xl" />,
    date: "August 9, 2025",
    tags: ["Church Wedding", "Faith"],
    color: "bg-purple-100",
    image: "/assets/images/wedding-day.jpg"
  },
];



  const openStory = (story: Story, index: number) => {
    setActiveStory(story);
    setCurrentIndex(index);
  };

  const navigateStory = (direction: 'prev' | 'next') => {
    let newIndex = currentIndex;
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + stories.length) % stories.length;
    } else if (direction === 'next') {
      newIndex = (currentIndex + 1) % stories.length;
    }
    setCurrentIndex(newIndex);
    setActiveStory(stories[newIndex]);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigateStory('next'),
    onSwipedRight: () => navigateStory('prev'),
    trackMouse: true,
  });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-rose-50 to-purple-50 relative overflow-hidden" id="our-story">
      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50
            }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: [0, -100],
              x: [0, Math.random() * 100 - 50]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute text-rose-200"
            style={{
              fontSize: `${10 + Math.random() * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <GiHearts />
          </motion.div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20 rotate-12">
        <GiRose className="text-rose-300 text-6xl" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 -rotate-12">
        <GiRose className="text-purple-300 text-8xl" />
      </div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl md:text-5xl text-center mb-12 text-rose-800"
        >
          Our Love Story
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center max-w-2xl mx-auto text-rose-700 mb-16 text-lg"
        >
          Every love story is beautiful, but ours is our favourite. Here are some of our most cherished moments together.
        </motion.p>

        <div className="max-w-5xl mx-auto relative">
          {/* Animated timeline line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1 }}
            className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-rose-300 to-purple-300 transform -translate-x-1/2 origin-top"
          ></motion.div>

          {/* Timeline items */}
          <div className="space-y-16 md:space-y-24">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`group relative md:flex justify-between items-center ${
                  index % 2 === 0 ? '' : 'flex-row-reverse'
                }`}
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
              >
                {/* Left content */}
                <motion.div
                  whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                  className={`md:w-5/12 mb-8 md:mb-0 ${
                    index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                  }`}
                >
                  <h3 className="font-serif text-2xl md:text-3xl text-rose-800 mb-1">
                    {story.title}
                  </h3>
                  <p className="text-rose-600 font-medium">{story.date}</p>
                  <div className="mt-4 hidden md:inline-block">
                    <div className="inline-flex flex-wrap gap-2">
                      {story.tags.map((tag, i) => (
                        <motion.span 
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 bg-white/80 text-rose-800 rounded-full text-sm shadow-sm border border-rose-100"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Center icon */}
                <div className="hidden md:flex w-2/12 justify-center relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: isHovering === index ? 1.1 : 1,
                      boxShadow: isHovering === index ? 
                        '0 0 20px 5px rgba(236, 72, 153, 0.3)' : 
                        '0 0 10px 2px rgba(236, 72, 153, 0.1)'
                    }}
                    className={`w-20 h-20 rounded-full ${story.color} flex items-center justify-center text-rose-700 shadow-lg cursor-pointer transition-all duration-300`}
                    onClick={() => openStory(story, index)}
                  >
                    {story.icon}
                  </motion.div>
                </div>

                {/* Right content */}
                <motion.div
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  animate={{
                    background: isHovering === index ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)'
                  }}
                  className={`md:w-5/12 bg-white/90 p-6 rounded-xl shadow-md cursor-pointer backdrop-blur-sm border border-white/70 transition-all duration-300 ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}
                  onClick={() => openStory(story, index)}
                >
                  <div className="flex justify-between items-center">
                    <p className="text-rose-800 line-clamp-3">
                      {story.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                    </p>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="text-rose-500 ml-4 flex-shrink-0"
                    >
                      <FaChevronRight />
                    </motion.div>
                  </div>
                  <div className="mt-4 md:hidden">
                    <div className="flex flex-wrap gap-2">
                      {story.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-white text-rose-800 rounded-full text-xs shadow-sm border border-rose-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Mobile connector */}
                <div className="md:hidden absolute left-6 top-16 bottom-0 w-0.5 bg-rose-200"></div>
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  className="md:hidden absolute left-6 top-16 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 shadow-sm"
                  onClick={() => openStory(story, index)}
                >
                  {story.icon}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Modal */}
      <AnimatePresence>
        {activeStory && (
          <>
            {/* Fixed Close Button - Outside the modal container so it stays fixed */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveStory(null)}
              className="fixed top-4 right-4 md:top-6 md:right-6 z-[60] text-rose-500 hover:text-rose-700 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all backdrop-blur-sm"
            >
              <FaTimes className="text-xl" />
            </motion.button>

            {/* Modal Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setActiveStory(null);
                }
              }}
            >
              {/* Modal Content */}
              <motion.div 
                {...swipeHandlers}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={`relative bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col shadow-2xl ${activeStory.color}/20`}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-300 to-purple-300"></div>
                
                {/* Scrollable Content Area */}
                <div className="overflow-y-auto flex-1">
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="font-serif text-2xl md:text-3xl text-rose-800">
                        {activeStory.title}
                      </h3>
                      <p className="text-rose-600 font-medium">{activeStory.date}</p>
                    </div>

                    {activeStory.image && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="my-6 rounded-lg overflow-hidden shadow-md"
                      >
                        <img 
                          src={activeStory.image} 
                          alt={activeStory.title} 
                          className="w-full h-48 md:h-64 object-cover"
                          loading="lazy"
                        />
                      </motion.div>
                    )}

                    <div className="flex justify-center my-6">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className={`w-24 h-24 rounded-full ${activeStory.color} flex items-center justify-center text-rose-700 shadow-lg`}
                      >
                        {activeStory.icon}
                      </motion.div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-rose-800 prose prose-p:my-4 prose-p:leading-relaxed prose-strong:text-rose-700"
                      dangerouslySetInnerHTML={{ __html: activeStory.content }}
                    ></motion.div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {activeStory.tags.map((tag, i) => (
                        <motion.span 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="px-3 py-1 bg-white text-rose-800 rounded-full text-sm shadow-sm border border-rose-100"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Navigation arrows */}
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigateStory('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-rose-700 hover:bg-white transition-all"
                >
                  <FaChevronRight className="transform rotate-180" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigateStory('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-rose-700 hover:bg-white transition-all"
                >
                  <FaChevronRight />
                </motion.button>

                {/* Progress indicator */}
                <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent pt-8 pb-4 px-4">
                  <div className="flex justify-center gap-2">
                    {stories.map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          width: currentIndex === i ? 24 : 8,
                          backgroundColor: currentIndex === i ? '#e11d48' : '#fda4af'
                        }}
                        className="h-2 rounded-full transition-all duration-300"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LoveStory;