import React from 'react';
import { motion } from 'framer-motion';

const Timeline = () => {
  const milestones = [
    { year: "2010", title: "FaZe Clan Founded", desc: "Started as a Call of Duty sniping team on YouTube, quickly becoming a global sensation." },
    { year: "2016", title: "Entry into CS:GO", desc: "Acquired the G2 Esports roster, marking their debut in elite Counter-Strike." },
    { year: "2018", title: "Boston Major Finalists", desc: "Participated in one of the most legendary Major finals in history." },
    { year: "2022", title: "PGL Major Antwerp Champions", desc: "Won their first-ever Major title, dominating the 2022 competitive season." },
    { year: "2023", title: "Intel Grand Slam S4", desc: "Became the fourth team in history to complete the prestigious Intel Grand Slam." },
    { year: "2025", title: "Budapest Major Finalists", desc: "Demonstrated top-tier performance in the CS2 era with a Major final appearance." }
  ];

  return (
    <section id="history" className="history-section">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Milestones
      </motion.h2>
      <div className="timeline-container">
        {milestones.map((item, index) => (
          <motion.div 
            key={index} 
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="timeline-dot" />
            <div className="timeline-content">
              <h4><span>{item.year}</span> {item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
