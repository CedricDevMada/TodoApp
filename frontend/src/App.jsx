import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handAddTodo = (e) => {
    e.preventDefault();

    if (!title) return;

    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setTitle("");
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  const toggleComplete = (todo) => {
    fetch(`http://localhost:5000/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        completed: !todo.completed,
      }),
    })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((t) =>
            t.id === todo.id ? { ...t, completed: !t.completed } : t,
          ),
        );
      })
      .catch((err) => console.error(err));
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handAddTodo}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
