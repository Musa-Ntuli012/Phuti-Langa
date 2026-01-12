import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  onClick,
  ...props 
}) => {
  const baseStyles = 'bg-accent rounded-lg shadow-sm border border-secondary/20 p-6';
  
  if (onClick || hover) {
    return (
      <motion.div
        whileHover={hover ? { y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } : {}}
        transition={{ duration: 0.2 }}
        className={`${baseStyles} ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
