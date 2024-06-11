import { Link, useNavigate } from "react-router-dom";
import Button from "./shared/Button";
import { logout } from "../store/features/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-xl font-semibold">
        <h1 className="text-white text-xl font-semibold">Library</h1>
      </Link>

      <Button onClick={handleLogout}>Logout</Button>
    </header>
  );
}
