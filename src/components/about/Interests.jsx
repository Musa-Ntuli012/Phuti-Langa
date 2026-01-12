import { motion } from 'framer-motion';
import { Heart, BookOpen } from 'lucide-react';
import Card from '../common/Card';

const Interests = () => {
  const professionalInterests = [
    'Development Economics',
    'Policy Analysis',
    'Commercial Law',
    'Legal Research',
    // Add more interests as needed
  ];

  const personalInterests = [
    'Reading',
    'Writing',
    // Add more hobbies as needed
  ];

  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Professional Interests */}
          <Card>
            <div className="flex items-center mb-6">
              <BookOpen className="text-primary mr-3" size={28} />
              <h3 className="text-xl font-serif font-semibold text-primary">Professional Interests</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {professionalInterests.map((interest, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </Card>

          {/* Personal Interests */}
          <Card>
            <div className="flex items-center mb-6">
              <Heart className="text-primary mr-3" size={28} />
              <h3 className="text-xl font-serif font-semibold text-primary">Personal Interests</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {personalInterests.map((interest, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 bg-secondary/50 text-primary rounded-full text-sm font-medium"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </section>
  );
};

export default Interests;
