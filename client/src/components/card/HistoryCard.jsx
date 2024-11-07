import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";
const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrders(token);
  }, []);

  const handleGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        // console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusColor = (staus) => {
    switch (staus) {
      case "Not Process":
        return "bg-gray-200";
      case "Processing":
        return "bg-yellow-200";
      case "Completed":
        return "bg-green-200";
      case "Cancelled":
        return "bg-red-200";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Order List</h1>
      {/* border */}
      <div className="space-y-6">
        {/* card  //Loop Order */}
        {orders?.map((item, index) => {
          return (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md ">
              {/* header */}
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-sm">Order date</p>
                  <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                </div>
                <div>
                  <span
                    className={`${getStatusColor(
                      item.orderStatus
                    )} px-4 py-1 rounded-full`}
                  >
                    {item.orderStatus}
                  </span>
                </div>
              </div>
              {/* table //Loop Product */}
              <div>
                <table className="border w-full text-center">
                  <thead>
                    <tr className="bg-gray-300">
                      <th>PRODUCT</th>
                      <th>PRICE</th>
                      <th>Amount</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-left w-72">
                            {item.product.title}
                          </td>
                          <td className="w-72">
                            {numberFormat(item.product.price)}
                          </td>
                          <td className="w-72">{item.count}</td>
                          <td className="w-72">
                            {numberFormat(item.product.price * item.count)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Total */}
              <div>
                <div className="text-right">
                  <p>Total Amount</p>
                  <p>{numberFormat(item.cartTotal)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
