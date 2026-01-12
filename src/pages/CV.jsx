import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Calendar } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const CV = () => {
  const [isLoading, setIsLoading] = useState(false);
  const lastUpdated = 'January 2024'; // TODO: Update with actual date

  const handleDownload = () => {
    setIsLoading(true);
    // TODO: Replace with actual CV file path
    const cvUrl = '/cv/phuti-langa-cv.pdf';
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Phuti-Langa-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div className="container mx-auto max-w-4xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Curriculum Vitae
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          <div className="flex items-center justify-center text-primary/60 text-sm">
            <Calendar size={16} className="mr-2" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </motion.div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <FileText className="text-primary mr-3" size={32} />
                <div>
                  <h2 className="text-xl font-serif font-semibold text-primary">
                    Download My CV
                  </h2>
                  <p className="text-sm text-primary/70">
                    Get a comprehensive overview of my qualifications and experience
                  </p>
                </div>
              </div>
              <Button
                onClick={handleDownload}
                variant="primary"
                size="lg"
                className="flex items-center space-x-2"
                disabled={isLoading}
              >
                <Download size={20} />
                <span>{isLoading ? 'Downloading...' : 'Download CV'}</span>
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* PDF Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <h2 className="text-2xl font-serif font-semibold text-primary mb-6">
              Preview
            </h2>
            <div className="bg-secondary/20 rounded-lg p-8 min-h-[600px] flex items-center justify-center">
              <div className="text-center">
                <FileText className="text-primary/40 mx-auto mb-4" size={64} />
                <p className="text-primary/60 mb-4">
                  CV preview will be displayed here
                </p>
                <p className="text-sm text-primary/50">
                  {/* TODO: Add PDF viewer component or image preview */}
                  PDF preview functionality can be added using react-pdf or an embedded viewer
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Alternative Formats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-primary/60">
            Need a different format?{' '}
            <a href={`mailto:phuti.langa@example.com`} className="text-primary hover:underline">
              Contact me
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CV;
