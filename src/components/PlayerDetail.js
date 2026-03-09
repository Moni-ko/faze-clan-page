import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const PlayerDetail = ({ players }) => {
  const { alias } = useParams();
  const player = players.find(p => p.alias.toLowerCase() === alias.toLowerCase());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!player) return <div className="detail-container">选手未找到</div>;

  // 选手详细数据字典
  const playerDatabase = {
    Twistzz: {
      fullName: "Russel Van Dulken",
      birthday: "1999-11-14",
      totalWinnings: "$1,750,000+",
      mouseSettings: { dpi: 400, sensitivity: 1.4, hz: 1000 },
      careerHighlights: [
        "2x Intel Grand Slam Winner (Season 2 & 4)",
        "PGL Major Antwerp 2022 Champion",
        "IEM Cologne 2022 Champion",
        "Top 20 players of 2022 (#11 HLTV)"
      ],
      roles: ["Entry Fragger", "Clutcher", "Headshot Machine"],
      stats: { aim: 98, strategy: 85, impact: 94, utility: 80, consistency: 92 },
      bio: "Twistzz 被公认为 CS 历史上最伟大的北美选手之一。他以极其精准的爆头和关键时刻的残局能力闻名。他是历史上唯一一位赢得两次 Intel 大满贯的选手。"
    },
    karrigan: {
      fullName: "Finn Andersen",
      birthday: "1990-04-14",
      totalWinnings: "$1,600,000+",
      mouseSettings: { dpi: 400, sensitivity: 1.2, hz: 1000 },
      careerHighlights: [
        "PGL Major Antwerp 2022 Champion",
        "Intel Grand Slam Season 4 Winner",
        "Most successful IGL in CS history",
        "Known for aggressive T-side calling"
      ],
      roles: ["IGL", "Entry Fragger", "Veteran Leader"],
      stats: { aim: 75, strategy: 99, impact: 88, utility: 95, consistency: 82 },
      bio: "karrigan 是 CS 历史上最成功的指挥官之一。他以能够将不同背景的顶尖选手整合为冠军之师而闻名，是 FaZe Clan 战术体系的灵魂。"
    },
    frozen: {
      fullName: "David Čerňanský",
      birthday: "2002-07-18",
      totalWinnings: "$800,000+",
      mouseSettings: { dpi: 400, sensitivity: 1.1, hz: 1000 },
      careerHighlights: [
        "Top 20 players of 2023 (#12 HLTV)",
        "Flashpoint 3 Champion",
        "EPL Season 18 Champion",
        "Youngest player to play in a Major qualifier at 13"
      ],
      roles: ["Rifler", "Clutcher", "Anchor"],
      stats: { aim: 92, strategy: 88, impact: 90, utility: 85, consistency: 96 },
      bio: "frozen 是一名天赋异禀的斯洛伐克选手，在加入 FaZe 之前已在 MOUZ 证明了自己。他以冷静的残局处理和极其稳定的火力输出著称。"
    },
    broky: {
      fullName: "Helvijs Saukants",
      birthday: "2001-02-14",
      totalWinnings: "$1,200,000+",
      mouseSettings: { dpi: 400, sensitivity: 1.0, hz: 1000 },
      careerHighlights: [
        "IEM Katowice 2022 MVP",
        "PGL Major Antwerp 2022 Champion",
        "Top 20 players of 2022 (#6 HLTV)",
        "Known for incredible clutch statistics"
      ],
      roles: ["AWPer", "Clutcher"],
      stats: { aim: 94, strategy: 82, impact: 92, utility: 78, consistency: 95 },
      bio: "broky 是拉脱维亚的顶尖狙击手，也是 FaZe 阵中最稳健的残局大师。他在 2022 年迎来了职业生涯巅峰，拿到了多个 MVP 奖项。"
    },
    jcobbb: {
      fullName: "Jakub Pietruszewski",
      birthday: "2004-05-22",
      totalWinnings: "$50,000+",
      mouseSettings: { dpi: 800, sensitivity: 0.8, hz: 1000 },
      careerHighlights: [
        "Signed by FaZe Clan in 2025",
        "Former star of Polish Tier-2 scene",
        "PGL Cluj-Napoca 2026 Quarterfinalist",
        "Considered the future of Polish CS"
      ],
      roles: ["Rifler", "Entry Fragger", "Young Prospect"],
      stats: { aim: 90, strategy: 75, impact: 85, utility: 70, consistency: 80 },
      bio: "jcobbb 是 FaZe 在 2025 年签下的波兰新星。作为一名极具侵略性的步枪手，他承担了填补 ropz 离队后火力空缺的重任，展现出了巨大的潜力。"
    }
  };

  const displayData = playerDatabase[player.alias] || {
    fullName: player.name,
    birthday: "N/A",
    totalWinnings: "N/A",
    mouseSettings: { dpi: 400, sensitivity: 1.2, hz: 1000 },
    careerHighlights: ["Professional CS2 Player for FaZe Clan"],
    roles: [player.role],
    stats: { aim: 80, strategy: 80, impact: 80, utility: 80, consistency: 80 },
    bio: `${player.alias} 是 FaZe Clan 的重要一员，担任 ${player.role}。`
  };

  return (
    <div className="detail-page">
      <nav className="navbar">
        <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={18} /> 返回主页
        </Link>
        <div className="nav-logo">FAZE {player.alias.toUpperCase()}</div>
      </nav>

      <div className="detail-container">
        <header className="detail-hero">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="detail-header-info"
          >
            <div className="detail-badge">ACTIVE PLAYER</div>
            <h1 className="detail-alias">{player.alias}</h1>
            <p className="detail-fullname">{displayData.fullName}</p>
            <div className="detail-meta">
              <span>{player.country}</span>
              <span>•</span>
              <span>{player.role}</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="detail-main-stat"
          >
            <SkillRadar stats={displayData.stats} />
            <div className="stat-circle-overlay">
              <div className="stat-circle">
                <span className="stat-num">{player.rating}</span>
                <span className="stat-label">HLTV RATING</span>
              </div>
            </div>
          </motion.div>
        </header>

        <div className="detail-grid">
          {/* Bio Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="detail-card bio-card"
          >
            <h3><Activity size={20} color="var(--primary)" /> 选手简介</h3>
            <p>{displayData.bio}</p>
            <div className="role-tags">
              {displayData.roles.map(role => <span key={role} className="role-tag">{role}</span>)}
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="detail-card stats-card"
          >
            <h3><TrendingUp size={20} color="var(--primary)" /> 外设与设置</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <span className="label">DPI</span>
                <span className="value">{displayData.mouseSettings.dpi}</span>
              </div>
              <div className="setting-item">
                <span className="label">Sensitivity</span>
                <span className="value">{displayData.mouseSettings.sensitivity}</span>
              </div>
              <div className="setting-item">
                <span className="label">Polling Rate</span>
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
            <h3><Trophy size={20} color="var(--primary)" /> 生涯高光</h3>
            <ul className="highlights-list">
              {displayData.careerHighlights.map((h, i) => (
                <li key={i}><Award size={14} /> {h}</li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>
      
      <footer className="footer">
        <p>© 2024 FaZe Clan Fan Page | {player.alias} Profile</p>
      </footer>
    </div>
  );
};

export default PlayerDetail;
