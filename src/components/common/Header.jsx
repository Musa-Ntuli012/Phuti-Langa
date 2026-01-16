import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '../../utils/constants';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: ROUTES.HOME, label: 'Home' },
    { path: ROUTES.ABOUT, label: 'About' },
    { path: ROUTES.SHOWCASE, label: 'Showcase' },
    { path: ROUTES.CV, label: 'CV' },
    { path: ROUTES.CONTACT, label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-accent/95 backdrop-blur-sm border-b border-secondary/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to={ROUTES.HOME}
            className="text-2xl font-serif font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Phuti Langa
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-primary/70 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={ROUTES.ADMIN}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isActive(ROUTES.ADMIN)
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-primary/70 hover:text-primary'
              }`}
              title="Admin Panel"
            >
              <Settings size={16} />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-base font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-primary border-l-4 border-primary pl-2'
                        : 'text-primary/70 hover:text-primary pl-2'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to={ROUTES.ADMIN}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 text-base font-medium transition-colors ${
                    isActive(ROUTES.ADMIN)
                      ? 'text-primary border-l-4 border-primary pl-2'
                      : 'text-primary/70 hover:text-primary pl-2'
                  }`}
                >
                  <Settings size={18} />
                  <span>Admin</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
