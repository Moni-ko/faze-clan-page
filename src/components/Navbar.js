import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
        <a href="/#hero" className="nav-link">Home</a>
        <a href="/#roster" className="nav-link">Roster</a>
        <a href="/#history" className="nav-link">History</a>
        <a href="/#achievements" className="nav-link">Awards</a>
        <a href="/#matches" className="nav-link">Matches</a>
      </div>
      <div className="nav-cta">
        <button className="badge" style={{ margin: 0, cursor: 'pointer', padding: '0.5rem 1.2rem', fontSize: '0.7rem' }}>Join Community</button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
