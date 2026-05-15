import {useEffect,useState} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import "../App.css";

function Todos() {

  const [todos, setTodos] =useState([]);

  const [text, setText] =useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const getTodos = async () => {

    try {

      const res = await axios.get("http://localhost:3000/getTodos",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setTodos(res.data.todos);

    } catch (err) {

      alert(err.response.data.message);

    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const createTodo = async () => {

    try {

      await axios.post("http://localhost:3000/createTodo",
        {
          text,
          status: "pending",
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setText("");

      getTodos();

    } catch (err) {

      alert(err.response.data.message);

    }
  };


  const updateTodo = async (id) => {

    try {

      await axios.patch(`http://localhost:3000/updateTodo/${id}`,
        {
          status: "success",
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      getTodos();

    } catch (err) {

      alert(err.response.data.message);

    }
  };

  const deleteTodo = async (id) => {

    try {

      await axios.delete(`http://localhost:3000/deleteTodo/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      getTodos();

    } catch (err) {

      alert(err.response.data.message);

    }
  };

  const logout = () => {

   localStorage.removeItem("accessToken");

localStorage.removeItem("refreshToken");

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
          placeholder="Enter your todo to do"
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

  </div>
);
}

export default Todos;