import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import images
import NewsImg1 from '../assets/frozen.jpg';
import NewsImg2 from '../assets/jcobbb.jpg';
import NewsImg3 from '../assets/twistzz.jpg';

export const newsItems = [
  {
    id: 1,
    title: "frozen Leads FaZe to Victory in ESL Pro League Season 23",
    date: "Mar 08, 2026",
    tag: "TOURNAMENT",
    image: NewsImg1,
    desc: "David 'frozen' Čerňanský puts up a masterful performance as FaZe Clan starts their campaign with a clean 2-0 sweep.",
    content: "ESL Pro League Season 23 揭幕战中，FaZe Clan 展现了惊人的统治力。David 'frozen' Čerňanský 在 Ancient 和 Nuke 两张地图上交出了 1.45 的平均 Rating，带领战队以 2-0 完胜对手。这场胜利标志着 FaZe 在 2026 赛季初期的强劲势头，也证明了战队在休赛期的调整非常成功。主教练在赛后采访中表示，frozen 的稳定发挥是战队取胜的关键，而全队的配合也达到了新的高度。"
  },
  {
    id: 2,
    title: "jcobbb Reflects on His First Major Experience with FaZe",
    date: "Mar 01, 2026",
    tag: "INTERVIEW",
    image: NewsImg2,
    desc: "The Polish rising star discusses his adjustment to the team and the expectations for the remainder of the 2026 season.",
    content: "作为 FaZe Clan 最年轻的成员，jcobbb 在他的首次 Major 之旅后分享了深刻的感悟。这位波兰新星坦言，在顶级舞台上竞技的压力远超想象，但队友们的支持让他迅速适应。'karrigan 的领导力让我感到安心，' jcobbb 在采访中说道，'我们虽然在决赛中失利，但这只是开始。' 展望 2026 赛季剩余的比赛， he表示将专注于个人技术的打磨，力争在接下来的 IEM 科隆中为粉丝带来更多惊喜。"
  },
  {
    id: 3,
    title: "Twistzz Reaches 1.5M Career Prize Money Milestone",
    date: "Feb 20, 2026",
    tag: "MILESTONE",
    image: NewsImg3,
    desc: "After the recent PGL Major performance, Twistzz becomes the highest-earning North American player in history.",
    content: "Russel 'Twistzz' Van Dulken 再次刷新了历史。凭借在 PGL 2026 Major 中的出色表现，他的职业生涯总奖金正式突破 150 万美元大关，进一步巩固了其作为北美 CS 历史上最成功选手的地位。Twistzz 不仅是历史上唯一一位赢得两次大满贯的选手，他的职业道德和赛场表现也一直是年轻选手的楷模。为了庆祝这一里程碑，FaZe 官方商城也将推出限量版签名周边。"
  }
];

const News = () => {

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
            <Link to={`/news/${item.id}`} className="news-image-wrapper">
              <div className="news-tag-overlay">{item.tag}</div>
              <img 
                src={item.image} 
                alt={item.title} 
                className="news-image" 
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
      </div>
    </section>
  );
};

export default News;
