import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay, Navigation } from "swiper/modules";

const SwiperShowProduct = ({ children }) => {
  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        // pagination={true}
        // navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
            '@0.00': {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            '@0.75': {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            '@1.00': {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            '@1.50': {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            '@1.75': {
              slidesPerView: 5,
              spaceBetween: 60,
            },
            '@2.00': {
              slidesPerView: 6,
              spaceBetween: 60,
            },
          }}
        className="mySwiper object-cover text flex justify-center items-center rounded-sm"
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperShowProduct;
