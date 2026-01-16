import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import Education from '../components/about/Education';
import Skills from '../components/about/Skills';
import Experience from '../components/about/Experience';
import Interests from '../components/about/Interests';
import Card from '../components/common/Card';

const About = () => {
  const { content } = useContent();
  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div className="container mx-auto max-w-5xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            About Me
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
        </motion.div>

        {/* Professional Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
              Professional Overview
            </h2>
            <p className="text-primary/70 leading-relaxed text-lg">
              {content.bio.full}
            </p>
          </Card>
        </motion.div>

        {/* Education */}
        <Education />

        {/* Skills */}
        <Skills />

        {/* Experience */}
        <Experience />

        {/* Interests */}
        <Interests />
      </div>
    </div>
  );
};

export default About;
