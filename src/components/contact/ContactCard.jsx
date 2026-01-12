import { motion } from 'framer-motion';
import Card from '../common/Card';

const ContactCard = ({ icon: Icon, title, content, href, onClick }) => {
  const CardContent = (
    <Card hover className="h-full text-center group cursor-pointer" onClick={onClick}>
      <div className="flex flex-col items-center">
        <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
          <Icon size={48} />
        </div>
        <h3 className="text-xl font-serif font-semibold text-primary mb-2">
          {title}
        </h3>
        <p className="text-primary/70 text-sm">{content}</p>
      </div>
    </Card>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        className="block h-full"
      >
        {CardContent}
      </motion.a>
    );
  }

  return <div className="h-full">{CardContent}</div>;
};

export default ContactCard;
