import React, { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sponsors from './components/Sponsors';
import MatchCountdown from './components/MatchCountdown';
import Roster from './components/Roster';
import News from './components/News';
import Shop from './components/Shop';
import Achievements from './components/Achievements';
import Matches from './components/Matches';
import Timeline from './components/Timeline';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import PlayerDetail from './components/PlayerDetail';
import NewsDetail from './components/NewsDetail';
import TeamLogo from './assets/faze.jpg';

// 模拟来自 HLTV 的战队数据
const teamData = {
  name: "FaZe Clan",
  logo: TeamLogo, // HLTV FaZe Logo
  worldRanking: 11, // 2026年3月最新排名
  description: "FaZe Clan 是一家总部位于美国的全球顶级电子竞技组织。其 CS 分部以国际化阵容著称，在 2025-2026 赛季经历了一系列人员调整后，依然保持在世界顶尖梯队，并获得了 2025 年布达佩斯 Major 亚军。",
};

const players = [
  { alias: "karrigan", name: "Finn Andersen", role: "IGL (指挥)", country: "🇩🇰 丹麦", rating: "0.90" },
  { alias: "frozen", name: "David Čerňanský", role: "Rifler (步枪手)", country: "🇸🇰 斯洛伐克", rating: "1.15" },
  { alias: "Twistzz", name: "Russel Van Dulken", role: "Rifler (步枪手)", country: "🇨🇦 加拿大", rating: "1.12" },
  { alias: "broky", name: "Helvijs Saukants", role: "AWPer (狙击手)", country: "🇱🇻 拉脱维亚", rating: "1.11" },
  { alias: "jcobbb", name: "Jakub Pietruszewski", role: "Rifler (步枪手/新秀)", country: "🇵🇱 波兰", rating: "1.05" }
];

const achievements = [
  { year: 2025, title: "StarLadder Budapest Major 2025", placement: "亚军 🥈" },
  { year: 2023, title: "IEM Sydney 2023", placement: "冠军 🏆" },
  { year: 2023, title: "Intel Grand Slam Season 4", placement: "大满贯得主 🌟" },
  { year: 2022, title: "PGL Major Antwerp 2022", placement: "冠军 🏆" },
  { year: 2022, title: "IEM Cologne 2022", placement: "冠军 🏆" }
];

const HomePage = ({ teamData, players, achievements }) => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  useEffect(() => {
    // 处理从其他页面（如球员详情页）跳转回首页并滚动到特定位置的情况
    const hash = window.location.hash;
    if (hash && hash.includes('#section-')) {
      const id = hash.split('#section-')[1];
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [location]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const showBtn = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <motion.button 
        className="scroll-top-btn"
        onClick={scrollToTop}
        style={{ opacity: showBtn }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={24} />
      </motion.button>

      {/* 滚动进度条 */}
      <motion.div className="progress-bar" style={{ 
        scaleX, 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '4px', 
        background: 'var(--primary)', 
        transformOrigin: '0%',
        zIndex: 1001 
      }} />

      {/* 背景动态装饰 */}
      <div className="bg-decoration" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        background: 'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000 100%)',
        opacity: 0.8
      }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(228, 30, 38, 0.05) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle, rgba(228, 30, 38, 0.03) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
      </div>

      <Navbar />
      <div id="hero"><Hero teamData={teamData} /></div>
      <MatchCountdown />
      <Sponsors />
      <div id="news"><News /></div>
      <div id="roster"><Roster players={players} /></div>
      <div id="shop"><Shop /></div>
      <Timeline />
      <div id="achievements"><Achievements achievements={achievements} /></div>
      <Matches />
      <Newsletter />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage teamData={teamData} players={players} achievements={achievements} />} />
          <Route path="/player/:alias" element={<PlayerDetail players={players} />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
