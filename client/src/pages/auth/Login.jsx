import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
  console.log("user from zustand", user);

  const [form, setForm] = useState({
    email: "",
    password: "",
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
    try {
      const res = await actionLogin(form);
      toast.success("WELCOME TO MEECOM", {
        position: "bottom-left",
        autoClose: 1500,
      });
      const role = res.data.payload.role;
      roleRedirect(role);
      navigate('/')
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg, { position: "bottom-left", autoClose: 1500 });
    }
    //send to back
    // try {
    //   const res = await axios.post("http://localhost:5000/api/login", form);
    //   console.log(res);
    //   toast.success(res.data);
    // } catch (err) {
    //   const errMsg = err.response?.data?.message;
    //   toast.error(errMsg);
    //   console.log(err);
    // }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="w-96 mx-auto space-y-4 mt-6 border px-6 py-8 shadow-md">
      <h1 className="text-center text-2xl font-bold">LOGIN</h1>
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
        </div>
        <hr />
        <div>
          <button className="bg-blue-500 mr-4 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
          <Link to={"/register"} className="text-blue-500 hover:text-black">
            register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
