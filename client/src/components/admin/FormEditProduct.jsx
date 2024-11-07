import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import {
  createProduct,
  readProduct,
  listProduct,
  updateProduct,
} from "../../api/products";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";
const initialState = {
  title: "MSI PRO B760M-PDDR5",
  description: "goodwork",
  price: 1050,
  quantity: 10,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      console.log("res from backend", res);
      setForm(res.data);
    } catch (err) {
      console.log("Err fetch data ", err);
    }
  };

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`Edit Product | ${res.data.title} | success!!`);
      navigate('/admin/product')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="shadow-md container mx-auto p-4 bg-white">
      <form onSubmit={handleSubmit}>
        <h1>Product List</h1>
        <input
          className="border"
          value={form.title}
          onChange={handleOnChange}
          placeholder="Title"
          name="title"
        />
        <input
          className="border"
          value={form.description}
          onChange={handleOnChange}
          placeholder="Description"
          name="description"
        />
        <input
          className="border"
          value={form.price}
          onChange={handleOnChange}
          placeholder="Price"
          name="price"
          type="number"
        />
        <input
          className="border"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="Quantity"
          name="quantity"
          type="number"
        />
        <select
          className="border"
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
        <hr />
        {/* Upload img */}
        <Uploadfile form={form} setForm={setForm} />

        <button className="bg-blue-500 rounded-md p-1  px-4">Edit</button>
        <hr />
        <br />
      </form>
    </div>
  );
};

export default FormEditProduct;
