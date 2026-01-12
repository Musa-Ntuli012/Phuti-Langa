import { motion } from 'framer-motion';
import ProjectGrid from '../components/showcase/ProjectGrid';

const Showcase = () => {
  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Showcase
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          <p className="text-lg text-primary/70 max-w-2xl mx-auto">
            Explore my projects, research, and professional achievements
          </p>
        </motion.div>

        {/* Projects Grid */}
        <ProjectGrid />
      </div>
    </div>
  );
};

export default Showcase;
