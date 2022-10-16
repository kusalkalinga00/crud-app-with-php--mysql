import React from "react";
import { useState, useRef , useEffect } from "react";
import axios from "axios";
import { useNavigate ,useParams } from "react-router-dom";

function EditUser() {
  const navigate = useNavigate({});
  const [inputs, setInput] = useState([]);
  const {id} = useParams();
  
  function getUser() {
    axios.get(`http://localhost:80/api/user/${id}`).then(function (response) {
      console.log(response.data);
      setInput(response.data);
    });
  }

  useEffect(() => {
    getUser();
  }, []);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    firstRef.current.value = "";
    secondRef.current.value = "";
    thirdRef.current.value = "";
    axios
      .put(`http://localhost:80/api/user/${id}/edit`, inputs)
      .then(function (response) {
        console.log(response.data);
        navigate("/");
      });
  };

  return (
    <div className="item-center text-center">
      <h1 className="text-3xl pb-5">Edit Users</h1>
      <form onSubmit={handleSubmit}>
        <table className="inline-block table-auto border-separate border-spacing-5 border border-slate-500">
          <tbody>
            <tr>
              <th>
                <label>Name: </label>
              </th>
              <td>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  ref={firstRef}
                  value={inputs.name}
                  className="bg-slate-300 rounded-lg px-1 py-2 border-2  border-cyan-400 w-[400px]"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Email: </label>
              </th>
              <td>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  ref={secondRef}
                  value={inputs.email}
                  className="bg-slate-300 rounded-lg px-1 py-2 border-2  border-cyan-400 w-[400px]"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Mobile: </label>
              </th>
              <td>
                <input
                  type="number"
                  name="mobile"
                  onChange={handleChange}
                  ref={thirdRef}
                  value={inputs.mobile}
                  className="bg-slate-300 rounded-lg px-1 py-2 border-2  border-cyan-400 w-[400px]"
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="right">
                <button className="border-2 border-cyan-400 px-3 py-2 rounded-lg hover:scale-110 ">
                  save
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}


export default EditUser