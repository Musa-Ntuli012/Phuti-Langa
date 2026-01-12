import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../utils/constants';
import ContactCard from '../components/contact/ContactCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      content: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      content: 'Connect on LinkedIn',
      href: CONTACT_INFO.linkedin,
    },
    ...(CONTACT_INFO.phone ? [{
      icon: Phone,
      title: 'Phone',
      content: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone}`,
    }] : []),
    ...(CONTACT_INFO.location ? [{
      icon: MapPin,
      title: 'Location',
      content: CONTACT_INFO.location,
    }] : []),
  ];

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Let's Connect
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          <p className="text-lg text-primary/70 max-w-2xl mx-auto">
            I'd love to hear from you. Whether you have a question, opportunity, or just want to connect, feel free to reach out.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="w-full sm:w-[280px]"
              >
                <ContactCard {...method} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <h2 className="text-2xl font-serif font-semibold text-primary mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-accent text-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-accent text-primary"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-accent text-primary"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-accent text-primary resize-none"
                  placeholder="Your message here..."
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="lg">
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Response Time */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-primary/60">
            I typically respond within 24-48 hours. For urgent matters, please call or use LinkedIn.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
