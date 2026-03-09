import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ teamData }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-glow" />
      
      <motion.img 
        src={teamData.logo} 
        alt={`${teamData.name} Logo`} 
        className="team-logo-hero"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      />
      
      <motion.h1 
        className="team-name"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {teamData.name}
      </motion.h1>
      
      <motion.div 
        className="badge"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        World Ranking #{teamData.worldRanking}
      </motion.div>
      
      <motion.p 
        className="team-desc"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        {teamData.description}
      </motion.p>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 10, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        style={{ 
          marginTop: '4rem', 
          fontSize: '0.7rem', 
          color: 'var(--text-muted)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontWeight: 700
        }}
      >
        Scroll to Explore
      </motion.div>
    </section>
  );
};

export default Hero;
