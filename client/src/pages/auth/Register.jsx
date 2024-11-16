import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email !!" }),
    password: z
      .string()
      .min(8, { message: "Password must be more than 8 characters. " }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password is not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const navigate = useNavigate();
  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const handleOnChange = (e) => {
  //   console.log(e.target.name, e.target.value);
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const hdlSubmit = async (e) => {
  //   e.preventDefault();
  //   if (form.password !== form.confirmPassword) {
  //     return alert("Password is not match!!!");
  //   }

  //   //send to back
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/register", form);
  //     console.log(res);
  //     toast.success(res.data);
  //     navigate("/login");
  //   } catch (err) {
  //     const errMsg = err.response?.data?.message;
  //     toast.error(errMsg, { position: "bottom-left", autoClose: 1500 });
  //     console.log(err);
  //   }
  // };

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score;
    // console.log(passwordScore);
    // if (passwordScore < 2) {
    //   toast.warning("Password is not Strong. ", {
    //     position: "bottom-left",
    //     autoClose: 1500,
    //   });
    //   return;
    // }
    // console.log(zxcvbn(data.password).score);

    //send to back
    try {
      const res = await axios.post("http://localhost:5000/api/register", data);
      console.log(res);
      toast.success(res.data, { position: "bottom-left", autoClose: 1500 });
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg, { position: "bottom-left", autoClose: 1500 });
      console.log(err);
    }
  };

  const score = passwordScore;

  return (
    <div className="w-96 mx-auto space-y-4 mt-6 border px-6 py-8 shadow-md ">
      <h1 className="text-center text-2xl font-bold">REGISTER</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2 mb-4">
          <div>
            <span className="font-semibold">Email</span>
          </div>
          <div>
            <input
              className={`block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${
                errors.email && "bg-red-100"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm opacity-80">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <span className="font-semibold">Password</span>
          </div>
          <div>
            <input
              type="password"
              className={`block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${
                errors.password && "bg-red-100"
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm opacity-80">
                {errors.password.message}
              </p>
            )}
          </div>
          {watch().password?.length > 0 && (
            <div className="flex ">
              {Array.from(Array(score).keys()).map((item, index) => (
                <span className="w-1/4 mr-1 px-0" key={index}>
                  <div
                    className={`h-3 rounded-sm ${
                      passwordScore <= 1
                        ? "bg-red-500"
                        : passwordScore < 4
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                </span>
              ))}
            </div>
          )}

          <div>
            <span className="font-semibold">Confirm Password</span>
          </div>
          <div>
            <input
              type="password"
              className={`block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${
                errors.confirmPassword && "bg-red-100"
              }`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm opacity-80">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {/* <input
            onChange={handleOnChange}
            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            placeholder=" Confirm Password"
            name="confirmPassword"
            type="text"
          /> */}
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
