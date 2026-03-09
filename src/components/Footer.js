import React from 'react';
import { Github, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">FAZE CLAN</div>
      
      <div className="footer-socials">
        <a href="#" className="social-icon"><Twitter size={24} /></a>
        <a href="#" className="social-icon"><Instagram size={24} /></a>
        <a href="#" className="social-icon"><Youtube size={24} /></a>
        <a href="#" className="social-icon"><Github size={24} /></a>
      </div>
      
      <div className="footer-info">
        <p>Data provided by <a href="https://www.hltv.org/" target="_blank" rel="noreferrer">HLTV.org</a>. This is a fan-made project for educational purposes.</p>
        <p style={{ marginTop: '1.5rem', opacity: 0.3 }}>© 2026 FaZe Clan Fan Page. Built with React & Framer Motion.</p>
      </div>
    </footer>
  );
};

export default Footer;
