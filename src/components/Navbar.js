import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (e, id) => {
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Navbar height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="nav-logo">FAZE CLAN</div>
      </Link>
      <div className="nav-links">
        <Link to="/" onClick={(e) => scrollToSection(e, 'hero')} className="nav-link">Home</Link>
        <Link to="/" onClick={(e) => scrollToSection(e, 'roster')} className="nav-link">Roster</Link>
        <Link to="/" onClick={(e) => scrollToSection(e, 'news')} className="nav-link">News</Link>
        <Link to="/" onClick={(e) => scrollToSection(e, 'shop')} className="nav-link">Shop</Link>
        <Link to="/" onClick={(e) => scrollToSection(e, 'achievements')} className="nav-link">Awards</Link>
      </div>
      <div className="nav-cta">
        <button className="badge" style={{ margin: 0, cursor: 'pointer', padding: '0.5rem 1.2rem', fontSize: '0.7rem' }}>Join Community</button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
