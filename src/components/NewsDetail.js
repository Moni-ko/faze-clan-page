import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Tag, Share2, Clock } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

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

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [recentNews, setRecentNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchNewsData = async () => {
      try {
        const [itemRes, recentRes] = await Promise.all([
          fetch(`${API_BASE_URL}/news/${id}`),
          fetch(`${API_BASE_URL}/news`)
        ]);
        
        let item = await itemRes.json();
        let recent = await recentRes.json();
        
        item = { ...item, image: resolveImageUrl(item.image) };
        recent = recent.map(n => ({ ...n, image: resolveImageUrl(n.image) }));
        
        setNewsItem(item);
        setRecentNews(recent);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news detail:", error);
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [id]);

  if (loading) return <div className="loading-screen">Loading article...</div>;

  if (!newsItem) {
    return (
      <div className="news-detail-page error">
        <h2>News not found</h2>
        <Link to="/" className="back-btn"><ArrowLeft size={18} /> Back to Home</Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="news-detail-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <Helmet>
        <title>{newsItem.title} | FaZe Clan News</title>
        <meta name="description" content={newsItem.desc} />
      </Helmet>
      <nav className="navbar">
        <Link to="/#section-news" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={18} /> 返回主页
        </Link>
        <div className="nav-logo">FAZE NEWS</div>
      </nav>

      <motion.div 
        className="news-detail-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="news-detail-header">
          <motion.div 
            className="news-detail-meta"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="news-detail-tag"><Tag size={14} /> {newsItem.tag}</span>
            <span className="news-detail-date"><Calendar size={14} /> {newsItem.date}</span>
            <span className="news-detail-readtime"><Clock size={14} /> 3 min read</span>
          </motion.div>
          
          <motion.h1 
            className="news-detail-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {newsItem.title}
          </motion.h1>
        </header>

        <motion.div 
          className="news-detail-image-wrapper"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <img src={newsItem.image} alt={newsItem.title} className="news-detail-image" />
        </motion.div>

        <div className="news-detail-content-wrapper">
          <motion.div 
            className="news-detail-body"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="news-detail-lead">{newsItem.desc}</p>
            <div className="news-detail-text">
              {newsItem.content}
            </div>
            
            <div className="news-detail-actions">
              <button className="share-btn"><Share2 size={18} /> Share Article</button>
            </div>
          </motion.div>

          <aside className="news-detail-sidebar">
            <div className="sidebar-card">
              <h3>Latest News</h3>
              <div className="sidebar-news-list">
                {recentNews.filter(item => item.id !== newsItem.id).map(item => (
                  <Link key={item.id} to={`/news/${item.id}`} className="sidebar-news-item">
                    <span className="sidebar-news-date">{item.date}</span>
                    <h4>{item.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewsDetail;
