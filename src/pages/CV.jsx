import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Calendar, ExternalLink, AlertCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Card from '../components/common/Card';

const CV = () => {
  const { content } = useContent();
  const [cvData, setCvData] = useState(content.cv || {});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await fetch('/api/upload-cv');
        const result = await response.json();
        if (result.success && result.data) {
          setCvData({
            url: result.data.url,
            filename: result.data.filename,
            lastUpdated: new Date(result.data.uploadedAt).toLocaleDateString('en-ZA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          });
        } else if (content.cv?.url) {
          setCvData(content.cv);
        }
      } catch {
        if (content.cv?.url) {
          setCvData(content.cv);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCV();
  }, [content.cv]);

  const hasCV = !!cvData?.url;

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
          {cvData?.lastUpdated && (
            <div className="flex items-center justify-center text-primary/60 text-sm">
              <Calendar size={16} className="mr-2" />
              <span>Last updated: {cvData.lastUpdated}</span>
            </div>
          )}
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
                    {hasCV ? 'Download My CV' : 'CV Coming Soon'}
                  </h2>
                  <p className="text-sm text-primary/70">
                    {hasCV
                      ? 'Get a comprehensive overview of my qualifications and experience'
                      : 'My CV is currently being prepared. Please check back soon.'
                    }
                  </p>
                </div>
              </div>
              {hasCV && (
                <div className="flex gap-3">
                  <a
                    href={cvData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-accent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <ExternalLink size={20} />
                    Open
                  </a>
                  <a
                    href={cvData.url}
                    download={cvData.filename || 'Phuti-Langa-CV.pdf'}
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium bg-primary text-accent rounded-lg hover:bg-primary/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Download size={20} />
                    Download
                  </a>
                </div>
              )}
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
            {isLoading ? (
              <div className="bg-secondary/20 rounded-lg p-8 min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-primary/60">Loading CV...</p>
                </div>
              </div>
            ) : hasCV ? (
              <div className="rounded-lg overflow-hidden border border-secondary/30">
                <iframe
                  src={`${cvData.url}#toolbar=1&navpanes=0`}
                  title="CV Preview"
                  className="w-full"
                  style={{ height: '800px' }}
                />
              </div>
            ) : (
              <div className="bg-secondary/20 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle className="text-primary/30 mx-auto mb-4" size={48} />
                  <p className="text-primary/60 mb-2">No CV uploaded yet</p>
                  <p className="text-sm text-primary/40">
                    The CV will be available for preview and download once uploaded through the admin panel.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-primary/60">
            Need a different format?{' '}
            <a
              href={content.contactInfo?.email ? `mailto:${content.contactInfo.email}` : '#'}
              className="text-primary hover:underline"
            >
              Contact me
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CV;
