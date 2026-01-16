import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import Card from '../common/Card';

const Experience = () => {
  const { content } = useContent();
  const experiences = content.experience;

  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-6">
          <Briefcase className="text-primary mr-3" size={32} />
          <h2 className="text-3xl font-serif font-semibold text-primary">Experience</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-secondary/30 hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-accent hidden md:block" />

                <div className="ml-0 md:ml-16">
                  <Card>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <span className="text-xs text-primary/60 bg-secondary/50 px-2 py-1 rounded mb-2 inline-block">
                          {exp.type}
                        </span>
                        <h3 className="text-xl font-serif font-semibold text-primary mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-primary/80 font-medium">
                          {exp.organization}
                        </p>
                      </div>
                      <span className="text-sm text-primary/60 mt-2 md:mt-0">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-primary/70 mb-4">{exp.description}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-primary/70">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm">{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {experiences.length === 0 && (
          <Card>
            <p className="text-primary/70 text-center py-8">
              Experience entries will be added here.
            </p>
          </Card>
        )}
      </motion.div>
    </section>
  );
};

export default Experience;
