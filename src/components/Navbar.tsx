import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Bug, Sun, Moon, Newspaper } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate opacity based on scroll position (0 to 1)
      // Reaches full opacity after scrolling 100px
      const scrolled = window.scrollY;
      const opacity = Math.min(scrolled / 100, 1);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav
      className="navbar bg-background"
      style={{
        background: "var(--background)",
        '--scroll-opacity': scrollOpacity,
      } as React.CSSProperties}
    >
      <div className="navbar-container">
        {/* Logo - Hidden on home page */}
        {!isHome ? (
          <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
            <img
              src="/vizier-logo-light.svg"
              alt="Vizier"
              className="navbar-logo-img logo-light"
            />
            <img
              src="/vizier-logo-dark.svg"
              alt="Vizier"
              className="navbar-logo-img logo-dark"
            />
          </Link>
        ) : <div></div>}

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          <Link to="/blog" className="navbar-link">
            <Newspaper size={16} />
            Blog
          </Link>
          <a
            href="https://book.vizier.rs"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-link"
          >
            <BookOpen size={16} />
            Docs
          </a>
          <a
            href="https://github.com/vizier-lab/vizier/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-link"
          >
            <Bug size={16} />
            Bug Report
          </a>
          <a
            href="https://github.com/vizier-lab/vizier"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-link navbar-github"
            title="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <button
            onClick={toggleTheme}
            className="navbar-theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="navbar-mobile">
          <Link
            to="/blog"
            className="navbar-mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <a
            href="https://book.vizier.rs"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-mobile-link"
          >
            <BookOpen size={16} />
            Docs
          </a>
          <a
            href="https://github.com/vizier-lab/vizier/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-mobile-link"
          >
            <Bug size={16} />
            Bug Report
          </a>
          <button
            onClick={toggleTheme}
            className="navbar-mobile-theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>
      )}
    </nav>
  );
}
