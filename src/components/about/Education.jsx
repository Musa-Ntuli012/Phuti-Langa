import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import Card from '../common/Card';

const Education = () => {
  const education = [
    {
      degree: 'Bachelor of Commerce in Law (BCom Law)',
      institution: 'University Name', // TODO: Replace with actual institution
      period: '2020 - 2024', // TODO: Replace with actual dates
      description: 'Focused on commercial law, legal principles, and business applications of law.',
      achievements: [
        'Dean\'s List',
        'Relevant coursework in contract law, commercial law, and policy analysis',
      ],
    },
    // Add more education entries as needed
  ];

  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-6">
          <GraduationCap className="text-primary mr-3" size={32} />
          <h2 className="text-3xl font-serif font-semibold text-primary">Education</h2>
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-primary mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-primary/80 font-medium">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="text-sm text-primary/60 mt-2 md:mt-0">
                    {edu.period}
                  </span>
                </div>
                <p className="text-primary/70 mb-4">{edu.description}</p>
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-primary/70">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm">{achievement}</li>
                    ))}
                  </ul>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
