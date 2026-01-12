import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';
import Card from '../common/Card';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card hover className="h-full flex flex-col">
        {project.image && (
          <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-secondary/30">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-serif font-semibold text-primary">
              {project.title}
            </h3>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/60 hover:text-primary transition-colors"
                aria-label={`View ${project.title}`}
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
          {project.date && (
            <div className="flex items-center text-sm text-primary/60 mb-3">
              <Calendar size={14} className="mr-1" />
              <span>{project.date}</span>
            </div>
          )}
          <p className="text-primary/70 mb-4 text-sm leading-relaxed">
            {project.description}
          </p>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-secondary/50 text-primary rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
