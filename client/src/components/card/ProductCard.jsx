import React from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 p-2 rounded overflow-hidden shadow-lg flex flex-col justify-between hover:scale-105 hover:duration-200"
    >
      <div>
        {item.images && item.images.length > 0 ? (
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            src={item.images[0].url}
            className="w-full hover:scale-105 hover:duration-200"
          />
        ) : (
          <div className="w-full sm:h-[155.75px] md:h-[209px] h-[89px] lg:h-[240px] bg-gray-100 hover:scale-105 hover:duration-200 text-center items-center flex justify-center shadow-sm">
            No Image
          </div>
        )}
      </div>
      <div className="py-2 px-2">
        <p className="truncate text-xl font-semibold">{item.title}</p>
        <p className="truncate text-ellipsis text-sm text-gray-600">
          {item.description}
        </p>
      </div>
      <div className="px-2 flex items-center justify-between">
        <span className=" font-semibold">฿{numberFormat(item.price)}</span>
        <button
          onClick={() => actionAddtoCart(item)}
          className=" bg-blue-500 flex gap-2 justify-center items-center rounded-md p-2 hover:bg-blue-600 shadow-md"
        >
          <ShoppingCart className="w-5" />
          <span className="hidden md:inline">Add to cart</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
