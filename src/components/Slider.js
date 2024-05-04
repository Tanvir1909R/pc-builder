import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
 const Slider = ({bannerImgs}) => {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {bannerImgs.map((img,idx)=>(
          <SwiperSlide key={idx}>
            <img src={img} alt="banner" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
 }
 
 export default Slider;