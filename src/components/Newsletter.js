import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

const Newsletter = () => {
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success'
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        
        // Reset back to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Subscription failed. Please try again later.");
      setStatus('idle');
    }
  };

  return (
    <section className="newsletter-section">
      <motion.div 
        className="newsletter-container"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="newsletter-content">
          <div className="fan-badge">FAN ZONE</div>
          <h2>Join the Clan</h2>
          <p>Get the latest news, match reminders, and exclusive content delivered directly to your inbox.</p>
          
          <div className="newsletter-form-container">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success-message"
                  className="subscription-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <CheckCircle2 size={40} color="#4ade80" />
                  <h3>Welcome to the Clan!</h3>
                  <p>Check your inbox for a confirmation email.</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="subscription-form"
                  className="newsletter-form" 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="input-group">
                    <Mail className="input-icon" size={20} />
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      disabled={status === 'loading'}
                    />
                  </div>
                  <motion.button 
                    type="submit" 
                    className={`subscribe-btn ${status === 'loading' ? 'loading' : ''}`}
                    whileHover={status !== 'loading' ? { x: 5 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.95 } : {}}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <span key="loading-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Loader2 size={18} className="spin-icon" /> <span>Subscribing...</span>
                      </span>
                    ) : (
                      <span key="idle-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>Subscribe Now</span> <ArrowRight size={18} />
                      </span>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          
          <div className="newsletter-footer">
            <span>By subscribing, you agree to our <a href="#">Privacy Policy</a>.</span>
          </div>
        </div>
        
        <div className="newsletter-decor">
          <div className="decor-circle circle-1" />
          <div className="decor-circle circle-2" />
          <div className="decor-circle circle-3" />
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
