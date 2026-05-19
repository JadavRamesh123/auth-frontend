import { useEffect, useState } from "react";

import api from "./axiosInstance";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


import "../App.css";

function Todos() {

  const [todos, setTodos] = useState([]);

  const [text, setText] = useState("");

  const navigate = useNavigate();

  // GET TODOS
  const getTodos = async () => {

    try {

      const res = await api.get("/getTodos");

      setTodos(res.data.todos);

    } catch (err) {

      toast.error("Failed To Fetch Todos ❌");

    }
  };

  useEffect(() => {

    getTodos();

  }, []);

  // CREATE TODO
  const createTodo = async () => {

    try {

      if (!text.trim()) {

        toast.error("Please Enter Todo");

        return;

      }

      await api.post("/createTodo", {
        text,
        status: "pending",
      });

      toast.success("Todo Added Successfully ✅");

      setText("");

      getTodos();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed To Add Todo ❌"
      );

    }
  };

  // UPDATE TODO
  const updateTodo = async (id) => {

    try {

      await api.patch(`/updateTodo/${id}`, {
        status: "success",
      });

      toast.success("Todo Completed ✅");

      getTodos();

    } catch (err) {

      toast.error("Failed To Update Todo ❌");

    }
  };

  // DELETE TODO
  const deleteTodo = async (id) => {

    try {

      await api.delete(`/deleteTodo/${id}`);

      toast.success("Todo Deleted 🗑");

      getTodos();

    } catch (err) {

      toast.error("Failed To Delete Todo ❌");

    }
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("accessToken");

    localStorage.removeItem("refreshToken");

    toast.success("Logged Out");

    navigate("/login");

  };

  return (

    <div className="todo-container">

      <div className="todo-wrapper">

        <h1>
          MY TO DO LIST
        </h1>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

        <div className="todo-input-box">

          <input
            type="text"
            placeholder="Enter your todo"
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
          />

          <button onClick={createTodo}>
            Save
          </button>

        </div>

        <div className="todo-status-box">

          <div className="status-card">

            Todo Done :
            {
              todos.filter(
                (todo) =>
                  todo.status === "success"
              ).length
            }

          </div>

          <div className="status-card">

            Todo On Progress :
            {
              todos.filter(
                (todo) =>
                  todo.status === "pending"
              ).length
            }

          </div>

        </div>

        {
          todos.map((todo) => (

            <div
              className="todo-card"
              key={todo._id}
            >

              <span>
                {todo.text}
              </span>

              <div className="todo-actions">

                <button
                  className={
                    todo.status === "success"
                      ? "done-btn"
                      : "pending-btn"
                  }

                  onClick={() =>
                    updateTodo(todo._id)
                  }

                >

                  {
                    todo.status === "success"
                      ? "✓ Done"
                      : "Pending"
                  }

                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTodo(todo._id)
                  }
                >
                  🗑
                </button>

              </div>

            </div>
          ))
        }

      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

    </div>
  );
}

export default Todos;