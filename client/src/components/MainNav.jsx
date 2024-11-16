import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  // console.log(Boolean(user))

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const logoutToHome = () => {
    toast.success("LogOut is Success!!! ", {
      position: "bottom-left",
      autoClose: 1500,
    });
    logout();
    navigate("/");
  };

  // console.log(carts.length);
  return (
    <div className="relative">
      <nav className="flex fixed z-50 top-0 right-0 left-0 items-center justify-between flex-wrap bg-black px-6 py-4">
        <div className="flex items-center">
          <div className="flex items-center flex-shrink-0 text-white mr-4">
            <Link className="flex items-center flex-row" to={"/"}>
              <img
                className="fill-current h-8 w-8"
                src="../../public/OG.png"
                alt=""
              />
              <span className="hidden md:block font-semibold text-xl tracking-tight">
                COMDEE
              </span>
            </Link>
          </div>
          <div className=" ml-6 text-sm flex">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "block mt-2 sm:mt-4 lg:inline-block lg:mt-0 text-red-500 hover:text-red-700 mr-4"
                  : "block mt-2 sm:mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/shop"}
              className={({ isActive }) =>
                isActive
                  ? "block mt-2 sm:mt-4 lg:inline-block lg:mt-0 text-red-500 hover:text-red-700 mr-4"
                  : "block mt-2 sm:mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4"
              }
            >
              Store
            </NavLink>
            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                isActive
                  ? "block mt-2 sm:mt-4 lg:inline-block lg:mt-0 text-red-500 hover:text-red-700 mr-4"
                  : "block mt-2 sm:mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4"
              }
            >
              Cart
              {carts.length > 0 && (
                <span className="absolute top-2 rounded-full bg-pink-50 px-2 py-1 text-xs font-medium text-pink-800 ring-1 ring-inset ring-pink-700/10">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>
        </div>

        <div className="text-sm ">
          {user ? (
            <div className="flex items-center px-2 rounded-full  text-white font-semibold hover:text-black hover:bg-white mt-4 lg:mt-0">
              <button
                onClick={toggleDropDown}
                className="flex justify-center items-center gap-1  hover:duration-200 hover:text-black"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://i.redd.it/gd7suscsqp781.jpg"
                />
                <ChevronDown />
              </button>

              {isOpen && (
                <div className="absolute mt-8 md:mt-4 rounded-md right-[23px] border top-10 bg-white shadow-md">
                  <Link
                    to={"/user/history"}
                    className="block px-3 py-2 text-black hover:text-white border-b rounded-t-md hover:bg-black  "
                  >
                    History
                  </Link>
                  <Link
                    to={"/"}
                    className="block px-3 py-2 text-black hover:text-white rounded-b-md hover:bg-black  "
                    onClick={() => {
                      logoutToHome();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1  font-semibold">
              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  isActive
                    ? "inline-block text-sm px-4 py-2 leading-none border-white border-transparent text-red-500 bg-zinc-50 rounded mt-4 lg:mt-0"
                    : "inline-block text-sm px-4 py-2 leading-none  text-white border-white hover:border-transparent hover:text-black rounded hover:bg-white mt-4 lg:mt-0"
                }
              >
                <button>Register</button>
              </NavLink>

              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive
                    ? "inline-block text-sm px-4 py-2 leading-none border-white border-transparent text-red-500 bg-zinc-50 rounded mt-4 lg:mt-0"
                    : "inline-block text-sm px-4 py-2 leading-none  text-white border-white hover:border-transparent hover:text-black rounded hover:bg-white mt-4 lg:mt-0"
                }
              >
                <button>Login</button>
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MainNav;
