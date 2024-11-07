import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const actionSearchfilters = useEcomStore(
    (state) => state.actionSearchFilters
  );

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setprice] = useState([1000, 30000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  //search text

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchfilters({ query: text });
      } else {
        getProduct();
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [text]);

  //search by category

  const handleCheck = (e) => {
    const inCheck = e.target.value; // value Checkbox
    const inState = [...categorySelected]; // []
    const findCheck = inState.indexOf(inCheck); //

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchfilters({ category: inState });
    } else {
      getProduct();
    }
  };
  console.log(categorySelected);

  //search by price
  useEffect(() => {
    actionSearchfilters({ price });
  }, [ok]);
  const handlePrice = (value) => {
    console.log(value);
    setprice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  return (
    <div className="">
      <div className="bg-white shadow-xl min-w-[240px] py-6 px-4 font-[sans-serif]">
        {/* <h1 className="text-black text-left text-sm font-bold">Search product</h1> */}
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          className="border rounded-md w-full mb-3 px-2"
          placeholder="search..."
        />
        <hr className="h-0.5 my-2 dark:bg-gray-700" />
        <div>
          <h1 className="text-black text-base font-bold mb-1">Category</h1>
          <div>
            {categories.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input onChange={handleCheck} value={item.id} type="checkbox" />
                <label className="text-sm">{item.name}</label>
              </div>
            ))}
          </div>
        </div>
        <hr className="h-0.5 my-2 dark:bg-gray-700" />
        <div>
          <h1 className="text-black text-base font-bold mb-1">Price</h1>
          <div>
            <div className="flex justify-between">
              <span>Min: {price[0]}</span>
              <span>Max: {price[1]}</span>
            </div>
            <Slider
              defaultValue={[1000, 30000]}
              onChange={handlePrice}
              range
              min={0}
              max={100000}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
