import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, MessageCircle, Send } from 'lucide-react';

interface FeedbackButtonProps {
  email: string;
}

export function FeedbackButton({ email }: FeedbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with pre-filled content
    const subject = encodeURIComponent(`Portfolio Feedback from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <>
      {/* Feedback Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Feedback Form */}
            <motion.div
              className="fixed bottom-20 right-4 left-4 md:bottom-6 md:right-6 md:left-auto w-auto md:w-[420px] max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-120px)] z-[70] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              style={{
                background: 'rgba(81, 20, 19, 0.95)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(233, 195, 73, 0.2)',
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-[#e9c349]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-[#e9c349]" />
                  <h3 className="text-lg text-[#e9c349]" style={{ fontWeight: 600 }}>
                    Leave Feedback
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#d3c5ad] hover:text-[#e9c349] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-5 overflow-y-auto">
                {!submitted ? (
                  <>
                    {/* Email Display */}
                    <div className="mb-5 p-3 rounded-lg bg-[#310002]/40 border border-[#e9c349]/10">
                      <div className="flex items-center gap-2 text-sm text-[#d3c5ad] mb-1">
                        <Mail className="w-4 h-4 text-[#e9c349]" />
                        <span className="label-text">Contact Email</span>
                      </div>
                      <a
                        href={`mailto:${email}`}
                        className="text-[#e9c349] hover:underline text-sm"
                      >
                        {email}
                      </a>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm text-[#d3c5ad] label-text mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#310002]/40 border border-[#e9c349]/20 text-[#e9c349] placeholder-[#d3c5ad]/50 focus:outline-none focus:border-[#e9c349]/50 transition-colors"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-[#d3c5ad] label-text mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#310002]/40 border border-[#e9c349]/20 text-[#e9c349] placeholder-[#d3c5ad]/50 focus:outline-none focus:border-[#e9c349]/50 transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-[#d3c5ad] label-text mb-2">
                          Message
                        </label>
                        <textarea
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#310002]/40 border border-[#e9c349]/20 text-[#e9c349] placeholder-[#d3c5ad]/50 focus:outline-none focus:border-[#e9c349]/50 transition-colors resize-none"
                          placeholder="Share your feedback, questions, or opportunities..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        className="w-full px-6 py-3 rounded-lg bg-[#e9c349] text-[#310002] flex items-center justify-center gap-2 transition-all"
                        style={{ fontWeight: 600 }}
                        whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(233, 195, 73, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 bg-[#e9c349]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">✨</span>
                    </div>
                    <h4 className="text-[#e9c349] text-lg mb-2" style={{ fontWeight: 600 }}>
                      Thank you!
                    </h4>
                    <p className="text-[#d3c5ad] text-sm">
                      Opening your email client...
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center group"
        style={{
          background: 'linear-gradient(135deg, #e9c349 0%, #d4af37 100%)',
          boxShadow: '0 10px 30px rgba(233, 195, 73, 0.4)',
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ 
          scale: 1.1, 
          boxShadow: '0 15px 40px rgba(233, 195, 73, 0.6)',
        }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="message"
              initial={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-[#310002]" />
            </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 md:w-7 md:h-7 text-[#310002]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Animation */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'rgba(233, 195, 73, 0.4)',
            }}
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.7, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        )}
      </motion.button>
    </>
  );
}