import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Search, X, User, Newspaper, ChevronRight, ShoppingCart, Trash2 } from 'lucide-react';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('faze_cart') || '[]'));
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState({ players: [], news: [] });
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Listen for custom events to update cart from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      setCart(JSON.parse(localStorage.getItem('faze_cart') || '[]'));
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('faze_cart', JSON.stringify(newCart));
  };

  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0).toFixed(2);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const timer = setTimeout(() => {
        fetch(`http://localhost:5000/api/search?q=${searchQuery}`)
          .then(res => res.json())
          .then(data => setResults(data))
          .catch(err => console.error("Search error:", err));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults({ players: [], news: [] });
    }
  }, [searchQuery]);

  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location]);

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
    <>
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
          <Link to="/#section-hero" onClick={(e) => scrollToSection(e, 'hero')} className="nav-link">Home</Link>
          <Link to="/#section-roster" onClick={(e) => scrollToSection(e, 'roster')} className="nav-link">Roster</Link>
          <Link to="/#section-news" onClick={(e) => scrollToSection(e, 'news')} className="nav-link">News</Link>
          <Link to="/#section-shop" onClick={(e) => scrollToSection(e, 'shop')} className="nav-link">Shop</Link>
          <Link to="/#section-achievements" onClick={(e) => scrollToSection(e, 'achievements')} className="nav-link">Awards</Link>
        </div>
        <div className="nav-cta">
          <button className="search-toggle" onClick={() => setIsSearchOpen(true)}>
            <Search size={18} />
          </button>
          <button className="cart-toggle" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={18} />
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
          <button className="badge" style={{ margin: 0, cursor: 'pointer', padding: '0.5rem 1.2rem', fontSize: '0.7rem' }}>Join Community</button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div 
              className="cart-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cart-header">
                <h3>Your Gear Bag</h3>
                <button className="close-cart" onClick={() => setIsCartOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="cart-items">
                {cart.length > 0 ? (
                  cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="cart-item">
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <span>{item.price}</span>
                      </div>
                      <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty-cart">
                    <ShoppingCart size={48} />
                    <p>Your bag is empty.</p>
                    <button className="shop-now-btn" onClick={() => setIsCartOpen(false)}>Shop Now</button>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="cart-footer">
                  <div className="total-row">
                    <span>Total</span>
                    <span>${cartTotal}</span>
                  </div>
                  <button className="checkout-btn">Proceed to Checkout</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="search-container">
              <div className="search-header">
                <Search size={24} className="search-icon-main" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search for news, players, or tournaments..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="close-search" onClick={() => setIsSearchOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="search-results">
                {searchQuery.length > 1 ? (
                  <>
                    {results.players.length > 0 && (
                      <div className="result-section">
                        <h4><User size={16} /> Players</h4>
                        {results.players.map(player => (
                          <Link key={player.alias} to={`/player/${player.alias}`} className="result-item">
                            <span>{player.alias} ({player.name})</span>
                            <ChevronRight size={14} />
                          </Link>
                        ))}
                      </div>
                    )}
                    {results.news.length > 0 && (
                      <div className="result-section">
                        <h4><Newspaper size={16} /> News</h4>
                        {results.news.map(news => (
                          <Link key={news.id} to={`/news/${news.id}`} className="result-item">
                            <span>{news.title}</span>
                            <ChevronRight size={14} />
                          </Link>
                        ))}
                      </div>
                    )}
                    {results.players.length === 0 && results.news.length === 0 && (
                      <div className="no-results">No matches found for "{searchQuery}"</div>
                    )}
                  </>
                ) : (
                  <div className="search-hint">Start typing to search...</div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
