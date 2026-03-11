import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Trophy, Activity, TrendingUp, Award } from 'lucide-react';

const SkillRadar = ({ stats }) => {
  const points = [
    { label: 'Aim', val: stats.aim },
    { label: 'Strategy', val: stats.strategy },
    { label: 'Impact', val: stats.impact },
    { label: 'Utility', val: stats.utility },
    { label: 'Consistency', val: stats.consistency },
  ];

  const size = 300;
  const center = size / 2;
  const radius = center * 0.7;

  const getPoint = (index, total, value) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getLabelPoint = (index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = radius + 25;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const polygonPath = points.map((p, i) => {
    const pt = getPoint(i, points.length, p.val);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <div className="radar-container">
      <svg className="radar-svg" viewBox={`0 0 ${size} ${size}`}>
        {/* Grid Circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
          <circle 
            key={scale}
            cx={center} cy={center} r={radius * scale} 
            className="radar-grid" 
          />
        ))}
        {/* Grid Lines */}
        {points.map((_, i) => {
          const pt = getPoint(i, points.length, 100);
          return <line key={i} x1={center} y1={center} x2={pt.x} y2={pt.y} className="radar-grid" />;
        })}
        {/* Polygon */}
        <motion.polygon 
          points={polygonPath}
          className="radar-polygon"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
        {/* Labels */}
        {points.map((p, i) => {
          const pt = getLabelPoint(i, points.length);
          return (
            <text 
              key={i} 
              x={pt.x} y={pt.y} 
              className="radar-label"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {p.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const resolveImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = process.env.PUBLIC_URL || '';
  return `${baseUrl}/${path.startsWith('/') ? path.slice(1) : path}`;
};

// 页面切换动画配置
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 20 }
};

const PlayerDetail = () => {
  const { alias } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    fetch(`http://localhost:5000/api/players/${alias}`)
      .then(res => res.json())
      .then(data => {
        setPlayer(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching player details:", err);
        setLoading(false);
      });
  }, [alias]);

  if (loading) return <div className="loading-screen">Loading player profile...</div>;

  if (!player) return (
    <div className="news-detail-page error">
      <h2>Player not found</h2>
      <Link to="/" className="back-btn"><ArrowLeft size={18} /> Back to Home</Link>
    </div>
  );

  const displayData = player; // Data already contains everything from backend

  return (
    <motion.div 
      className="detail-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <Helmet>
        <title>{player.alias} | FaZe Clan Player Profile</title>
        <meta name="description" content={`Learn more about ${player.fullName} (${player.alias}), ${player.role} for FaZe Clan.`} />
      </Helmet>
      <nav className="navbar">
        <Link to="/#section-roster" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={18} /> 返回主页
        </Link>
        <div className="nav-logo">FAZE {player.alias.toUpperCase()}</div>
      </nav>

      <div className="detail-container">
        <header className="detail-hero">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="detail-player-image-wrapper"
          >
            <img 
              src={resolveImageUrl(player.image)} 
              alt={player.alias} 
              className="detail-player-image" 
              onError={(e) => {
                e.target.src = 'assets/faze.jpg';
              }}
            />
            <div className="image-overlay-glow" />
          </motion.div>

          <div className="detail-hero-content">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="detail-header-info"
            >
              <div className="detail-badge">PRO PLAYER • FAZE CLAN</div>
              <h1 className="detail-alias">{player.alias}</h1>
              <p className="detail-fullname">{displayData.fullName}</p>
              <div className="detail-meta">
                <span className="meta-item">{player.country}</span>
                <span className="meta-sep">•</span>
                <span className="meta-item">{player.role}</span>
                <span className="meta-sep">•</span>
                <span className="meta-item">{displayData.totalWinnings} Winnings</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="detail-main-stat"
            >
              <div className="radar-wrapper">
                <SkillRadar stats={displayData.stats} />
                <div className="stat-circle-overlay">
                  <div className="stat-circle">
                    <span className="stat-num">{player.rating}</span>
                    <span className="stat-label">HLTV RATING</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        <div className="detail-grid">
          {/* Bio Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="detail-card bio-card"
          >
            <div className="card-header">
              <Activity size={20} color="var(--primary)" />
              <h3>选手简介</h3>
            </div>
            <p className="bio-text">{displayData.bio}</p>
            <div className="role-tags">
              {displayData.roles.map(role => (
                <span key={role} className="role-tag">
                  {role}
                </span>
              ))}
            </div>
          </motion.section>

          <div className="detail-sub-grid">
            {/* Stats Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="detail-card stats-card"
            >
              <div className="card-header">
                <TrendingUp size={20} color="var(--primary)" />
                <h3>外设与设置</h3>
              </div>
              <div className="settings-grid">
                <div className="setting-item">
                  <span className="label">DPI</span>
                  <span className="value">{displayData.mouseSettings.dpi}</span>
                </div>
                <div className="setting-item">
                  <span className="label">Sens</span>
                  <span className="value">{displayData.mouseSettings.sensitivity}</span>
                </div>
                <div className="setting-item">
                  <span className="label">Polling</span>
                  <span className="value">{displayData.mouseSettings.hz}Hz</span>
                </div>
              </div>
            </motion.section>

            {/* Achievements Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="detail-card highlights-card"
            >
              <div className="card-header">
                <Trophy size={20} color="var(--primary)" />
                <h3>生涯高光</h3>
              </div>
              <ul className="highlights-list">
                {displayData.careerHighlights.map((h, i) => (
                  <li key={i}>
                    <Award size={14} className="highlight-icon" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>
        </div>
      </div>
      
      <footer className="footer">
        <div className="footer-logo">FAZE CLAN</div>
        <p>© 2026 FaZe Clan Official Fan Portal | All Rights Reserved</p>
      </footer>
    </motion.div>
  );
};

export default PlayerDetail;
