import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, LogOut, Save, Plus, Trash2, Edit2, X, Upload, FileText, Loader2, Mail, Eye } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Card from '../components/common/Card';

const ADMIN_PASSWORD = 'Law2026!';

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('contact');
  const [editingIndex, setEditingIndex] = useState(null);
  const { content, isSaving, ...actions } = useContent();

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card>
            <div className="text-center mb-6">
              <Lock className="mx-auto mb-4 text-primary" size={48} />
              <h1 className="text-3xl font-serif font-semibold text-primary mb-2">
                Admin Login
              </h1>
              <p className="text-primary/70">Enter password to access admin panel</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
                  autoFocus
                />
                {error && (
                  <p className="text-red-600 text-sm mt-2">{error}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-accent py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Login
              </button>
            </form>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pt-20 pb-12">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-serif font-semibold text-primary">
                Admin Dashboard
              </h1>
              {isSaving && (
                <p className="text-sm text-primary/70 mt-1 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  Saving changes...
                </p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'contact', label: 'Contact Info' },
              { id: 'bio', label: 'Bio' },
              { id: 'education', label: 'Education' },
              { id: 'experience', label: 'Experience' },
              { id: 'skills', label: 'Skills' },
              { id: 'interests', label: 'Interests' },
              { id: 'projects', label: 'Projects' },
              { id: 'cv', label: 'CV Upload' },
              { id: 'messages', label: 'Messages' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSection(tab.id);
                  setEditingIndex(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === tab.id
                    ? 'bg-primary text-accent'
                    : 'bg-secondary/50 text-primary hover:bg-secondary/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {activeSection === 'contact' && (
            <ContactSection content={content.contactInfo} onUpdate={actions.updateContactInfo} />
          )}
          {activeSection === 'bio' && (
            <BioSection content={content.bio} onUpdate={actions.updateBio} />
          )}
          {activeSection === 'education' && (
            <EducationSection
              items={content.education}
              onAdd={actions.addEducation}
              onUpdate={actions.updateEducation}
              onDelete={actions.deleteEducation}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
            />
          )}
          {activeSection === 'experience' && (
            <ExperienceSection
              items={content.experience}
              onAdd={actions.addExperience}
              onUpdate={actions.updateExperience}
              onDelete={actions.deleteExperience}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
            />
          )}
          {activeSection === 'skills' && (
            <SkillsSection
              skills={content.skills}
              onUpdate={actions.updateSkills}
            />
          )}
          {activeSection === 'interests' && (
            <InterestsSection
              interests={content.interests}
              onUpdate={actions.updateInterests}
            />
          )}
          {activeSection === 'projects' && (
            <ProjectsSection
              projects={content.projects}
              onAdd={actions.addProject}
              onUpdate={actions.updateProject}
              onDelete={actions.deleteProject}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
            />
          )}
          {activeSection === 'cv' && (
            <CVUploadSection
              cv={content.cv}
              onUpdate={actions.updateCV}
            />
          )}
          {activeSection === 'messages' && (
            <MessagesSection />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Contact Section Component
const ContactSection = ({ content, onUpdate }) => {
  const [formData, setFormData] = useState(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    alert('Contact info updated successfully!');
  };

  return (
    <Card>
      <h2 className="text-2xl font-serif font-semibold text-primary mb-6">Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">LinkedIn URL</label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Phone (Optional)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Location (Optional)</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-primary text-accent rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Save size={20} />
          Save Changes
        </button>
      </form>
    </Card>
  );
};

// Bio Section Component
const BioSection = ({ content, onUpdate }) => {
  const [formData, setFormData] = useState(content);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    alert('Bio updated successfully!');
  };

  return (
    <Card>
      <h2 className="text-2xl font-serif font-semibold text-primary mb-6">Bio Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Short Bio (Hero Section)</label>
          <textarea
            value={formData.short}
            onChange={(e) => setFormData({ ...formData, short: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Full Bio (About Page)</label>
          <textarea
            value={formData.full}
            onChange={(e) => setFormData({ ...formData, full: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-primary text-accent rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Save size={20} />
          Save Changes
        </button>
      </form>
    </Card>
  );
};

// Education Section Component
const EducationSection = ({ items, onAdd, onUpdate, onDelete, editingIndex, setEditingIndex }) => {
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    period: '',
    description: '',
    achievements: [],
  });
  const [achievementInput, setAchievementInput] = useState('');

  const handleAdd = () => {
    setFormData({
      degree: '',
      institution: '',
      period: '',
      description: '',
      achievements: [],
    });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(items[index]);
    setEditingIndex(index);
  };

  const handleAddAchievement = () => {
    if (achievementInput.trim()) {
      setFormData({
        ...formData,
        achievements: [...formData.achievements, achievementInput.trim()],
      });
      setAchievementInput('');
    }
  };

  const handleRemoveAchievement = (index) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      onUpdate(editingIndex, formData);
    } else {
      onAdd(formData);
    }
    handleAdd();
    alert('Education entry saved successfully!');
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-semibold text-primary">Education</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-accent rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Add New
        </button>
      </div>

      {editingIndex === null && items.length > 0 && (
        <div className="space-y-4 mb-6">
          {items.map((item, index) => (
            <div key={index} className="border border-primary/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-primary">{item.degree}</h3>
                  <p className="text-primary/70">{item.institution} • {item.period}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 text-primary hover:bg-secondary/50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this education entry?')) {
                        onDelete(index);
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Degree</label>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Institution</label>
          <input
            type="text"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Period</label>
          <input
            type="text"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            placeholder="e.g., 2020 - 2024"
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Achievements</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={achievementInput}
              onChange={(e) => setAchievementInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAchievement())}
              placeholder="Add achievement"
              className="flex-1 px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            />
            <button
              type="button"
              onClick={handleAddAchievement}
              className="px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-secondary/70 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.achievements.map((ach, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-secondary/50 text-primary rounded-full text-sm"
              >
                {ach}
                <button
                  type="button"
                  onClick={() => handleRemoveAchievement(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-primary text-accent rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Save size={20} />
          {editingIndex !== null ? 'Update' : 'Add'} Education Entry
        </button>
        {editingIndex !== null && (
          <button
            type="button"
            onClick={handleAdd}
            className="ml-2 px-6 py-2 bg-secondary text-primary rounded-lg font-medium hover:bg-secondary/70 transition-colors"
          >
            Cancel
          </button>
        )}
      </form>
    </Card>
  );
};

// Experience Section Component
const ExperienceSection = ({ items, onAdd, onUpdate, onDelete, editingIndex, setEditingIndex }) => {
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    period: '',
    type: 'Internship',
    description: '',
    achievements: [],
  });
  const [achievementInput, setAchievementInput] = useState('');

  const handleAdd = () => {
    setFormData({
      title: '',
      organization: '',
      period: '',
      type: 'Internship',
      description: '',
      achievements: [],
    });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(items[index]);
    setEditingIndex(index);
  };

  const handleAddAchievement = () => {
    if (achievementInput.trim()) {
      setFormData({
        ...formData,
        achievements: [...formData.achievements, achievementInput.trim()],
      });
      setAchievementInput('');
    }
  };

  const handleRemoveAchievement = (index) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      onUpdate(editingIndex, formData);
    } else {
      onAdd(formData);
    }
    handleAdd();
    alert('Experience entry saved successfully!');
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-semibold text-primary">Experience</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-accent rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Add New
        </button>
      </div>

      {editingIndex === null && items.length > 0 && (
        <div className="space-y-4 mb-6">
          {items.map((item, index) => (
            <div key={index} className="border border-primary/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs bg-secondary/50 px-2 py-1 rounded mb-2 inline-block text-primary">
                    {item.type}
                  </span>
                  <h3 className="font-semibold text-primary">{item.title}</h3>
                  <p className="text-primary/70">{item.organization} • {item.period}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 text-primary hover:bg-secondary/50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this experience entry?')) {
                        onDelete(index);
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Organization</label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Period</label>
            <input
              type="text"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              placeholder="e.g., 2023 - 2024"
              className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            >
              <option value="Internship">Internship</option>
              <option value="Work">Work</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Leadership">Leadership</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Achievements</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={achievementInput}
              onChange={(e) => setAchievementInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAchievement())}
              placeholder="Add achievement"
              className="flex-1 px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            />
            <button
              type="button"
              onClick={handleAddAchievement}
              className="px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-secondary/70 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.achievements.map((ach, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-secondary/50 text-primary rounded-full text-sm"
              >
                {ach}
                <button
                  type="button"
                  onClick={() => handleRemoveAchievement(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-primary text-accent rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Save size={20} />
          {editingIndex !== null ? 'Update' : 'Add'} Experience Entry
        </button>
        {editingIndex !== null && (
          <button
            type="button"
            onClick={handleAdd}
            className="ml-2 px-6 py-2 bg-secondary text-primary rounded-lg font-medium hover:bg-secondary/70 transition-colors"
          >
            Cancel
          </button>
        )}
      </form>
    </Card>
  );
};

// Skills Section Component
const SkillsSection = ({ skills, onUpdate }) => {
  const [technicalSkills, setTechnicalSkills] = useState(skills.technical);
  const [softSkills, setSoftSkills] = useState(skills.soft);
  const [newTechSkill, setNewTechSkill] = useState({ name: '', level: 50 });
  const [newSoftSkill, setNewSoftSkill] = useState('');

  useEffect(() => {
    setTechnicalSkills(skills.technical);
    setSoftSkills(skills.soft);
  }, [skills]);

  const handleAddTechSkill = () => {
    if (newTechSkill.name.trim()) {
      setTechnicalSkills([...technicalSkills, newTechSkill]);
      setNewTechSkill({ name: '', level: 50 });
    }
  };

  const handleRemoveTechSkill = (index) => {
    setTechnicalSkills(technicalSkills.filter((_, i) => i !== index));
  };

  const handleUpdateTechSkill = (index, skill) => {
    const updated = [...technicalSkills];
    updated[index] = skill;
    setTechnicalSkills(updated);
  };

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim()) {
      setSoftSkills([...softSkills, newSoftSkill.trim()]);
      setNewSoftSkill('');
    }
  };

  const handleRemoveSoftSkill = (index) => {
    setSoftSkills(softSkills.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onUpdate('technical', technicalSkills);
    onUpdate('soft', softSkills);
    alert('Skills updated successfully!');
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-semibold text-primary">Skills</h2>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-accent rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Save size={20} />
          Save All Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Technical Skills */}
        <div>
          <h3 className="text-xl font-serif font-semibold text-primary mb-4">Technical Skills</h3>
          <div className="space-y-4 mb-4">
            {technicalSkills.map((skill, index) => (
              <div key={index} className="border border-primary/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleUpdateTechSkill(index, { ...skill, name: e.target.value })}
                    className="flex-1 px-3 py-1 border border-primary/20 rounded focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent mr-2"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => handleUpdateTechSkill(index, { ...skill, level: parseInt(e.target.value) || 0 })}
                      className="w-20 px-3 py-1 border border-primary/20 rounded focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
                    />
                    <span className="text-sm text-primary/70">%</span>
                    <button
                      onClick={() => handleRemoveTechSkill(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTechSkill.name}
              onChange={(e) => setNewTechSkill({ ...newTechSkill, name: e.target.value })}
              placeholder="Skill name"
              className="flex-1 px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={newTechSkill.level}
              onChange={(e) => setNewTechSkill({ ...newTechSkill, level: parseInt(e.target.value) || 0 })}
              placeholder="Level"
              className="w-24 px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            />
            <button
              onClick={handleAddTechSkill}
              className="px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-secondary/70 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-xl font-serif font-semibold text-primary mb-4">Soft Skills</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {softSkills.map((skill, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-secondary/50 text-primary rounded-full text-sm"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSoftSkill(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSoftSkill())}
              placeholder="Add soft skill"
              className="flex-1 px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            />
            <button
              onClick={handleAddSoftSkill}
              className="px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-secondary/70 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Interests Section Component
const InterestsSection = ({ interests, onUpdate }) => {
  const [professionalInterests, setProfessionalInterests] = useState(interests.professional);
  const [personalInterests, setPersonalInterests] = useState(interests.personal);
  const [newProfInterest, setNewProfInterest] = useState('');
  const [newPersonalInterest, setNewPersonalInterest] = useState('');

  useEffect(() => {
    setProfessionalInterests(interests.professional);
    setPersonalInterests(interests.personal);
  }, [interests]);

  const handleAddProfInterest = () => {
    if (newProfInterest.trim()) {
      setProfessionalInterests([...professionalInterests, newProfInterest.trim()]);
      setNewProfInterest('');
    }
  };

  const handleRemoveProfInterest = (index) => {
    setProfessionalInterests(professionalInterests.filter((_, i) => i !== index));
  };

  const handleAddPersonalInterest = () => {
    if (newPersonalInterest.trim()) {
      setPersonalInterests([...personalInterests, newPersonalInterest.trim()]);
      setNewPersonalInterest('');
    }
  };

  const handleRemovePersonalInterest = (index) => {
    setPersonalInterests(personalInterests.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onUpdate('professional', professionalInterests);
    onUpdate('personal', personalInterests);
    alert('Interests updated successfully!');
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-semibold text-primary">Interests</h2>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-accent rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Save size={20} />
          Save All Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Professional Interests */}
        <div>
          <h3 className="text-xl font-serif font-semibold text-primary mb-4">Professional Interests</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {professionalInterests.map((interest, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-secondary/50 text-primary rounded-full text-sm"
              >
                {interest}
                <button
                  onClick={() => handleRemoveProfInterest(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newProfInterest}
              onChange={(e) => setNewProfInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddProfInterest())}
              placeholder="Add professional interest"
              className="flex-1 px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            />
            <button
              onClick={handleAddProfInterest}
              className="px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-secondary/70 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Personal Interests */}
        <div>
          <h3 className="text-xl font-serif font-semibold text-primary mb-4">Personal Interests</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {personalInterests.map((interest, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-secondary/50 text-primary rounded-full text-sm"
              >
                {interest}
                <button
                  onClick={() => handleRemovePersonalInterest(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPersonalInterest}
              onChange={(e) => setNewPersonalInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPersonalInterest())}
              placeholder="Add personal interest"
              className="flex-1 px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            />
            <button
              onClick={handleAddPersonalInterest}
              className="px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-secondary/70 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Projects Section Component
const ProjectsSection = ({ projects, onAdd, onUpdate, onDelete, editingIndex, setEditingIndex }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: 'Academic Projects',
    tags: [],
    image: '',
    link: '',
  });
  const [tagInput, setTagInput] = useState('');

  const handleAdd = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      category: 'Academic Projects',
      tags: [],
      image: '',
      link: '',
    });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(projects[index]);
    setEditingIndex(index);
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      onUpdate(editingIndex, formData);
    } else {
      onAdd(formData);
    }
    handleAdd();
    alert('Project saved successfully!');
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-semibold text-primary">Projects</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-accent rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Add New
        </button>
      </div>

      {editingIndex === null && projects.length > 0 && (
        <div className="space-y-4 mb-6">
          {projects.map((project, index) => (
            <div key={index} className="border border-primary/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-primary">{project.title}</h3>
                  <p className="text-primary/70 text-sm">{project.category} • {project.date}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 text-primary hover:bg-secondary/50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this project?')) {
                        onDelete(index);
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Date</label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="e.g., 2024"
              className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            >
              <option value="Academic Projects">Academic Projects</option>
              <option value="Research">Research</option>
              <option value="Writing Samples">Writing Samples</option>
              <option value="Presentations">Presentations</option>
              <option value="Certifications">Certifications</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Image URL (Optional)</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Link URL (Optional)</label>
          <input
            type="url"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Add tag"
              className="flex-1 px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-accent"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-secondary/70 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-secondary/50 text-primary rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-primary text-accent rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Save size={20} />
          {editingIndex !== null ? 'Update' : 'Add'} Project
        </button>
        {editingIndex !== null && (
          <button
            type="button"
            onClick={handleAdd}
            className="ml-2 px-6 py-2 bg-secondary text-primary rounded-lg font-medium hover:bg-secondary/70 transition-colors"
          >
            Cancel
          </button>
        )}
      </form>
    </Card>
  );
};

// CV Upload Section Component
const CVUploadSection = ({ cv, onUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentCV, setCurrentCV] = useState(cv);

  useEffect(() => {
    setCurrentCV(cv);
  }, [cv]);

  useEffect(() => {
    const fetchCurrentCV = async () => {
      try {
        const response = await fetch('/api/upload-cv');
        const result = await response.json();
        if (result.success && result.data) {
          const cvData = {
            url: result.data.url,
            filename: result.data.filename,
            lastUpdated: new Date(result.data.uploadedAt).toLocaleDateString('en-ZA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          };
          setCurrentCV(cvData);
          onUpdate(cvData);
        }
      } catch {
        // Blob storage may not be configured yet
      }
    };
    fetchCurrentCV();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF files are allowed.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB.');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        const cvData = {
          url: result.url,
          filename: result.filename,
          lastUpdated: new Date().toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        };
        setCurrentCV(cvData);
        onUpdate(cvData);
        setSuccess(`CV uploaded successfully: ${result.filename}`);
      } else {
        setError(result.error || 'Upload failed. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete the current CV?')) return;

    try {
      const response = await fetch('/api/upload-cv', { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        const emptyCV = { url: '', filename: '', lastUpdated: '' };
        setCurrentCV(emptyCV);
        onUpdate(emptyCV);
        setSuccess('CV deleted successfully.');
        setError('');
      }
    } catch {
      setError('Failed to delete CV.');
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-serif font-semibold text-primary mb-6">CV Management</h2>

      {/* Current CV Info */}
      {currentCV?.url ? (
        <div className="mb-6 p-4 border border-primary/20 rounded-lg bg-secondary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="text-primary" size={24} />
              <div>
                <p className="font-medium text-primary">{currentCV.filename}</p>
                <p className="text-sm text-primary/60">
                  Uploaded: {currentCV.lastUpdated}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={currentCV.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2 text-sm bg-primary text-accent rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Eye size={16} />
                View
              </a>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-6 border-2 border-dashed border-primary/20 rounded-lg text-center">
          <FileText className="mx-auto text-primary/30 mb-2" size={40} />
          <p className="text-primary/60">No CV uploaded yet</p>
        </div>
      )}

      {/* Upload Area */}
      <div className="space-y-4">
        <label className="block">
          <span className="block text-sm font-medium text-primary mb-2">
            {currentCV?.url ? 'Replace CV' : 'Upload CV'} (PDF only, max 10MB)
          </span>
          <div className="relative">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="block w-full text-sm text-primary/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-accent hover:file:bg-primary/90 file:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </label>

        {isUploading && (
          <div className="flex items-center gap-2 text-primary/70">
            <Loader2 size={18} className="animate-spin" />
            <span>Uploading CV...</span>
          </div>
        )}

        {error && (
          <p className="text-red-600 text-sm flex items-center gap-1">
            <X size={14} /> {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 text-sm flex items-center gap-1">
            <Upload size={14} /> {success}
          </p>
        )}
      </div>

      {/* Setup Instructions */}
      <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
        <p className="text-sm text-primary/70">
          <strong>Note:</strong> CV upload requires Vercel Blob Storage. Add{' '}
          <code className="px-1 py-0.5 bg-primary/10 rounded text-xs">BLOB_READ_WRITE_TOKEN</code>{' '}
          to your Vercel project environment variables. You can create a blob store in your Vercel dashboard
          under Storage &rarr; Create Database &rarr; Blob.
        </p>
      </div>
    </Card>
  );
};

// Messages Section Component
const MessagesSection = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contact');
      const result = await response.json();
      if (result.success) {
        setMessages(result.data || []);
      } else {
        setError(result.error || 'Failed to load messages.');
      }
    } catch {
      setError('Failed to load messages. The database may not be configured.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;

    try {
      const response = await fetch('/api/contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.success) {
        setMessages(prev => prev.filter(msg => msg.id !== id));
      }
    } catch {
      setError('Failed to delete message.');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-semibold text-primary">
          Contact Messages
          {messages.length > 0 && (
            <span className="ml-2 text-sm font-sans font-normal bg-primary text-accent px-2 py-0.5 rounded-full">
              {messages.length}
            </span>
          )}
        </h2>
        <button
          onClick={fetchMessages}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-secondary/50 text-primary rounded-lg hover:bg-secondary/70 transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-primary/40" />
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">{error}</p>
          <button
            onClick={fetchMessages}
            className="text-primary underline text-sm"
          >
            Try again
          </button>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="mx-auto text-primary/30 mb-3" size={40} />
          <p className="text-primary/60">No messages yet</p>
          <p className="text-sm text-primary/40 mt-1">Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="border border-primary/20 rounded-lg overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary/10 transition-colors"
                onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-primary truncate">{msg.name}</h3>
                    <span className="text-xs text-primary/50 flex-shrink-0">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-primary/70 truncate">{msg.subject}</p>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(msg.id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {expandedId === msg.id && (
                <div className="px-4 pb-4 border-t border-primary/10 pt-3">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-primary/50">From:</span>{' '}
                    <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">
                      {msg.email}
                    </a>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs font-medium text-primary/50">Subject:</span>{' '}
                    <span className="text-sm text-primary">{msg.subject}</span>
                  </div>
                  <div className="mt-3 p-3 bg-secondary/10 rounded-lg">
                    <p className="text-sm text-primary/80 whitespace-pre-wrap">{msg.message}</p>
                  </div>
                  <div className="mt-3">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <Mail size={14} />
                      Reply via email
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default Admin;
