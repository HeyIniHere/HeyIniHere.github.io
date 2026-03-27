import { motion } from 'motion/react';
import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

interface ProjectsSectionProps {
  onScoreIncrease: (points: number, actionId: string) => void;
}

export function ProjectsSection({ onScoreIncrease }: ProjectsSectionProps) {
  const [unlockedProjects, setUnlockedProjects] = useState<Set<number>>(new Set());

  const projects = [
    {
      id: 0,
      title: 'Blueprint.edu',
      subtitle: 'Career Roadmap Platform',
      tech: ['VanillaJS', 'PostgreSQL'],
      period: 'February 2026 - Present',
      description: [
        'Architected and deployed a full-stack career roadmap platform for college-specific career data',
        'Developed an AI Mentor agent using LLM integration for personalized career guidance',
        'Designed normalized relational database schema for complex academic-to-career mappings',
      ],
      impact: '20+ beta users',
    },
    {
      id: 1,
      title: 'NextRead',
      subtitle: 'AI Book Recommendation Engine',
      tech: ['React', 'Django', 'PostgreSQL'],
      period: 'December 2025 - Present',
      description: [
        'Architected an agentic recommendation engine with vector embeddings',
        'Built RAG pipeline to ground LLM outputs in curated book metadata',
        'Integrated user feedback signals for adaptive recommendations',
      ],
      impact: 'AI-Powered Discovery',
    },
    {
      id: 2,
      title: 'E-Tracker',
      subtitle: 'Event Analytics System',
      tech: ['Flask', 'JavaScript', 'SQL'],
      period: 'September 2025 - December 2025',
      description: [
        'Collaborated with a team of 4 to develop full-stack event analytics',
        'Designed relational database schema with SQL-Alchemy',
        'Developed scalable RESTful API endpoints for real-time data visualization',
      ],
      impact: 'Team Collaboration',
    },
  ];

  const handleProjectUnlock = (projectId: number) => {
    if (!unlockedProjects.has(projectId)) {
      setUnlockedProjects(new Set([...unlockedProjects, projectId]));
      onScoreIncrease(15, `project-${projectId}`);
    }
  };

  return (
    <motion.div
      className="min-h-screen px-4 md:px-8 pb-24 md:pb-0"
      style={{ paddingTop: 'var(--spacing-12)', paddingBottom: 'var(--spacing-12)' }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl md:text-7xl text-[#e9c349] mb-3 md:mb-4 display-text">Featured Projects</h1>
          <p className="text-base md:text-xl text-[#d3c5ad] ml-4 md:ml-8">
            Click on each project card to unlock details! 🚀
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8">
          {projects.map((project, index) => {
            const isUnlocked = unlockedProjects.has(project.id);
            
            return (
              <motion.div
                key={project.id}
                className="rounded-3xl overflow-hidden cursor-pointer group"
                style={{
                  background: 'rgba(81, 20, 19, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: isUnlocked ? '1px solid rgba(233, 195, 73, 0.3)' : '1px solid rgba(211, 197, 173, 0.15)',
                  boxShadow: '0 20px 40px rgba(49, 0, 2, 0.4)'
                }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.02,
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(233, 195, 73, 0.4)'
                }}
                onClick={() => handleProjectUnlock(project.id)}
              >
                <div style={{ padding: 'var(--spacing-6)' }} className="md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                    <div className="flex-1 w-full md:w-auto">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <h2 className="text-2xl md:text-4xl text-[#e9c349] display-text">{project.title}</h2>
                        <motion.div
                          animate={isUnlocked ? { rotate: 360 } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {isUnlocked ? (
                            <Unlock className="w-5 h-5 md:w-6 md:h-6 text-[#e9c349]" />
                          ) : (
                            <Lock className="w-5 h-5 md:w-6 md:h-6 text-[#d3c5ad]" />
                          )}
                        </motion.div>
                      </div>
                      <p className="text-lg md:text-2xl text-[#d3c5ad] mb-2">{project.subtitle}</p>
                      <p className="text-xs md:text-sm text-[#d3c5ad] opacity-70 label-text">{project.period}</p>
                    </div>
                    
                    <div 
                      className="px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[#310002] text-xs md:text-sm label-text whitespace-nowrap self-start"
                      style={{
                        background: 'linear-gradient(135deg, #e9c349 0%, #d4af37 100%)',
                        boxShadow: '0 5px 15px rgba(233, 195, 73, 0.3)'
                      }}
                    >
                      {project.impact}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex gap-2 md:gap-3 flex-wrap" style={{ marginBottom: 'var(--spacing-4)' }}>
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm"
                        style={{
                          background: '#3d0506',
                          color: '#e9c349',
                          border: '1px solid rgba(233, 195, 73, 0.2)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description - Only shown when unlocked */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isUnlocked ? 'auto' : 0,
                      opacity: isUnlocked ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="pt-6"
                      style={{
                        borderTop: '1px solid rgba(211, 197, 173, 0.15)',
                        marginTop: 'var(--spacing-4)'
                      }}
                    >
                      <ul className="space-y-3">
                        {project.description.map((desc, i) => (
                          <motion.li
                            key={i}
                            className="text-[#f5e6d3] flex items-start gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <span className="text-[#e9c349] mt-1">•</span>
                            <span>{desc}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Unlock hint */}
                  {!isUnlocked && (
                    <motion.div
                      className="mt-6 text-center text-[#d3c5ad] text-sm italic"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Click to unlock project details
                    </motion.div>
                  )}
                </div>

                {/* Bottom accent */}
                {isUnlocked && (
                  <motion.div
                    className="h-1"
                    style={{
                      background: 'linear-gradient(90deg, #e9c349 0%, #d4af37 100%)',
                      boxShadow: '0 0 15px rgba(233, 195, 73, 0.5)'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <motion.div
          className="rounded-2xl text-center"
          style={{
            marginTop: 'var(--spacing-8)',
            background: 'rgba(81, 20, 19, 0.6)',
            backdropFilter: 'blur(20px)',
            padding: 'var(--spacing-6)',
            border: '1px solid rgba(211, 197, 173, 0.15)',
            boxShadow: '0 20px 40px rgba(49, 0, 2, 0.4)'
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-[#d3c5ad] mb-2 label-text text-xs">Projects Unlocked</div>
          <div className="text-5xl text-[#e9c349]" style={{ fontWeight: 600 }}>
            {unlockedProjects.size} / {projects.length}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}