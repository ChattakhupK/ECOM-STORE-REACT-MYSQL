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
        slidesPerView={4}
        spaceBetween={10}
        // pagination={true}
        // navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
    
        className="mySwiper object-cover text flex justify-center items-center rounded-sm"
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperShowProduct;
