import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-xl font-semibold">
        <h1 className="text-white text-xl font-semibold">Library</h1>
      </Link>

      <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600">
        Logout
      </button>
    </header>
  );
}
