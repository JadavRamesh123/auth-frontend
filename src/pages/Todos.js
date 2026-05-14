import {useEffect,useState} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import "../App.css";

function Todos() {

  const [todos, setTodos] =useState([]);

  const [text, setText] =useState("");

  const navigate = useNavigate();

  const token =localStorage.getItem("token");

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

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div>

      <h1>Todo App</h1>

      <button onClick={logout}>
        Logout
      </button>

      <br /><br />

      <input
        type="text"
        placeholder="Enter Todo"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button onClick={createTodo}>
        Add Todo
      </button>

      <br /><br />

      {
        todos.map((todo) => (

          <div key={todo._id}>

            <h3>
              {todo.text}
            </h3>

            <p>
              {todo.status}
            </p>

            <button
              onClick={() =>
                updateTodo(todo._id)
              }
            >
              Update
            </button>

            <button
              onClick={() =>
                deleteTodo(todo._id)
              }
            >
              Delete
            </button>

            <hr />

          </div>
        ))
      }

    </div>
  );
}

export default Todos;