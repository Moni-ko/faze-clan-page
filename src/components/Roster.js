import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Skeleton from './Skeleton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const getStats = (alias) => {
  const baseStats = {
    karrigan: { aim: 70, strategy: 98, impact: 85 },
    frozen: { aim: 92, strategy: 80, impact: 94 },
    Twistzz: { aim: 96, strategy: 85, impact: 90 },
    broky: { aim: 94, strategy: 82, impact: 95 },
    jcobbb: { aim: 88, strategy: 70, impact: 82 }
  };
  return baseStats[alias] || { aim: 80, strategy: 80, impact: 80 };
};

const Roster = ({ players, loading }) => {

  return (
    <section id="section-roster" className="roster-section">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        现役阵容 (Active Roster)
      </motion.h2>
      <motion.div 
        className="players-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {loading ? (
          [1, 2, 3, 4, 5].map(i => <Skeleton key={i} type="player" />)
        ) : (
          players.map((player, index) => {
            const stats = getStats(player.alias);
            return (
              <Link to={`/player/${player.alias}`} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div 
                  className="player-card" 
                  variants={itemVariants}
                  whileHover={{ y: -10, borderColor: 'var(--primary)' }}
                >
                  <div className="player-image-container">
                    <img 
                      src={player.image} 
                      alt={player.alias} 
                      className="player-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'assets/faze.jpg'; // Fallback to team logo
                      }}
                    />
                  </div>
                  <div className="player-alias" translate="no">{player.alias}</div>
                  <div className="player-name" translate="no">{player.name}</div>
                  <div className="player-role">{player.role}</div>
                  <div className="player-mini-stats">
                    <div className="mini-stat">
                      <span className="label">AIM</span>
                      <div className="bar-bg"><motion.div initial={{ width: 0 }} whileInView={{ width: `${stats.aim}%` }} className="bar-fill" /></div>
                    </div>
                    <div className="mini-stat">
                      <span className="label">STRAT</span>
                      <div className="bar-bg"><motion.div initial={{ width: 0 }} whileInView={{ width: `${stats.strategy}%` }} className="bar-fill" /></div>
                    </div>
                    <div className="mini-stat">
                      <span className="label">IMPACT</span>
                      <div className="bar-bg"><motion.div initial={{ width: 0 }} whileInView={{ width: `${stats.impact}%` }} className="bar-fill" /></div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })
        )}
      </motion.div>
    </section>
  );
};

export default Roster;
