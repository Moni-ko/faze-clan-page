import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Share2, Clock } from 'lucide-react';
import { newsItems } from './News';

const NewsDetail = () => {
  const { id } = useParams();
  const newsItem = newsItems.find(item => item.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!newsItem) {
    return (
      <div className="news-detail-page error">
        <h2>News not found</h2>
        <Link to="/" className="back-btn"><ArrowLeft size={18} /> Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="news-detail-page">
      <nav className="navbar">
        <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                {newsItems.filter(item => item.id !== newsItem.id).map(item => (
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
    </div>
  );
};

export default NewsDetail;
