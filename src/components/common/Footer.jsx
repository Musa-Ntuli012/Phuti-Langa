import { Link } from 'react-router-dom';
import { Linkedin, Mail } from 'lucide-react';
import { CONTACT_INFO, ROUTES } from '../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-accent py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-serif font-semibold mb-2">Phuti Langa</h3>
            <p className="text-sm text-accent/80">
              BCom Law Graduate | Legal Professional
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center space-x-2 hover:text-secondary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
              <span className="text-sm">Email</span>
            </a>
            <a
              href={CONTACT_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-secondary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-accent/20 text-center text-sm text-accent/60">
          <p>&copy; {currentYear} Phuti Langa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
