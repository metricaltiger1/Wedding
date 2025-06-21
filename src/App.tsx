import { useState, useEffect } from 'react';
import Envelope from './components/Envelope';
import QuestionSection from './components/QuestionSection';
import HeroSection from './components/HeroSection';
import WeddingDetails from './components/WeddingDetails';
import LoveStory from './components/LoveStory';
import PhotoGallery from './components/PhotoGallery';
import RSVPSection from './components/RSVPSection';
import Footer from './components/Footer';

const App = () => {
  const [currentView, setCurrentView] = useState<'envelope' | 'question' | 'main'>('envelope');

  // Initialize particles when main view is shown
  useEffect(() => {
    if (currentView === 'main') {
      const initParticles = async () => {
        const particlesJS = (await import('particles.js')).default;
        particlesJS('particles-js', {
          particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: '#D4AF37' },
            shape: {
              type: 'image',
              image: {
                src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23d4af37'><path d='M12 2C13.1 2 14 2.9 14 4S13.1 6 12 6 10 5.1 10 4 10.9 2 12 2m3.5 6.5c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1-1.3 1.3-3 2-4.6 2s-3.4-.7-4.6-2c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0 .9.9 2.1 1.4 3.5 1.4s2.6-.5 3.5-1.4M12 22c-1.7 0-3.4-.7-4.6-2-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0 1.1 1.1 2.5 1.6 3.5 1.6s2.4-.5 3.5-1.6c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1-1.2 1.3-2.9 2-4.6 2m0-6c-1.7 0-3.4-.7-4.6-2-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0 1.1 1.1 2.5 1.6 3.5 1.6s2.4-.5 3.5-1.6c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1-1.2 1.3-2.9 2-4.6 2m0-6c-1.7 0-3.4-.7-4.6-2-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0 1.1 1.1 2.5 1.6 3.5 1.6s2.4-.5 3.5-1.6c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1-1.2 1.3-2.9 2-4.6 2z'/></svg>",
                width: 24,
                height: 24,
              },
            },
            opacity: { value: 0.5, random: true },
            size: { value: 15, random: true },
            line_linked: { enable: false },
            move: {
              enable: true,
              speed: 2,
              direction: 'bottom',
              straight: false,
              out_mode: 'out',
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: true, mode: 'repulse' },
              onclick: { enable: true, mode: 'push' },
            },
          },
        });
      };

      initParticles();
    }
  }, [currentView]);

  // Initialize scroll animations when main view is shown
  useEffect(() => {
    if (currentView === 'main') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll('.page').forEach((page) => {
        observer.observe(page);
      });

      return () => {
        document.querySelectorAll('.page').forEach((page) => {
          observer.unobserve(page);
        });
      };
    }
  }, [currentView]);

  return (
    <div className="relative overflow-x-hidden">
      {currentView === 'envelope' && (
        <Envelope onOpen={() => setCurrentView('question')} />
      )}

      {currentView === 'question' && (
        <QuestionSection onContinue={() => setCurrentView('main')} />
      )}

      {currentView === 'main' && (
        <>
          <HeroSection />
          <WeddingDetails />
          <LoveStory />
          <PhotoGallery />
          <RSVPSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;