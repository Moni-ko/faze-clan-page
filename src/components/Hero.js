import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const Hero = ({ teamData }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-glow" />
      
      <motion.img 
        src={teamData?.logo} 
        alt={`${teamData?.name} Logo`} 
        className="team-logo-hero"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      />
      
      <motion.div 
        className="hero-badge"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Trophy size={14} /> 2025 MAJOR FINALIST
      </motion.div>

      <motion.h1 
        className="hero-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {teamData?.name}
      </motion.h1>

      <motion.p 
        className="hero-desc"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {teamData?.description}
      </motion.p>

      <motion.div 
        className="hero-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="stat-item">
          <span className="stat-value">#{teamData?.worldRanking}</span>
          <span className="stat-label">WORLD RANKING</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">2010</span>
          <span className="stat-label">ESTABLISHED</span>
        </div>
      </motion.div>

      <motion.div 
        className="hero-scroll-prompt"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to Explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;
