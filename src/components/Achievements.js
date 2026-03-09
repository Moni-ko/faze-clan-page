import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const Achievements = ({ achievements }) => {
  return (
    <section id="achievements" className="achievements-section">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        主要荣誉 (Notable Achievements)
      </motion.h2>
      <div className="achievements-grid">
        {achievements.map((item, index) => (
          <motion.div 
            key={index} 
            className="achievement-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <div className="ach-year">{item.year}</div>
            <div className="ach-icon">
              <Trophy size={24} color="var(--primary)" />
            </div>
            <div className="ach-info">
              <h3>{item.title}</h3>
              <p>{item.placement}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
