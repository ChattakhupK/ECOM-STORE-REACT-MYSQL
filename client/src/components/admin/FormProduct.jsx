import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/products";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";
const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const product = useEcomStore((state) => state.products);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProduct(50);
  }, []);
  //   console.log(product);

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    try {
      const res = await createProduct(token, form);
      toast.success(`Add Product | ${res.data.title} | success!!`);
      setForm(initialState);
      getProduct();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you confirm?")) {
      try {
        const res = await deleteProduct(token, id);
        getProduct();
        console.log(res);
        toast.success("Deleted Product!!");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="shadow-md container mx-auto p-4 bg-white">
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold text-xl mb-2">Product List</h1>
        <div className=" bg-gray-800 p-8 rounded flex gap-5 ">
          <div>
            <p className="text-white font-semibold">Title</p>
            <input
              className="border"
              value={form.title}
              onChange={handleOnChange}
              placeholder="Title"
              name="title"
            />
          </div>
          <div>
            <p className="text-white font-semibold">Description</p>
            <input
              className="border"
              value={form.description}
              onChange={handleOnChange}
              placeholder="Description"
              name="description"
            />
          </div>
          <div>
            <p className="text-white font-semibold">Price</p>
            <input
              className="border"
              value={form.price}
              onChange={handleOnChange}
              placeholder="Price"
              name="price"
              type="number"
            />
          </div>
          <div>
            <p className="text-white font-semibold">Quantity</p>
            <input
              className="border"
              value={form.quantity}
              onChange={handleOnChange}
              placeholder="Quantity"
              name="quantity"
              type="number"
            />
          </div>
          <div className="flex justify-end items-end">
            <select
              className="border p-1"
              name="categoryId"
              onChange={handleOnChange}
              required
              value={form.categoryId}
            >
              <option value="" disabled>
                Please Select
              </option>
              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr />
        {/* Upload img */}
        <Uploadfile form={form} setForm={setForm} />

        <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Add Product
        </button>
        <hr />
        <br />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-center text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Picture
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  description
                </th>
                <th scope="col" className="px-6 py-3">
                  price
                </th>
                <th scope="col" className="px-6 py-3">
                  quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  sold
                </th>
                <th scope="col" className="px-6 py-3">
                  updatedAt
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="flex-col justify-center">
              {product.map((item, index) => {
                return (
                  <>
                    <tr
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      key={index}
                    >
                      <th
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        scope="row"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 flex justify-center">
                        {item.images.length > 0 ? (
                          <img
                            className="w-14 h-14 rounded-lg shadow-md "
                            src={item.images[0].url}
                          />
                        ) : (
                          <div className="w-14 h-14 p-1 flex items-center justify-center bg-gray-200 rounded-md">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 ">{item.description}</td>
                      <td className="px-6 py-4 ">{numberFormat(item.price)}</td>
                      <td className="text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.quantity}
                      </td>
                      <td className="text-center font-medium text-gray-900 whitespace-nowrap dark:text-green-400">
                        {item.sold}
                      </td>
                      <td className="px-6 py-4 ">{dateFormat(item.updatedAt)}</td>
                      <td className="text-center ">
                        <p className="cursor-pointer mb-1 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          <Link to={"/admin/product/" + item.id}>
                            <p>Edit</p>
                          </Link>
                        </p>
                        <p
                          className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                          onClick={() => handleDelete(item.id)}
                        >
                          <p>Del</p>
                        </p>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
