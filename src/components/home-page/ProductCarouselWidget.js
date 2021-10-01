/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './ProductCarouselWidget.module.css';
import fetchPromoProducts from './ProductCarouselWidgetService';
import ProductCard from '../product-card/ProductCard';

/**
 * @name ProductCarouselWidget
 * @description Widget to display hot deals product carousel
 * @return component
 */
const ProductCarouselWidget = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 460 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 460, min: 0 },
      items: 1
    }
  };

  const [playCarousel, setPlayCarousel] = useState(true);
  const [promoProducts, setPromoProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const items = [];

  /**
   * Set the items to be passed into the carousel
   */
  items.push(promoProducts.map((product) => (
    <ProductCard product={product} />
  )));

  /**
   * Get 3 promo products from the API
   */
  useEffect(() => {
    fetchPromoProducts(setPromoProducts, setApiError);
  }, [setPromoProducts, setApiError]);

  /**
   * Set the product to be displayed so the modal will show correctly
   */
  const [activeProduct, setActiveProduct] = useState(promoProducts[0]);
  const element = document.getElementById('carouselCover');
  const updateActiveProduct = (productNum) => {
    setActiveProduct(promoProducts[productNum]);
  };

  return (
    <>
      {apiError && <p className={styles.errText}>Oops, something went wrong!</p>}
      {promoProducts && (
        <>
          <div id="carouselCover" className={styles.carouselCoverHide}>
            {activeProduct && <ProductCard product={activeProduct} setPlayCarousel={setPlayCarousel} />}
          </div>
          <Carousel
            afterChange={(previousSlide, { currentSlide, onMove }) => {
              element.className = styles.carouselCoverShow;
              if (currentSlide === 1) {
                updateActiveProduct(currentSlide - 1);
              } else {
                updateActiveProduct(currentSlide - 2);
              }
            }}
            autoPlay={playCarousel}
            autoPlaySpeed={10000}
            beforeChange={(previousSlide, { currentSlide, onMove }) => {
              element.className = styles.carouselCoverHide;
            }}
            centerMode={false}
            containerClass={styles.container}
            customTransition="transform 800ms ease-in-out"
            draggable={false}
            itemClass={styles.item}
            keyBoardControl
            showDots={false}
            responsive={responsive}
            infinite
            pauseOnHover
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            ssr={false}
            swipeable={false}
            transitionDuration={800}
          >
            {items}
          </Carousel>
        </>
      )}
    </>
  );
};

export default ProductCarouselWidget;
