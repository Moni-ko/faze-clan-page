import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ChevronRight, ExternalLink } from 'lucide-react';

// Import images
import NewsImg1 from '../assets/frozen.jpg';
import NewsImg2 from '../assets/jcobbb.jpg';
import NewsImg3 from '../assets/twistzz.jpg';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "frozen Leads FaZe to Victory in ESL Pro League Season 23",
      date: "Mar 08, 2026",
      tag: "TOURNAMENT",
      image: NewsImg1,
      desc: "David 'frozen' Čerňanský puts up a masterful performance as FaZe Clan starts their campaign with a clean 2-0 sweep."
    },
    {
      id: 2,
      title: "jcobbb Reflects on His First Major Experience with FaZe",
      date: "Mar 01, 2026",
      tag: "INTERVIEW",
      image: NewsImg2,
      desc: "The Polish rising star discusses his adjustment to the team and the expectations for the remainder of the 2026 season."
    },
    {
      id: 3,
      title: "Twistzz Reaches 1.5M Career Prize Money Milestone",
      date: "Feb 20, 2026",
      tag: "MILESTONE",
      image: NewsImg3,
      desc: "After the recent PGL Major performance, Twistzz becomes the highest-earning North American player in history."
    }
  ];

  return (
    <section id="news" className="news-section">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="section-tag"><Newspaper size={14} /> NEWS CENTER</div>
        <h2>Latest Updates</h2>
      </motion.div>

      <div className="news-grid">
        {newsItems.map((item, index) => (
          <motion.article 
            key={item.id}
            className="news-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="news-image-wrapper">
              <div className="news-tag-overlay">{item.tag}</div>
              <img 
                src={item.image} 
                alt={item.title} 
                className="news-image" 
              />
            </div>
            <div className="news-content">
              <span className="news-date">{item.date}</span>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-desc">{item.desc}</p>
              <div className="news-footer">
                <span className="read-more">Read More <ChevronRight size={14} /></span>
                <ExternalLink size={14} className="ext-link-icon" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default News;
