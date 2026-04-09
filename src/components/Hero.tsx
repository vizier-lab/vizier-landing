import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { FaGithub } from 'react-icons/fa';

export default function Hero() {
  const scrollToQuickstart = () => {
    document.getElementById('quickstart')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Theme toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center justify-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8 justify-center items-center flex"
        >
          <div className="animate-float">
            <img
              src="vizier-logo-light.svg"
              alt="Vizier Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto dark:hidden"
            />
            <img
              src="vizier-logo-dark.svg"
              alt="Vizier Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto hidden dark:block"
            />
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
        >
          <span className="gradient-text">21st Century</span>
          <br />
          Digital Steward
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          Your right-hand AI agent for multi-channel automation.
          <br className="hidden sm:block" />
          Connect, automate, and orchestrate across Discord, Telegram, HTTP, and more.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={scrollToQuickstart}
            className="btn btn-primary text-base px-8 py-4 w-45"
          >
            Get Started
            <ArrowRight size={18} />
          </button>
          <a
            href="https://github.com/vizier-lab/vizier"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-base px-8 py-4 w-45"
          >
            <FaGithub className="w-4.5 h-4.5" fill="currentColor"></FaGithub>
            View on GitHub
          </a>
        </motion.div>

        {/* Version badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex justify-center gap-4 text-sm"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <span className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            />
            v0.3.0-rc.3
          </span>
          <span>•</span>
          <span>MIT License</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
          style={{ borderColor: 'var(--border)' }}
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          />
        </motion.div>
      </motion.div>
    </section >
  );
}
