import { motion } from 'motion/react';

interface NavigationProps {
  sections: Array<{ id: string; label: string; icon: string }>;
  activeSection: string;
  onSectionChange: (id: string) => void;
}

export function Navigation({ sections, activeSection, onSectionChange }: NavigationProps) {
  return (
    <>
      {/* Desktop Navigation - Top Bar */}
      <motion.nav
        className="hidden md:block fixed top-0 left-0 right-0 z-40 px-6 py-4"
        style={{
          background: 'rgba(81, 20, 19, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(211, 197, 173, 0.15)',
          boxShadow: '0 10px 30px rgba(49, 0, 2, 0.4)'
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-3">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <motion.button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`relative group px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#e9c349] text-white'
                    : 'bg-transparent text-[#e9c349]'
                }`}
                style={{
                  border: isActive ? 'none' : '1px solid rgba(211, 197, 173, 0.15)',
                }}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: isActive ? '#e9c349' : 'rgba(81, 20, 19, 0.4)',
                  backdropFilter: 'blur(30px)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{section.icon}</span>
                <span className="text-sm label-text whitespace-nowrap">{section.label}</span>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Navigation - Bottom Bar */}
      <motion.nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe"
        style={{
          background: 'rgba(81, 20, 19, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(211, 197, 173, 0.15)',
          boxShadow: '0 -10px 30px rgba(49, 0, 2, 0.4)'
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-around items-center px-2 py-3">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <motion.button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#e9c349] text-[#310002]'
                    : 'bg-transparent text-[#e9c349]'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-xl">{section.icon}</span>
                <span className="text-xs label-text" style={{ fontSize: '0.65rem' }}>
                  {section.label}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#310002] rounded-full"
                    layoutId="mobileActiveIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                      boxShadow: '0 0 8px rgba(49, 0, 2, 0.8)'
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}