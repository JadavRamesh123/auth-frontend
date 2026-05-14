import {Routes,Route,Navigate} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Todos from "./pages/Todos";

const PrivateRoute = ({ children }) => {

  const token =
    localStorage.getItem("token");
  return token
    ? children
    : <Navigate to="/login" />;
};

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Navigate to="/register" />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/todos"
        element={
          <PrivateRoute>
            <Todos />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default App;