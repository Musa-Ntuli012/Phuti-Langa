import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-9xl font-serif font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-serif font-semibold text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-primary/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button to={ROUTES.HOME} variant="primary" size="lg" className="inline-flex items-center space-x-2">
          <Home size={20} />
          <span>Back to Home</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
