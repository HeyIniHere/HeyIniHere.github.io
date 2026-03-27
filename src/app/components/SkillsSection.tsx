import { motion } from 'motion/react';
import { useState } from 'react';
import { Code2, Wrench, Star } from 'lucide-react';

interface SkillsSectionProps {
  onScoreIncrease: (points: number, actionId: string) => void;
}

export function SkillsSection({ onScoreIncrease }: SkillsSectionProps) {
  const [unlockedSkills, setUnlockedSkills] = useState<Set<string>>(new Set());

  const skills = {
    languages: [
      { name: 'Python', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'C/C++', level: 80 },
      { name: 'SQL', level: 85 },
      { name: 'R', level: 75 },
      { name: 'C#', level: 70 },
    ],
    frameworks: [
      { name: 'React', level: 90 },
      { name: 'React Native', level: 85 },
      { name: 'Node.js', level: 85 },
      { name: 'Django', level: 80 },
      { name: 'Flask', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 75 },
      { name: 'Git', level: 90 },
    ],
  };

  const handleSkillClick = (skillName: string) => {
    if (!unlockedSkills.has(skillName)) {
      setUnlockedSkills(new Set([...unlockedSkills, skillName]));
      onScoreIncrease(5, skillName);
    }
  };

  const SkillBar = ({ skill }: { skill: { name: string; level: number } }) => {
    const isUnlocked = unlockedSkills.has(skill.name);
    
    return (
      <motion.div
        className="cursor-pointer group"
        style={{ marginBottom: 'var(--spacing-4)' }}
        onClick={() => handleSkillClick(skill.name)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#f5e6d3] flex items-center gap-2">
            {skill.name}
            {isUnlocked && (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring' }}
              >
                <Star className="w-4 h-4 fill-[#e9c349] text-[#e9c349]" />
              </motion.span>
            )}
          </span>
          <span className="text-[#d3c5ad]">{skill.level}%</span>
        </div>
        <div 
          className="h-3 rounded-full overflow-hidden transition-all"
          style={{
            background: '#3d0506',
            border: isUnlocked ? '1px solid rgba(233, 195, 73, 0.3)' : '1px solid rgba(211, 197, 173, 0.1)'
          }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: isUnlocked
                ? 'linear-gradient(90deg, #e9c349 0%, #d4af37 100%)'
                : 'linear-gradient(90deg, #511413 0%, #3d0506 100%)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: 0.1 }}
          />
        </div>
      </motion.div>
    );
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
          <h1 className="text-4xl md:text-7xl text-[#e9c349] mb-3 md:mb-4 display-text">Skills & Abilities</h1>
          <p className="text-base md:text-xl text-[#d3c5ad] ml-4 md:ml-8">
            Click on each skill to unlock achievements! ✨
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Programming Languages */}
          <motion.div
            className="rounded-3xl"
            style={{
              background: 'rgba(81, 20, 19, 0.4)',
              backdropFilter: 'blur(20px)',
              padding: 'var(--spacing-8)',
              border: '1px solid rgba(211, 197, 173, 0.15)',
              boxShadow: '0 20px 40px rgba(49, 0, 2, 0.4)'
            }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Code2 className="w-8 h-8 text-[#e9c349]" />
              <h2 className="text-3xl text-[#e9c349] display-text">Programming Languages</h2>
            </div>
            {skills.languages.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <SkillBar skill={skill} />
              </motion.div>
            ))}
          </motion.div>

          {/* Tools & Frameworks */}
          <motion.div
            className="rounded-3xl"
            style={{
              background: 'rgba(81, 20, 19, 0.4)',
              backdropFilter: 'blur(20px)',
              padding: 'var(--spacing-8)',
              border: '1px solid rgba(211, 197, 173, 0.15)',
              boxShadow: '0 20px 40px rgba(49, 0, 2, 0.4)'
            }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Wrench className="w-8 h-8 text-[#e9c349]" />
              <h2 className="text-3xl text-[#e9c349] display-text">Tools & Frameworks</h2>
            </div>
            {skills.frameworks.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <SkillBar skill={skill} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Achievement Progress */}
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
          <div className="text-[#d3c5ad] mb-2 label-text text-xs">Skills Unlocked</div>
          <div className="text-5xl text-[#e9c349] mb-4" style={{ fontWeight: 600 }}>
            {unlockedSkills.size} / {skills.languages.length + skills.frameworks.length}
          </div>
          <div className="h-4 bg-[#3d0506] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#e9c349] to-[#d4af37]"
              initial={{ width: 0 }}
              animate={{ 
                width: `${(unlockedSkills.size / (skills.languages.length + skills.frameworks.length)) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
              style={{
                boxShadow: '0 0 10px rgba(233, 195, 73, 0.5)'
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}