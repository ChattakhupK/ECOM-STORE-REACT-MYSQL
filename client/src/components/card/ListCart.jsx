import React from "react";
import { List } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const token = useEcomStore((state) => state.token);

  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res);
        toast.success("Order Success!!", {
          position: "bottom-left",
          autoClose: 1500,
        });
        navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
        toast.warning(err.response.data.message, {
          position: "bottom-left",
          autoClose: 1500,
        });
      });
  };

  return (
    <div className="bg-gray-100 m-4 p-4">
      {/* Header */}
      <div className="font-bold text-2xl flex items-center gap-2 mb-4">
        <List size={34} />
        Product List {cart.length}
      </div>
      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* left */}
        <div className="col-span-2">
          {cart.map((item, index) => (
            <div key={index} className="bg-white p-2 rounded-md shadow-md mb-4">
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
                    <p className="text-sm">
                      {numberFormat(item.price)} x {item.count}
                    </p>
                  </div>
                </div>
                <div className="font-semibold mx-4 text-blue-500">
                  {numberFormat(item.price * item.count)}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* right */}
        <div className=" bg-white p-4 shadow-md space-y-4">
          <h2 className="font-bold text-xl mb-2">TOTAL</h2>
          <div className="flex justify-between font-semibold mb-4">
            <span>Total net:</span>
            <span>{numberFormat(getTotalPrice())}</span>
          </div>
          <div className="flex flex-col gap-2">
            {user ? (
              <Link>
                <button
                  disabled={cart.length < 1}
                  onClick={handleSaveCart}
                  className={
                    cart.length < 1
                      ? "bg-gray-300 border text-black text-center py-2 rounded w-full"
                      : "bg-red-500 border text-white text-center py-2 rounded w-full hover:bg-red-700"
                  }
                >
                  Order
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="bg-green-500 border text-white text-center py-2 rounded w-full hover:bg-green-700">
                  Login
                </button>
              </Link>
            )}
            <Link to={"/shop"}>
              <button className="bg-white border text-center rounded py-2 w-full hover:bg-gray-100">
                Edit List
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;

{
  /* <div className=" bg-white p-4 w-72 shadow-md">
<h2 className="font-bold mb-2">TOTAL</h2>
<div className="flex justify-between font-semibold mb-4">
  <div>Total net:</div>
  <div>21000</div>
</div>
<button className="bg-red-500 border text-white text-center mb-1 py-2 rounded w-full hover:bg-red-700">
  Order
</button>
<button className="bg-white border text-center rounded py-2 w-full hover:bg-gray-100">
  Edit List
</button>
</div> */
}
