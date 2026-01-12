import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Briefcase, FileText, Mail } from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import Card from '../common/Card';

const NavigationCards = () => {
  const cards = [
    {
      title: 'About Me',
      description: 'Learn about my background, education, and professional journey',
      icon: User,
      path: ROUTES.ABOUT,
      color: 'text-primary',
    },
    {
      title: 'Showcase',
      description: 'Explore my projects, research, and professional achievements',
      icon: Briefcase,
      path: ROUTES.SHOWCASE,
      color: 'text-primary',
    },
    {
      title: 'CV',
      description: 'Download or view my comprehensive curriculum vitae',
      icon: FileText,
      path: ROUTES.CV,
      color: 'text-primary',
    },
    {
      title: 'Get in Touch',
      description: 'Connect with me for opportunities and collaborations',
      icon: Mail,
      path: ROUTES.CONTACT,
      color: 'text-primary',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Link to={card.path} className="block h-full">
                  <Card hover className="h-full flex flex-col items-center text-center group">
                    <div className={`mb-4 ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={48} />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-primary/70 leading-relaxed">
                      {card.description}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default NavigationCards;
