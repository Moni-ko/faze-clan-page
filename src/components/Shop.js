import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';

const Shop = () => {
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('faze_cart') || '[]');
    cart.push(product);
    localStorage.setItem('faze_cart', JSON.stringify(cart));
    // Trigger custom event for Navbar to update
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const resolveImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = process.env.PUBLIC_URL || '';
    return `${baseUrl}/${path.startsWith('/') ? path.slice(1) : path}`;
  };

  const products = [
    {
      id: 1,
      name: "FaZe 2026 Pro Jersey",
      price: "$79.99",
      tag: "BEST SELLER",
      image: "assets/官方队服.jpg"
    },
    {
      id: 2,
      name: "FaZe Clan 'Legacy' Hoodie",
      price: "$65.00",
      tag: "NEW DROP",
      image: "assets/连帽衫.jpg"
    },
    {
      id: 3,
      name: "FaZe Clan Pro Cap",
      price: "$29.99",
      tag: "ESSENTIAL",
      image: "assets/职业帽.jpg"
    },
    {
      id: 4,
      name: "FaZe Signature Mug",
      price: "$19.99",
      tag: "FAN FAVORITE",
      image: "assets/马克杯.jpg"
    }
  ];

  return (
    <section id="shop" className="shop-section">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="section-tag"><ShoppingBag size={14} /> OFFICIAL MERCH</div>
        <h2>Equip Yourself</h2>
      </motion.div>

      <div className="shop-grid">
        {products.map((product, index) => (
          <motion.div 
            key={product.id}
            className="product-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="product-image-wrapper">
              <div className="product-tag">{product.tag}</div>
              <img 
                src={resolveImageUrl(product.image)} 
                alt={product.name} 
                className="product-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="product-image-placeholder" style={{ display: 'none' }}>
                <Star size={40} className="product-icon-decor" />
                <span>{product.name}</span>
              </div>
              <motion.button 
                className="quick-add"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(product)}
              >
                Quick Add +
              </motion.button>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-footer">
                <span className="product-price">{product.price}</span>
                <motion.div 
                  className="shop-link"
                  whileHover={{ x: 5 }}
                >
                  View <ArrowRight size={14} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="shop-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <button className="view-all-shop">Visit Official Store</button>
      </motion.div>
    </section>
  );
};

export default Shop;
