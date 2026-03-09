import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Calendar } from 'lucide-react';

const Matches = () => {
  const recentMatches = [
    { opponent: "paiN", score: "1 - 2", event: "ESL Pro League S23", result: "loss", date: "2026-03-07", maps: ["Ancient (W)", "Nuke (L)", "Anubis (L)"] },
    { opponent: "G2", score: "0 - 2", event: "ESL Pro League S23", result: "loss", date: "2026-03-06", maps: ["Dust2 (L)", "Inferno (L)"] },
    { opponent: "Astralis", score: "0 - 2", event: "PGL Cluj-Napoca 2026", result: "loss", date: "2026-02-17", maps: ["Mirage (L)", "Nuke (L)"] },
    { opponent: "MOUZ", score: "0 - 2", event: "IEM Krakow 2026", result: "loss", date: "2026-02-03", maps: ["Overpass (L)", "Ancient (L)"] }
  ];

  return (
    <section id="matches" className="matches-section">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Recent Matches
      </motion.h2>
      <div className="matches-list">
        {recentMatches.map((match, index) => (
          <motion.div 
            key={index} 
            className="match-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="match-team">
              <Swords size={24} style={{ color: 'var(--primary)', opacity: 0.6 }} />
              <div className="match-team-info">
                <h4>FaZe vs {match.opponent}</h4>
                <p>{match.event}</p>
                <div className="match-maps">
                  {match.maps.map(map => <span key={map} className="map-tag">{map}</span>)}
                </div>
              </div>
            </div>
            
            <div className="match-score-box">
              {match.score}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div className={`match-status ${match.result}`}>
                {match.result === 'win' ? 'Victory' : 'Defeat'}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
                <Calendar size={12} />
                {match.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Matches;
