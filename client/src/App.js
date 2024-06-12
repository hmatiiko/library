import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import EditBook from "./pages/EditBook";
import ProtectedRoute from "./helpers/router/ProtectedRoute";
import AuthRoute from "./helpers/router/AuthRoute";

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <AuthRoute>
            <Home />
          </AuthRoute>
        }
      />
      <Route
        path="/book/:id"
        element={
          <AuthRoute>
            <EditBook />
          </AuthRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute>
            <Registration />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
