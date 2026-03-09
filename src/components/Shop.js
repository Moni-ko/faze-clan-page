import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';

const Shop = () => {
  const products = [
    {
      id: 1,
      name: "FaZe 2026 Pro Jersey",
      price: "$79.99",
      tag: "BEST SELLER",
      image: "https://shop.fazeclan.com/cdn/shop/files/2024_PRO_JERSEY_FRONT_600x.png?v=1708453483" // Placeholder
    },
    {
      id: 2,
      name: "FaZe Clan 'Legacy' Hoodie",
      price: "$65.00",
      tag: "NEW DROP",
      image: "https://shop.fazeclan.com/cdn/shop/files/HOODIE_BLACK_FRONT_600x.png?v=1708453483" // Placeholder
    },
    {
      id: 3,
      name: "Twistzz Signature Mousepad",
      price: "$34.99",
      tag: "LIMITED",
      image: "https://shop.fazeclan.com/cdn/shop/files/MOUSEPAD_600x.png?v=1708453483" // Placeholder
    },
    {
      id: 4,
      name: "FaZe Clan Pro Cap",
      price: "$29.99",
      tag: "ESSENTIAL",
      image: "https://shop.fazeclan.com/cdn/shop/files/HAT_FRONT_600x.png?v=1708453483" // Placeholder
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
              <div className="product-image-placeholder">
                <Star size={40} className="product-icon-decor" />
                <span>{product.name}</span>
              </div>
              <motion.button 
                className="quick-add"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
