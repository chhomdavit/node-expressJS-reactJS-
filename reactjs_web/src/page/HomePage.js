import React from 'react';
import CarouselSwiper from '../component/carousel-swiper/CarouselSwiper';
import ProductPage from '../component/product/ProductPage';
import { Divider } from 'antd';

const HomePage = () => {
  return (
    <div className="container">
      <CarouselSwiper/>
      <Divider/>
      <ProductPage/>
    </div>
  )
}

export default HomePage;
