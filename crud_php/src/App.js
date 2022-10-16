import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListUser from "./components/ListUser";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <div className="App">
      <div className="text-center">
        <p className="text-3xl mt-12">React CRUD using PHP and MYSQL</p>
      </div>
      <BrowserRouter>
        <nav>
          <ul className="flex items-center w-full justify-center space-x-10 p-12">
            <li className="text-xl border-2 border-cyan-400 px-5 py-3 hover:bg-[#14b8a6]">
              <Link to="/">List Users</Link>
            </li>
            <li className="text-xl border-2 border-cyan-400 px-5 py-3 hover:bg-[#14b8a6]">
              <Link to="user/create">Create User</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<ListUser />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/:id/edit" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
