import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from "react-router-dom";
import { numberFormat } from "../../utils/number";
import { motion, AnimatePresence } from "framer-motion";
const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  return (
    <AnimatePresence initial={false}>
      {carts.length && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {carts.length > 0 ? (
            <div>
              <h1 className="text-2xl font-semibold mb-1">Cart</h1>
              <div
                className="max-h-[550px] overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-200
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400"
              >
                {/* Border */}
                {carts.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={index}
                    className="bg-white p-2 rounded-md shadow-md mb-4 "
                  >
                    <div className="flex justify-between mb-2 items-center">
                      <div className="flex gap-2 items-center">
                        {item.images && item.images.length > 0 ? (
                          <img
                            className="w-16 h-16 rounded"
                            src={item.images[0].url}
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded text-center flex items-center font-light">
                            No Image
                          </div>
                        )}

                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm">{item.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => actionRemoveProduct(item.id)}
                        className="text-red-500 p-2"
                      >
                        <Trash2 />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="border rounded-sm px-2 py-1 flex items-center">
                        <button
                          onClick={() =>
                            actionUpdateQuantity(item.id, item.count - 1)
                          }
                          className="border px-1 bg-gray-100 rounded-sm hover:bg-gray-200"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4">{item.count}</span>
                        <button
                          onClick={() =>
                            actionUpdateQuantity(item.id, item.count + 1)
                          }
                          className="border px-1 bg-gray-100 rounded-sm hover:bg-gray-200"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="font-semibold text-blue-500">
                        {numberFormat(item.price * item.count)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="border mt-2 p-2 border-gray-300">
                {/* Total */}
                <div className="flex justify-between my-4">
                  <span>Total</span>
                  <span>{numberFormat(getTotalPrice())}</span>
                </div>
                {/* Button */}
                <Link to="/cart">
                  <button className="mt-2 bg-green-500 py-2 rounded-md shadow-md w-full hover:bg-green-600">
                    Continue
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartCard;
