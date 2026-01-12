import { useState } from 'react';
import { motion } from 'framer-motion';
import { PLACEHOLDER_CONTENT } from '../../utils/constants';

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-secondary shadow-xl">
              {!imageError ? (
                <img
                  src="/placeholder-headshot.jpg"
                  alt="Phuti Langa"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center text-primary text-4xl font-serif">
                  PL
                </div>
              )}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-4">
              Phuti Langa
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-primary/80 mb-6 font-light"
            >
              BCom Law graduate and aspiring legal professional with an interest in development & policy
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg text-primary/70 max-w-2xl mb-8 leading-relaxed"
            >
              {PLACEHOLDER_CONTENT.bio}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
