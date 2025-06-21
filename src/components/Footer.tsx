import { FaGithub, FaLinkedinIn, FaGlobe } from 'react-icons/fa';
import { GiRose } from 'react-icons/gi';

const Footer = () => {
  return (
    <footer className="relative z-10 py-12 bg-navy-900 text-white border-t border-navy-700 shadow-inner backdrop-blur-md">
      {/* Decorative elements - moved to bottom of component and added z-index */}
      <div className="absolute top-10 left-10 opacity-20 rotate-12 z-0">
        <GiRose className="text-rose-300 text-6xl" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 -rotate-12 z-0">
        <GiRose className="text-lavender-300 text-8xl" />
      </div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title & Verse */}
        <div className="text-center mb-10">
          <h3 className="heading-font text-3xl font-semibold text-gold-300 mb-3">
            Daniel & Stellah
          </h3>
          <p className="text-gold-100 italic max-w-xl mx-auto">
            "Therefore what God has joined together, let no one separate." – <span className="text-orange-400">Mark 10:9</span>
          </p>
        </div>

        {/* Dev Icons */}
        <div className="flex justify-center gap-6 mb-10">
          <a
            href="https://github.com/metricaltiger1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center text-white hover:shadow-[0_0_15px_#ff9900] hover:text-orange-400 transition-all duration-300 relative z-10"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/christopher-okumu-747a65267/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center text-white hover:shadow-[0_0_15px_#0e76a8] hover:text-sky-400 transition-all duration-300 relative z-10"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="https://metricaltiger1.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center text-white hover:shadow-[0_0_15px_#ffd700] hover:text-yellow-400 transition-all duration-300 relative z-10"
            aria-label="Portfolio"
          >
            <FaGlobe size={20} />
          </a>
        </div>

        {/* Final Note */}
        <div className="text-center text-sm text-gold-300 relative z-10">
          <p className="mb-1">
            Made with <span className="text-orange-500 animate-pulse">💙</span> by his brother — a
            gift coded with love.
          </p>
          <p>© 2025 Daniel & Stellah's Wedding — All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;