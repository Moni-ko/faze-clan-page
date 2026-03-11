import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, ChevronRight, ExternalLink, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Skeleton from './Skeleton';

const API_BASE_URL = 'http://localhost:5000/api';

const resolveImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = process.env.PUBLIC_URL || '';
  return `${baseUrl}/${path.startsWith('/') ? path.slice(1) : path}`;
};

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'TOURNAMENT', 'INTERVIEW', 'MILESTONE'];

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/news`)
      .then(res => res.json())
      .then(data => {
        const processedData = data.map(item => ({
          ...item,
          image: resolveImageUrl(item.image)
        }));
        setNewsItems(processedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, []);

  const filteredNews = filter === 'ALL' 
    ? newsItems 
    : newsItems.filter(item => item.tag === filter);

  return (
    <section id="section-news" className="news-section">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="section-tag"><Newspaper size={14} /> NEWS CENTER</div>
        <h2>Latest Updates</h2>
      </motion.div>

      <div className="news-filter-bar">
        <div className="filter-icon"><Filter size={16} /> Filter by:</div>
        <div className="filter-options">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="news-grid">
        {loading ? (
          [1, 2, 3].map(i => <Skeleton key={i} type="news" />)
        ) : (
          <AnimatePresence mode='popLayout'>
            {filteredNews.map((item, index) => (
              <motion.article 
                layout
                key={item.id}
                className="news-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
              >
                <Link to={`/news/${item.id}`} className="news-image-wrapper">
                  <div className="news-tag-overlay">{item.tag}</div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="news-image"
                    loading="lazy"
                  />
                </Link>
                <div className="news-content">
                  <span className="news-date">{item.date}</span>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-desc">{item.desc}</p>
                  <div className="news-footer">
                    <Link to={`/news/${item.id}`} className="read-more">Read More <ChevronRight size={14} /></Link>
                    <ExternalLink size={14} className="ext-link-icon" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default News;
