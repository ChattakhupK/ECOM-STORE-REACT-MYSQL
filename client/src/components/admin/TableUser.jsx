import React, { useEffect, useState } from "react";
import {
  getListAllUser,
  changeUserStatus,
  changeUserRole,
} from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
const TableUser = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    handleGetUsers(token);
    console.log(users);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUser(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("Update Status Success!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("Update Role Success!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="shadow-md container mx-auto p-4 bg-white">
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>No</th>
            <th>Email</th>
            {/* <th>Date modified</th> */}
            <th>Role</th>
            <th>Status </th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.email}</td>
              {/* <td>{item.updatedAt}</td> */}

              <td>
                <select
                  onChange={(e) =>
                    handleChangeUserRole(item.id, e.target.value)
                  }
                  value={item.role}
                >
                  <option>user</option>
                  <option>admin</option>
                </select>
              </td>

              <td>{item.enabled ? "Enabled" : "Disable"}</td>
              <td>
                <button
                  className="bg-blue-300 p-1 rounded-md shadow-md"
                  onClick={() => handleChangeUserStatus(item.id, item.enabled)}
                >
                  {item.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
