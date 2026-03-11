import React from 'react';
import { Youtube, Twitter, Instagram, Github, Twitch } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">FAZE CLAN</div>
          <p>The world's most popular esports organization. Defined by the culture, driven by the community.</p>
          <div className="footer-socials">
            <a href="https://twitter.com/fazeclan" target="_blank" rel="noreferrer"><Twitter size={20} /></a>
            <a href="https://instagram.com/fazeclan" target="_blank" rel="noreferrer"><Instagram size={20} /></a>
            <a href="https://youtube.com/fazeclan" target="_blank" rel="noreferrer"><Youtube size={20} /></a>
            <a href="https://twitch.tv/fazeclan" target="_blank" rel="noreferrer"><Twitch size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links-grid">
          <div className="link-col">
            <h4>ORGANIZATION</h4>
            <a href="#section-hero">About Us</a>
            <a href="#section-roster">Roster</a>
            <a href="#section-news">News</a>
          </div>
          <div className="link-col">
            <h4>SUPPORT</h4>
            <a href="#section-shop">Shop</a>
            <a href="#section-matches">Matches</a>
            <a href="#section-newsletter">Newsletter</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2026 FaZe Clan Official Fan Portal | Powered by React</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
