import React, { useEffect, useState } from "react";
import ProductCard from "../components/card/ProductCard";
import SearchCard from "../components/card/SearchCard";
import useEcomStore from "../store/ecom-store";
import CartCard from "../components/card/CartCard";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const carts = useEcomStore((state) => state.carts);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex justify-between relative">
      <div className="fixed z-30">
        <SearchCard />
      </div>
      <div className="mx-[130px]"></div>
      <div className="w-full p-4 overflow-y-auto h-screen no-scrollbar">
        <p className="text-2xl font-bold mb-4">Products</p>
        <div className="flex flex-wrap gap-4">
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </div>

      <div className={carts.length && "w-[450px]"}>
        <div
          className={
            carts.length &&
            "fixed right-2 w-[450px] bg-[#f7f7f8] shadow-md py-6 px-4"
          }
        >
          <CartCard />
        </div>
      </div>
      {/* <div className="mx-[550px]"></div> */}
    </div>
  );
};

export default Shop;
