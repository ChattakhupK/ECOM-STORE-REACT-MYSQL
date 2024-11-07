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
      .get("https://picsum.photos/v2/list?page=1&limit=15")
      .then((res) => {
        // console.log(res);
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
            <img src={item.download_url} alt="" />
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
            <img className="rounded-sm h-20px" src={item.download_url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
