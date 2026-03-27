import { motion } from 'motion/react';
import { useState } from 'react';
import { Briefcase, Check } from 'lucide-react';

interface ExperienceSectionProps {
  onScoreIncrease: (points: number, actionId: string) => void;
}

export function ExperienceSection({ onScoreIncrease }: ExperienceSectionProps) {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const [completedExperiences, setCompletedExperiences] = useState<Set<number>>(new Set());

  const experiences = [
    {
      id: 0,
      company: 'Goldman Sachs',
      role: 'Private Equity Analyst',
      period: 'June 2025 - August 2025',
      tech: 'Python',
      achievements: [
        'Developed high-throughput Python data pipeline to ingest and parse PE mandate and GP reports',
        'Converted unstructured PDFs into structured datasets for investment monitoring',
        'Reduced manual data-processing latency by 40%',
        'Accelerated capital allocation decisions through automated workflows',
      ],
    },
    {
      id: 1,
      company: 'INSITE Lab',
      role: 'Full-stack Web Developer',
      period: 'September 2025 - Present',
      tech: 'Figma, React, Unity, Docker',
      achievements: [
        'Designed and developed web platform for virtual walkthrough of Allen Island',
        'Automated deployment of containerized backend microservices via Docker',
        'Managed spatial data pipelines for GIS and LiDAR object datasets',
        'Reduced spatial data processing bottlenecks by 25%',
        'Implemented system telemetry and performance metrics',
      ],
    },
  ];

  const handleExperienceClick = (id: number) => {
    setSelectedExperience(selectedExperience === id ? null : id);
    if (!completedExperiences.has(id)) {
      setCompletedExperiences(new Set([...completedExperiences, id]));
      onScoreIncrease(20, `experience-${id}`);
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
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl md:text-7xl text-[#e9c349] mb-3 md:mb-4 display-text">Work Experience</h1>
          <p className="text-base md:text-xl text-[#d3c5ad] ml-4 md:ml-8">
            Explore my professional journey 💼
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
          {experiences.map((exp, index) => {
            const isSelected = selectedExperience === exp.id;
            const isCompleted = completedExperiences.has(exp.id);

            return (
              <motion.div
                key={exp.id}
                className="relative"
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
              >
                <motion.div
                  className="rounded-3xl overflow-hidden cursor-pointer"
                  style={{
                    background: 'rgba(81, 20, 19, 0.4)',
                    backdropFilter: 'blur(20px)',
                    border: isCompleted ? '1px solid rgba(233, 195, 73, 0.3)' : '1px solid rgba(211, 197, 173, 0.15)',
                    boxShadow: '0 20px 40px rgba(49, 0, 2, 0.4)'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    backdropFilter: 'blur(30px)'
                  }}
                  onClick={() => handleExperienceClick(exp.id)}
                >
                  <div style={{ padding: 'var(--spacing-6)' }} className="md:p-8">
                    <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4">
                      <div className="flex-1 w-full md:w-auto">
                        <div className="flex items-center gap-3 md:gap-4 mb-3 flex-wrap">
                          <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-[#e9c349] flex-shrink-0" />
                          <h2 className="text-2xl md:text-4xl text-[#e9c349] display-text">{exp.company}</h2>
                          {isCompleted && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: 'spring' }}
                            >
                              <Check className="w-5 h-5 md:w-6 md:h-6 text-[#e9c349]" />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-lg md:text-2xl text-[#d3c5ad] mb-2">{exp.role}</p>
                        <p className="text-xs md:text-sm text-[#d3c5ad] opacity-70 label-text">{exp.period}</p>
                      </div>

                      <div 
                        className="px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[#310002] text-xs label-text whitespace-nowrap self-start flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, #e9c349 0%, #d4af37 100%)',
                          boxShadow: '0 5px 15px rgba(233, 195, 73, 0.3)'
                        }}
                      >
                        {exp.tech}
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isSelected ? 'auto' : 0,
                        opacity: isSelected ? 1 : 0,
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
                        <h3 className="text-xl text-[#d3c5ad] mb-4">Key Achievements</h3>
                        <div className="space-y-4">
                          {exp.achievements.map((achievement, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start gap-4 rounded-xl"
                              style={{
                                background: '#3d0506',
                                padding: 'var(--spacing-4)'
                              }}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <span className="text-[#e9c349] text-lg mt-0.5">✓</span>
                              <span className="text-[#f5e6d3]">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Click hint */}
                    {!isSelected && (
                      <motion.div
                        className="mt-6 text-center text-[#d3c5ad] text-sm italic"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Click to expand
                      </motion.div>
                    )}
                  </div>

                  {/* Bottom accent */}
                  {isCompleted && (
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
              </motion.div>
            );
          })}
        </div>

        {/* Completion Stats */}
        <motion.div
          className="rounded-2xl"
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
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl text-[#e9c349] mb-2" style={{ fontWeight: 600 }}>{experiences.length}</div>
              <div className="text-sm text-[#d3c5ad] label-text">Total Roles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#e9c349] mb-2" style={{ fontWeight: 600 }}>{completedExperiences.size}</div>
              <div className="text-sm text-[#d3c5ad] label-text">Explored</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#e9c349] mb-2" style={{ fontWeight: 600 }}>
                {Math.round((completedExperiences.size / experiences.length) * 100)}%
              </div>
              <div className="text-sm text-[#d3c5ad] label-text">Complete</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}