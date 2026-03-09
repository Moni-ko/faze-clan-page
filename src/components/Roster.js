import React from 'react';
import { motion } from 'framer-motion';
import { Target, Flag, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Roster = ({ players }) => {
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

  return (
    <section id="roster" className="roster-section">
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
        {players.map((player, index) => {
          const stats = getStats(player.alias);
          return (
            <Link to={`/player/${player.alias}`} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
              <motion.div 
                className="player-card" 
                variants={itemVariants}
                whileHover={{ y: -10, borderColor: 'var(--primary)' }}
              >
                <div className="player-alias">{player.alias}</div>
                <div className="player-name">{player.name}</div>
                <div className="player-details">
                  <span className="role"><Target size={14} style={{ marginRight: 8, color: 'var(--primary)' }} /> {player.role}</span>
                  <span className="country"><Flag size={14} style={{ marginRight: 8, color: 'var(--primary)' }} /> {player.country}</span>
                </div>
                
                <div className="stats-bars">
                  <div className="stat-row">
                    <span className="stat-label">Aim</span>
                    <div className="stat-bar-container">
                      <motion.div 
                        className="stat-bar-fill" 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stats.aim}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <span className="stat-value">{stats.aim}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Strategy</span>
                    <div className="stat-bar-container">
                      <motion.div 
                        className="stat-bar-fill" 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stats.strategy}%` }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                    </div>
                    <span className="stat-value">{stats.strategy}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Impact</span>
                    <div className="stat-bar-container">
                      <motion.div 
                        className="stat-bar-fill" 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stats.impact}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </div>
                    <span className="stat-value">{stats.impact}</span>
                  </div>
                </div>

                <div className="player-rating" style={{ marginTop: '1.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity size={16} color="var(--primary)" />
                    HLTV Rating 2.0: <strong>{player.rating}</strong>
                  </span>
                </div>
                
                <div className="view-more" style={{ 
                  marginTop: '1rem', 
                  fontSize: '0.8rem', 
                  color: 'var(--primary)', 
                  fontWeight: 700,
                  textAlign: 'right',
                  opacity: 0.8
                }}>
                  查看详情 →
                </div>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Roster;
