import React from 'react';
import styles from './HomePage.module.css';
import PopularProductsWidget from '../Popular-Products-Widget/PopularProductsWidget';
import ProductCarouselWidget from './ProductCarouselWidget';

const HomePage = () => (
  <div className="homePageContainer">
    <div className={styles.homePageContainer}>
      <div className={`${styles.step} ${styles.trending}`}>
        <h3 className={styles.title}>Trending Now</h3>
        <hr />
        <PopularProductsWidget />
      </div>
      <div className={`${styles.step} ${styles.deals}`}>
        <h3 className={styles.title}>Hot Deals</h3>
        <hr />
        <ProductCarouselWidget />
      </div>
      <div className={`${styles.step} ${styles.featured}`}>
        <h3 className={styles.title}>Featured Products</h3>
        <hr />
        {/* Featured Products Widget Goes Here */}
      </div>
    </div>
  </div>
);

export default HomePage;
