import { motion } from 'framer-motion';
import { Brain, Users } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import Card from '../common/Card';

const Skills = () => {
  const { content } = useContent();
  const technicalSkills = content.skills.technical;
  const softSkills = content.skills.soft;

  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-serif font-semibold text-primary mb-8">Skills</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <Card>
            <div className="flex items-center mb-6">
              <Brain className="text-primary mr-3" size={28} />
              <h3 className="text-xl font-serif font-semibold text-primary">Technical Skills</h3>
            </div>
            <div className="space-y-4">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-primary">{skill.name}</span>
                    <span className="text-xs text-primary/60">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-primary h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Soft Skills */}
          <Card>
            <div className="flex items-center mb-6">
              <Users className="text-primary mr-3" size={28} />
              <h3 className="text-xl font-serif font-semibold text-primary">Soft Skills</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 bg-secondary/50 text-primary rounded-full text-sm font-medium"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
