import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import ProjectCard from './ProjectCard';

const ProjectGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { content } = useContent();
  const projects = content.projects;

  const categories = ['All', 'Academic Projects', 'Research', 'Writing Samples', 'Presentations', 'Certifications'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div>
      {/* Filter Buttons */}
      {projects.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === category
                  ? 'bg-primary text-accent'
                  : 'bg-secondary/50 text-primary hover:bg-secondary/70'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="bg-secondary/30 rounded-lg p-12 max-w-md mx-auto">
            <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
              Projects Coming Soon
            </h3>
            <p className="text-primary/70">
              I'm currently working on exciting projects that will be showcased here soon.
              Check back later to see my work!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectGrid;
