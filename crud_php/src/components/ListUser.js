import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function ListUsers() {
  const [users, setUsers] = useState([]);

  function getUsers() {
    axios.get("http://localhost:80/api/users/").then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = (id) =>{
    axios
      .delete(`http://localhost:80/api/user/${id}/delete`)
      .then(function (response) {
        console.log(response.data);
        getUsers();
      });
  }

  return (
    <div className="item-center text-center">
      <h1 className="text-3xl pb-5">Users List</h1>
      <table className="inline-block table-auto border-separate border-spacing-5 border border-slate-500">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={key}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>
                <Link
                  to={`user/${user.id}/edit`}
                  className=" border-2 border-cyan-400 px-3 py-2 hover:bg-[#14b8a6] mr-5"
                >
                  Edit
                </Link>
                <button
                  className="border-2 border-cyan-400 px-3 py-1.5 hover:bg-[#14b8a6] mr-5"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListUsers;
