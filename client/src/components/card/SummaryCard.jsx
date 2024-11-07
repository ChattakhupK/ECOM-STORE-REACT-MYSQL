import React, { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";
const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  const handleGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        // console.log(res);
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveAddress = () => {
    if (!address) {
      return toast.warning("Please fill address", {
        position: "bottom-left",
        autoClose: 1500,
      });
    }
    saveAddress(token, address)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message, {
          position: "bottom-left",
          autoClose: 1500,
        });
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetUserCart(token);
  }, []);

  // console.log(products);

  const handleGoToPaymant = () => {
    if (!addressSaved) {
      return toast.warning("Please fill address");
    }
    navigate("/user/payment");
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-warp gap-4">
        {/* left */}
        <div className="w-2/4">
          <div className="bg-gray-100 p-4 rounded-md space-y-2">
            <h2 className="font-bold text-lg">Shipping Address</h2>
            <textarea
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address..."
              className="w-full p-2"
            ></textarea>
            <button
              onClick={handleSaveAddress}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Save Address
            </button>
          </div>
        </div>

        {/* right */}
        <div className="w-2/4">
          <div className="bg-white p-4 border shadow-md space-y-2">
            <h2 className="font-bold text-lg">Summary</h2>

            {/* item list */}
            <div>
              {products?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-end mb-4"
                >
                  <div>
                    <p className="font-semibold">{item.product.title}</p>
                    <p className="text-sm">
                      Amount : {item.count} x {numberFormat(item.price)}{" "}
                    </p>
                  </div>
                  <div>
                    <p className="text-red-500 font-semibold">
                      {numberFormat(item.product.price * item.count)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="m-4" />
            <div>
              <div className="flex justify-between">
                <p>Shipping rate</p>
                <p>0.00</p>
              </div>
              <div className="flex justify-between">
                <p>Discount code</p>
                <p>0.00</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-bold text-lg">Net Total</p>
                <p className="text-red-500 font-bold text-lg">
                  {numberFormat(cartTotal)}
                </p>
              </div>
            </div>
            <hr />
            <div>
              <button
                onClick={handleGoToPaymant}
                // disabled={!addressSaved}
                className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
