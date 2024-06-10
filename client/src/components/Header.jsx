import { Link, useNavigate } from "react-router-dom";
import Button from "./shared/Button";
import { useLogoutUserRequestMutation } from "../services/authApi";
import logout from "../store/features/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Header() {
  const [logoutUser, { data }] = useLogoutUserRequestMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logoutUser();
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(logout());

      Cookies.remove("token");
      navigate("/login");
    }
  });

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-xl font-semibold">
        <h1 className="text-white text-xl font-semibold">Library</h1>
      </Link>

      <Button onClick={handleLogout}>Logout</Button>
    </header>
  );
}
