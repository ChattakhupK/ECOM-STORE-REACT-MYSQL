import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";


const ContentCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetImage();
  }, []);

  const handleGetImage = async () => {
    axios
      .get("http://localhost:5000/api/promotion")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="">
      <Swiper
        // pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper h-80 rounded-sm mb-4"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <img className="w-full h-full" src={item} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={true}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper object-cover rounded-sm"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <img className="rounded-sm h-20px" src={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
