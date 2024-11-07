import React from "react";
import ContentCarousel from "../components/home/contentCarousel";
import BestSeller from "../components/home/BestSeller";
import NewProduct from "../components/home/NewProduct";

const Home = () => {
  return (
    <div>
      <ContentCarousel />
      <hr className=" mt-12" />
      <h2 className="text-2xl text-center font-semibold my-6">สินค้าขายดี</h2>
      <BestSeller />
      <hr className=" mt-12" />

      <h2 className="text-2xl text-center font-semibold my-6">สินค้ามาใหม่</h2>
      <NewProduct />
    </div>
  );
};

export default Home;
