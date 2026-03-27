import { motion } from 'motion/react';
import { useState } from 'react';
import { Trophy, Zap, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ActivitiesSectionProps {
  onScoreIncrease: (points: number, actionId: string) => void;
}

export function ActivitiesSection({ onScoreIncrease }: ActivitiesSectionProps) {
  const [discoveredItems, setDiscoveredItems] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);

  const activities = [
    {
      id: 'figbuild2026',
      title: 'FigBuild 2026',
      subtitle: 'Align AI - UI/UX Designer',
      period: 'March 2026',
      icon: '🎨',
      description: [
        'Architected high-fidelity posture-tracking interface using React and TypeScript',
        'Translated computer vision data into intuitive dashboard',
        'Maintained strict visual hierarchy and grid alignment',
        'Ensured quick user reaction times',
      ],
      badge: 'Design Excellence',
    },
    {
      id: 'netflixFormation',
      title: 'Netflix x Formation',
      subtitle: 'Student Fellow',
      period: 'May 2024 - Present',
      icon: '🎬',
      description: [
        '1 out of 40 students chosen for mentorship program',
        'Mentorship from senior Netflix engineers',
        'Advanced training in system design',
        'Deep dive into relational and non-relational databases',
        'Scalable backend architectures',
      ],
      badge: 'Elite Program',
    },
  ];

  const handleActivityUnlock = (id: string) => {
    if (!discoveredItems.has(id)) {
      setDiscoveredItems(new Set([...discoveredItems, id]));
      onScoreIncrease(25, id);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e9c349', '#d4af37', '#f5e6d3'],
      });

      // Check if all activities are unlocked
      if (discoveredItems.size + 1 === activities.length) {
        setShowCelebration(true);
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#e9c349', '#d4af37', '#f5e6d3'],
        });
      }
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
          <h1 className="text-4xl md:text-7xl text-[#e9c349] mb-3 md:mb-4 display-text">Activities & Leadership</h1>
          <p className="text-base md:text-xl text-[#d3c5ad] ml-4 md:ml-8">
            Special achievements and recognitions 🏆
          </p>
        </motion.div>

        {/* Activities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', marginBottom: 'var(--spacing-8)' }}>
          {activities.map((activity, index) => {
            const isUnlocked = discoveredItems.has(activity.id);

            return (
              <motion.div
                key={activity.id}
                className="relative rounded-3xl overflow-hidden cursor-pointer group"
                style={{
                  background: 'rgba(81, 20, 19, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: isUnlocked ? '1px solid rgba(233, 195, 73, 0.3)' : '1px solid rgba(211, 197, 173, 0.15)',
                  boxShadow: '0 20px 40px rgba(49, 0, 2, 0.4)'
                }}
                initial={{ y: 100, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.1 * index, type: 'spring' }}
                whileHover={{ 
                  scale: 1.02,
                  rotate: 0,
                  backdropFilter: 'blur(30px)'
                }}
                onClick={() => handleActivityUnlock(activity.id)}
              >
                {/* Badge */}
                <motion.div
                  className="absolute -right-12 top-8 px-16 py-2 rotate-45 label-text text-xs shadow-lg z-10"
                  style={{
                    background: 'linear-gradient(135deg, #e9c349 0%, #d4af37 100%)',
                    color: '#310002'
                  }}
                  initial={{ x: 100 }}
                  animate={{ x: isUnlocked ? 0 : 100 }}
                  transition={{ delay: 0.5 }}
                >
                  {activity.badge}
                </motion.div>

                <div style={{ padding: 'var(--spacing-8)' }}>
                  <div className="flex items-start gap-6 mb-6">
                    <motion.div
                      className="text-6xl"
                      animate={isUnlocked ? { rotate: 360 } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {activity.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h2 className="text-4xl text-[#e9c349] mb-3 display-text">{activity.title}</h2>
                      <p className="text-2xl text-[#d3c5ad] mb-2">{activity.subtitle}</p>
                      <p className="text-sm text-[#d3c5ad] opacity-70 label-text">{activity.period}</p>
                    </div>
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
                      <div className="space-y-4">
                        {activity.description.map((desc, i) => (
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
                            <Zap className="w-5 h-5 text-[#e9c349] flex-shrink-0 mt-0.5" />
                            <span className="text-[#f5e6d3]">{desc}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Unlock hint */}
                  {!isUnlocked && (
                    <motion.div
                      className="mt-6 text-center text-[#d3c5ad] text-sm italic flex items-center justify-center gap-2"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Trophy className="w-4 h-4" />
                      Click to unlock this achievement
                    </motion.div>
                  )}
                </div>

                {/* Animated border when unlocked */}
                {isUnlocked && (
                  <motion.div
                    className="h-1"
                    style={{
                      background: 'linear-gradient(90deg, #e9c349 0%, #d4af37 100%)',
                      boxShadow: '0 0 15px rgba(233, 195, 73, 0.5)'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Achievement Summary */}
        <motion.div
          className="rounded-2xl"
          style={{
            background: 'rgba(81, 20, 19, 0.6)',
            backdropFilter: 'blur(20px)',
            padding: 'var(--spacing-8)',
            border: '1px solid rgba(211, 197, 173, 0.15)',
            boxShadow: '0 20px 40px rgba(49, 0, 2, 0.4)'
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <Trophy className="w-12 h-12 text-[#e9c349] mx-auto mb-4" />
            <h3 className="text-3xl text-[#e9c349] mb-3 display-text">Achievement Progress</h3>
            <p className="text-[#d3c5ad]">Unlock all activities to complete your portfolio!</p>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            {activities.map((activity) => {
              const isUnlocked = discoveredItems.has(activity.id);
              return (
                <motion.div
                  key={activity.id}
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: isUnlocked ? '#e9c349' : '#3d0506',
                    border: isUnlocked ? '2px solid #d4af37' : '2px solid rgba(211, 197, 173, 0.15)',
                    boxShadow: isUnlocked ? '0 0 20px rgba(233, 195, 73, 0.4)' : 'none'
                  }}
                  animate={isUnlocked ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {isUnlocked ? (
                    <Star className="w-8 h-8 text-[#310002] fill-[#310002]" />
                  ) : (
                    <div 
                      className="w-8 h-8 rounded-full"
                      style={{
                        border: '2px solid rgba(211, 197, 173, 0.3)'
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <div className="text-5xl text-[#e9c349] mb-3" style={{ fontWeight: 600 }}>
              {discoveredItems.size} / {activities.length}
            </div>
            <div className="text-sm text-[#d3c5ad] mb-6 label-text">Activities Unlocked</div>
            <div className="h-4 bg-[#3d0506] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#e9c349] to-[#d4af37]"
                initial={{ width: 0 }}
                animate={{ width: `${(discoveredItems.size / activities.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                style={{
                  boxShadow: '0 0 15px rgba(233, 195, 73, 0.5)'
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Completion Celebration */}
        {showCelebration && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
              background: 'rgba(49, 0, 2, 0.9)',
              backdropFilter: 'blur(10px)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowCelebration(false)}
          >
            <motion.div
              className="rounded-3xl text-center"
              style={{
                background: 'rgba(81, 20, 19, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '2px solid #e9c349',
                padding: 'var(--spacing-12)',
                boxShadow: '0 30px 60px rgba(49, 0, 2, 0.6)'
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.7 }}
            >
              <Trophy className="w-24 h-24 text-[#e9c349] mx-auto mb-6" />
              <h2 className="text-6xl text-[#e9c349] mb-6 display-text">Congratulations!</h2>
              <p className="text-2xl text-[#d3c5ad] mb-8">
                You've explored all activities and achievements!
              </p>
              <p className="text-[#d3c5ad]">Click anywhere to continue</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}