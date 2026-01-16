import { createContext, useContext, useState, useEffect } from 'react';
import { CONTACT_INFO, PLACEHOLDER_CONTENT } from '../utils/constants';

const ContentContext = createContext();

// Default data structure
const getDefaultData = () => ({
  contactInfo: {
    email: CONTACT_INFO.email,
    linkedin: CONTACT_INFO.linkedin,
    phone: CONTACT_INFO.phone || '',
    location: CONTACT_INFO.location || '',
  },
  bio: {
    short: PLACEHOLDER_CONTENT.bio,
    full: PLACEHOLDER_CONTENT.fullBio,
  },
  education: [
    {
      degree: 'Bachelor of Commerce in Law (BCom Law)',
      institution: 'University Name',
      period: '2020 - 2024',
      description: 'Focused on commercial law, legal principles, and business applications of law.',
      achievements: [
        "Dean's List",
        'Relevant coursework in contract law, commercial law, and policy analysis',
      ],
    },
  ],
  experience: [
    {
      title: 'Legal Intern',
      organization: 'Law Firm Name',
      period: '2023 - 2024',
      type: 'Internship',
      description: 'Assisted with legal research, document preparation, and client consultations.',
      achievements: [
        'Conducted comprehensive legal research on commercial law cases',
        'Prepared legal documents and briefs',
        'Supported senior attorneys in client meetings',
      ],
    },
  ],
  skills: {
    technical: [
      { name: 'Legal Research & Analysis', level: 90 },
      { name: 'Policy Development', level: 85 },
      { name: 'Contract Law', level: 80 },
      { name: 'Commercial Law', level: 75 },
    ],
    soft: [
      'Communication',
      'Critical Thinking',
      'Problem Solving',
      'Analytical Reasoning',
      'Team Collaboration',
      'Time Management',
    ],
  },
  interests: {
    professional: [
      'Development Economics',
      'Policy Analysis',
      'Commercial Law',
      'Legal Research',
    ],
    personal: [
      'Reading',
      'Writing',
    ],
  },
  projects: [],
});

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(getDefaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioContent');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setContent(parsed);
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever content changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('portfolioContent', JSON.stringify(content));
    }
  }, [content, isLoaded]);

  const updateContactInfo = (data) => {
    setContent(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, ...data },
    }));
  };

  const updateBio = (data) => {
    setContent(prev => ({
      ...prev,
      bio: { ...prev.bio, ...data },
    }));
  };

  const addEducation = (edu) => {
    setContent(prev => ({
      ...prev,
      education: [...prev.education, edu],
    }));
  };

  const updateEducation = (index, edu) => {
    setContent(prev => ({
      ...prev,
      education: prev.education.map((item, i) => i === index ? edu : item),
    }));
  };

  const deleteEducation = (index) => {
    setContent(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addExperience = (exp) => {
    setContent(prev => ({
      ...prev,
      experience: [...prev.experience, exp],
    }));
  };

  const updateExperience = (index, exp) => {
    setContent(prev => ({
      ...prev,
      experience: prev.experience.map((item, i) => i === index ? exp : item),
    }));
  };

  const deleteExperience = (index) => {
    setContent(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const updateSkills = (type, skills) => {
    setContent(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: skills,
      },
    }));
  };

  const updateInterests = (type, interests) => {
    setContent(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [type]: interests,
      },
    }));
  };

  const addProject = (project) => {
    setContent(prev => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const updateProject = (index, project) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.map((item, i) => i === index ? project : item),
    }));
  };

  const deleteProject = (index) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const resetToDefaults = () => {
    setContent(getDefaultData());
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContactInfo,
        updateBio,
        addEducation,
        updateEducation,
        deleteEducation,
        addExperience,
        updateExperience,
        deleteExperience,
        updateSkills,
        updateInterests,
        addProject,
        updateProject,
        deleteProject,
        resetToDefaults,
        isLoaded,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};
