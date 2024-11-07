import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert("Password is not match!!!");
    }

    //send to back
    try {
      const res = await axios.post("http://localhost:5000/api/register", form);
      console.log(res);
      toast.success(res.data);
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg, { position: "bottom-left", autoClose: 1500 });
      console.log(err);
    }
  };

  return (
    <div className="w-96 mx-auto space-y-4 mt-6 border px-6 py-8 ">
      <h1 className="text-center text-2xl font-bold">REGISTER</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2 mb-4">
          <div>
            <span className="font-semibold">Email</span>
          </div>
          <input
            onChange={handleOnChange}
            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            placeholder=" E-mail"
            name="email"
            type="email"
          />
          <div>
            <span className="font-semibold">Password</span>
          </div>
          <input
            onChange={handleOnChange}
            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            placeholder=" Password"
            name="password"
            type="text"
          />
          <div>
            <span className="font-semibold">Confirm Password</span>
          </div>
          <input
            onChange={handleOnChange}
            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            placeholder=" Confirm Password"
            name="confirmPassword"
            type="text"
          />
        </div>
        <hr />
        <div>
          <button className="bg-blue-500 mr-4 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
          <Link to={"/login"} className="text-blue-500 hover:text-black">
            login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
