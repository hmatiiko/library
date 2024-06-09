import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/book/:id" element={<EditBook />} />
      <Route element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
}

export default App;
