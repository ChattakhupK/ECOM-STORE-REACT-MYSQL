import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/products";
import ProductCard from "../card/ProductCard";
const NewProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("createdAt", "desc", 4)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex gap-6 flex-wrap justify-center">
      {data?.map((item, index) => (
        <ProductCard key={index} item={item} />
      ))}
    </div>
  );
};

export default NewProduct;
