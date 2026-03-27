import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { Navigation } from './components/Navigation';
import { FeedbackButton } from './components/FeedbackButton';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [achievementScore, setAchievementScore] = useState(0);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const sections = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'activities', label: 'Activities', icon: '🏆' },
  ];

  const incrementScore = (points: number, actionId: string) => {
    if (!completedActions.has(actionId)) {
      setAchievementScore(prev => Math.min(prev + points, 100));
      setCompletedActions(prev => new Set([...prev, actionId]));
    }
  };

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    // Award points for visiting each section (except hero which is the starting point)
    if (sectionId !== 'hero') {
      incrementScore(10, `visit-${sectionId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#310002] overflow-hidden">
      {/* Radial Gradient Spotlight Background */}
      <div className="fixed inset-0 opacity-40">
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, #5e1b1f 0%, #310002 60%)'
          }} 
        />
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #e9c349 2%, transparent 0%), 
                           radial-gradient(circle at 75px 75px, #e9c349 1%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Achievement Score */}
      <motion.div
        className="fixed top-20 right-4 md:top-24 md:right-6 z-50 rounded-xl md:rounded-2xl shadow-xl"
        style={{
          background: 'rgba(81, 20, 19, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(211, 197, 173, 0.15)',
          boxShadow: '0 20px 40px rgba(49, 0, 2, 0.4)'
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <div className="px-3 py-2 md:px-6 md:py-4 flex items-center gap-2 md:gap-3">
          <span className="text-lg md:text-2xl">✨</span>
          <div>
            <div className="text-xs text-[#d3c5ad] label-text">Points</div>
            <motion.div
              className="text-xl md:text-2xl text-[#e9c349]"
              style={{ fontWeight: 600 }}
              key={achievementScore}
              initial={{ scale: 1.5, color: '#e9c349' }}
              animate={{ scale: 1, color: '#e9c349' }}
            >
              {achievementScore}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <Navigation
        sections={sections}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <div className="relative z-10 pt-16 md:pt-20">
        <AnimatePresence mode="wait">
          {activeSection === 'hero' && (
            <Hero key="hero" onContinue={() => setActiveSection('skills')} onScoreIncrease={incrementScore} />
          )}
          {activeSection === 'skills' && (
            <SkillsSection key="skills" onScoreIncrease={incrementScore} />
          )}
          {activeSection === 'projects' && (
            <ProjectsSection key="projects" onScoreIncrease={incrementScore} />
          )}
          {activeSection === 'experience' && (
            <ExperienceSection key="experience" onScoreIncrease={incrementScore} />
          )}
          {activeSection === 'education' && (
            <EducationSection key="education" onScoreIncrease={incrementScore} />
          )}
          {activeSection === 'activities' && (
            <ActivitiesSection key="activities" onScoreIncrease={incrementScore} />
          )}
        </AnimatePresence>
      </div>

      {/* Feedback Button */}
      <FeedbackButton email="your.email@example.com" />
    </div>
  );
}