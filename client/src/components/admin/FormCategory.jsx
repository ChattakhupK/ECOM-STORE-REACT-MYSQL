import React, { useEffect, useState } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  // const [categories, setCategories] = useState([]);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("Please fill data");
    }
    try {
      const res = await createCategory(token, { name });
      console.log(res.data.name);
      toast.success(`Add Category | ${res.data.name} | success!!`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      console.log(res);
      toast.success(`Deleted | ${res.data.name} | success!`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="shadow-md container mx-auto p-4 bg-white">
      <h1>Category Management</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          className="border"
          type="text"
        />
        <button className="bg-blue-500 p-1">Add Category</button>
      </form>
      <hr />
      <ul className="list-none">
        {categories.map((item, index) => (
          <li className="flex justify-between my-2" key={index}>
            <span>{item.name}</span>
            <button
              className="bg-red-500 text-white p-1"
              onClick={() => handleRemove(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
