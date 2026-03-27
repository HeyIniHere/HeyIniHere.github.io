import { motion } from 'motion/react';
import { useState } from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

interface EducationSectionProps {
  onScoreIncrease: (points: number, actionId: string) => void;
}

export function EducationSection({ onScoreIncrease }: EducationSectionProps) {
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());

  const education = {
    schools: [
      {
        id: 'colby',
        name: 'Colby College',
        location: 'Waterville, ME',
        degree: 'Bachelor of Arts',
        major: 'Computer Science',
        graduation: 'May 2026',
        gpa: '3.8/4.0',
      },
      {
        id: 'dartmouth',
        name: 'Dartmouth College',
        location: 'Hanover, NH',
        degree: 'Bachelor of Engineering',
        major: 'Mechanical Engineering',
        graduation: 'June 2027',
        gpa: '3.8/4.0',
      },
    ],
    awards: [
      'Presidential Scholar (Full-Scholarship)',
      "Dean's List",
    ],
    coursework: [
      'Data Structures & Algorithms',
      'Software Engineering',
      'System Design',
      'Distributed Systems',
      'Machine Learning',
      'Software Security',
      'Data Analysis and Visualization',
      'Theory of Computation',
    ],
  };

  const handleItemClick = (id: string) => {
    if (!selectedCourses.has(id)) {
      setSelectedCourses(new Set([...selectedCourses, id]));
      onScoreIncrease(2, id);
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
          <h1 className="text-4xl md:text-7xl text-[#e9c349] mb-3 md:mb-4 display-text">Education</h1>
          <p className="text-base md:text-xl text-[#d3c5ad] ml-4 md:ml-8">
            Academic journey and achievements 🎓
          </p>
        </motion.div>

        {/* Schools */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {education.schools.map((school, index) => {
            const isExpanded = selectedCourses.has(school.id);
            const isUnlocked = selectedCourses.has(school.id);

            return (
              <motion.div
                key={school.id}
                className="rounded-3xl overflow-hidden cursor-pointer"
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
                  scale: 1.03,
                  backdropFilter: 'blur(30px)'
                }}
                onClick={() => handleItemClick(school.id)}
              >
                <div style={{ padding: 'var(--spacing-8)' }}>
                  <div className="flex items-start gap-4 mb-4">
                    <GraduationCap className="w-10 h-10 text-[#e9c349] flex-shrink-0" />
                    <div className="flex-1">
                      <h2 className="text-3xl text-[#e9c349] mb-2 display-text">{school.name}</h2>
                      <p className="text-[#d3c5ad]">{school.location}</p>
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="space-y-4 pt-6"
                      style={{
                        borderTop: '1px solid rgba(211, 197, 173, 0.15)'
                      }}
                    >
                      <div 
                        className="rounded-xl"
                        style={{
                          background: '#3d0506',
                          padding: 'var(--spacing-4)'
                        }}
                      >
                        <div className="text-[#d3c5ad] mb-1">{school.degree}</div>
                        <div className="text-[#e9c349] text-lg">{school.major}</div>
                      </div>
                      <div 
                        className="flex justify-between rounded-xl"
                        style={{
                          background: '#3d0506',
                          padding: 'var(--spacing-4)'
                        }}
                      >
                        <span className="text-[#d3c5ad]">Graduation:</span>
                        <span className="text-[#e9c349]">{school.graduation}</span>
                      </div>
                      <div 
                        className="flex justify-between rounded-xl"
                        style={{
                          background: '#3d0506',
                          padding: 'var(--spacing-4)'
                        }}
                      >
                        <span className="text-[#d3c5ad]">GPA:</span>
                        <span className="text-[#e9c349]">{school.gpa}</span>
                      </div>
                    </div>
                  </motion.div>

                  {!isExpanded && (
                    <motion.div
                      className="mt-6 text-center text-[#d3c5ad] text-sm italic"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Click to expand
                    </motion.div>
                  )}
                </div>

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

        {/* Awards */}
        <motion.div
          className="rounded-3xl mb-12"
          style={{
            background: 'rgba(81, 20, 19, 0.4)',
            backdropFilter: 'blur(20px)',
            padding: 'var(--spacing-8)',
            border: '1px solid rgba(211, 197, 173, 0.15)',
            boxShadow: '0 20px 40px rgba(49, 0, 2, 0.4)'
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Award className="w-8 h-8 text-[#e9c349]" />
            <h2 className="text-3xl text-[#e9c349] display-text">Awards & Recognition</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {education.awards.map((award, index) => (
              <motion.div
                key={award}
                className="rounded-xl flex items-center gap-4"
                style={{
                  background: '#3d0506',
                  padding: 'var(--spacing-4)',
                  border: '1px solid rgba(233, 195, 73, 0.2)'
                }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  border: '1px solid rgba(233, 195, 73, 0.4)'
                }}
              >
                <span className="text-3xl">🏆</span>
                <span className="text-[#f5e6d3]">{award}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coursework */}
        <motion.div
          className="rounded-3xl"
          style={{
            background: 'rgba(81, 20, 19, 0.4)',
            backdropFilter: 'blur(20px)',
            padding: 'var(--spacing-8)',
            border: '1px solid rgba(211, 197, 173, 0.15)',
            boxShadow: '0 20px 40px rgba(49, 0, 2, 0.4)'
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <BookOpen className="w-8 h-8 text-[#e9c349]" />
            <h2 className="text-3xl text-[#e9c349] display-text">Relevant Coursework</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {education.coursework.map((course, index) => (
              <motion.div
                key={course}
                className="rounded-xl text-center text-[#f5e6d3] cursor-pointer"
                style={{
                  background: '#3d0506',
                  padding: 'var(--spacing-4)',
                  border: '1px solid rgba(211, 197, 173, 0.15)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ 
                  scale: 1.05,
                  border: '1px solid rgba(233, 195, 73, 0.3)',
                  backgroundColor: '#4a0c0f'
                }}
                onClick={() => {
                  if (!selectedCourses.has(course)) {
                    setSelectedCourses(new Set([...selectedCourses, course]));
                    onScoreIncrease(2, course);
                  }
                }}
              >
                {course}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
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
          transition={{ delay: 0.6 }}
        >
          <div className="grid grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl text-[#e9c349] mb-2" style={{ fontWeight: 600 }}>2</div>
              <div className="text-sm text-[#d3c5ad] label-text">Degrees</div>
            </div>
            <div>
              <div className="text-4xl text-[#e9c349] mb-2" style={{ fontWeight: 600 }}>3.8</div>
              <div className="text-sm text-[#d3c5ad] label-text">GPA</div>
            </div>
            <div>
              <div className="text-4xl text-[#e9c349] mb-2" style={{ fontWeight: 600 }}>{education.coursework.length}</div>
              <div className="text-sm text-[#d3c5ad] label-text">Courses</div>
            </div>
            <div>
              <div className="text-4xl text-[#e9c349] mb-2" style={{ fontWeight: 600 }}>{education.awards.length}</div>
              <div className="text-sm text-[#d3c5ad] label-text">Awards</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}