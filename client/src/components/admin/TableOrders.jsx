import React, { useState, useEffect } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormatTh, dateFormat } from "../../utils/dateformat";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        console.log(res);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res);
        toast.success("Update Status Success!!!");
        handleGetOrder(token);
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
    <div className="shadow-md container mx-auto p-4 bg-white">
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border">
              <th>No</th>
              <th>UserName</th>
              <th>Date</th>
              <th>Product</th>
              <th>Total</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => {
              console.log(item);
              return (
                <tr key={index} className="border">
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <p>{item.orderedBy.email}</p>
                    <p>{item.orderedBy.address}</p>
                  </td>

                  <td>{dateFormat(item.createdAt)}</td>

                  <td className="px-2 py-4">
                    {item.products?.map((item, index) => {
                      return (
                        <li key={index}>
                          {item.product.title}{" "}
                          <span className="text-sm">
                            {item.count} x {numberFormat(item.product.price)}
                          </span>
                        </li>
                      );
                    })}
                  </td>

                  <td>{numberFormat(item.cartTotal)}</td>

                  <td>
                    <span
                      className={`${getStatusColor(
                        item.orderStatus
                      )} px-2 py-1 rounded-full`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>

                  <td>
                    <select
                      value={item.orderStatus}
                      onChange={(e) =>
                        handleChangeOrderStatus(token, item.id, e.target.value)
                      }
                    >
                      <option>Not Process</option>
                      <option>Processing</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
