import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onContinue: () => void;
  onScoreIncrease: (points: number, actionId: string) => void;
}

export function Hero({ onContinue, onScoreIncrease }: HeroProps) {
  const [showContent, setShowContent] = useState(false);
  const [hasClickedStart, setHasClickedStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleStartClick = () => {
    if (!hasClickedStart) {
      onScoreIncrease(10, 'start-exploring');
      setHasClickedStart(true);
    }
    onContinue();
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 md:px-8 pb-20 md:pb-0"
      style={{ paddingTop: 'var(--spacing-12)', paddingBottom: 'var(--spacing-12)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl w-full">
        {/* Main Title */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 md:mb-8"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-[#e9c349]" />
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl mb-4 md:mb-6 text-[#e9c349] display-text" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
            Welcome
          </h1>
          
          <motion.div
            className="text-xl md:text-3xl text-[#d3c5ad] ml-4 md:ml-12"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            to my interactive portfolio
          </motion.div>
        </motion.div>

        {/* Intro Card */}
        {showContent && (
          <motion.div
            className="rounded-2xl md:rounded-3xl overflow-hidden"
            style={{
              background: '#511413',
              border: '1px solid rgba(233, 195, 73, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              padding: 'var(--spacing-6)'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-4xl text-[#e9c349] mb-3 md:mb-4 display-text">Computer Science & Engineering Student</h2>
              <p className="text-lg md:text-xl text-[#d3c5ad]">
                Colby College • Dartmouth College
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              {[
                { label: 'GPA', value: '3.8/4.0', icon: '📚' },
                { label: 'Experience', value: '2+ Years', icon: '💼' },
                { label: 'Projects', value: '5+ Major', icon: '🚀' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="rounded-xl md:rounded-2xl text-center"
                  style={{
                    background: '#3d0506',
                    padding: 'var(--spacing-4)',
                    border: '1px solid rgba(233, 195, 73, 0.15)'
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    border: '1px solid rgba(233, 195, 73, 0.4)',
                    backgroundColor: '#4a0c0f',
                    boxShadow: '0 8px 24px rgba(233, 195, 73, 0.15)'
                  }}
                >
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl text-[#e9c349] mb-1 md:mb-2" style={{ fontWeight: 600 }}>{stat.value}</div>
                  <div className="text-xs md:text-sm text-[#d3c5ad] label-text">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-center text-[#f5e6d3] mb-6 md:mb-8 text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Explore my journey through an interactive experience. Click on each section to unlock achievements and discover my work!
            </motion.p>

            <motion.button
              onClick={handleStartClick}
              className="w-full bg-[#e9c349] text-[#310002] rounded-xl flex items-center justify-center gap-3 transition-all"
              style={{ 
                padding: 'var(--spacing-4)',
                fontWeight: 600,
                boxShadow: '0 4px 16px rgba(233, 195, 73, 0.3)'
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 8px 24px rgba(233, 195, 73, 0.5)'
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#e9c349] rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + Math.sin(i) * 20}%`,
              boxShadow: '0 0 10px rgba(233, 195, 73, 0.5)'
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}