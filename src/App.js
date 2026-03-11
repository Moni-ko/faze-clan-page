import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
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
import { Suspense, lazy } from 'react';
const PlayerDetail = lazy(() => import('./components/PlayerDetail'));
const NewsDetail = lazy(() => import('./components/NewsDetail'));

const API_BASE_URL = 'http://localhost:5000/api';

// 图片路径处理工具函数
const resolveImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // 处理 GitHub Pages 路径或本地路径
  const baseUrl = process.env.PUBLIC_URL || '';
  return `${baseUrl}/${path.startsWith('/') ? path.slice(1) : path}`;
};

// 页面切换动画配置
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const HomePage = () => {
  const [teamData, setTeamData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamRes, playersRes, achRes] = await Promise.all([
          fetch(`${API_BASE_URL}/team`),
          fetch(`${API_BASE_URL}/players`),
          fetch(`${API_BASE_URL}/achievements`)
        ]);

        const team = await teamRes.json();
        const playersData = await playersRes.json();
        const achievementsData = await achRes.json();

        setTeamData({ ...team, logo: resolveImageUrl(team.logo) });
        setPlayers(playersData.map(p => ({ ...p, image: resolveImageUrl(p.image) })));
        setAchievements(achievementsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // 处理从其他页面跳转回首页并滚动到特定位置的情况
    const fullHash = window.location.hash; // 例如 #/#section-roster
    if (fullHash.includes('#section-')) {
      const sectionId = fullHash.split('#section-')[1];
      const element = document.getElementById(sectionId);
      if (element) {
        // 稍微延迟确保 DOM 已渲染完成
        setTimeout(() => {
          const offset = 80; // 导航栏高度
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
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

  if (loading) return <div className="loading-screen">Loading FaZe Portal...</div>;

  return (
    <PageWrapper>
      <Helmet>
        <title>FaZe Clan | Official Fan Portal</title>
        <meta name="description" content="Welcome to the official FaZe Clan fan portal. Stay updated with the latest news, roster, and matches." />
      </Helmet>

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
      <div id="roster"><Roster players={players} loading={loading} /></div>
      <div id="shop"><Shop /></div>
      <Timeline />
      <div id="achievements"><Achievements achievements={achievements} /></div>
      <Matches />
      <Newsletter />
      <Footer />
    </PageWrapper>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="loading-screen">Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/player/:alias" element={<PlayerDetail />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app-container">
          <AnimatedRoutes />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
