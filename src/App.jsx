import { useEffect, useState } from "react";
import { ToDoProvider } from "./ToDoContext";
// import './App.css'
import TodoForm from "./Components/ToDoFrom";
import TodoItem from "./Components/ToDoItems";

function App() {
  const [todos, setTodos] = useState([]);
  const [sortAsc, setSortAsc] = useState(true); // new state for sorting ascending/descending

  const addToDo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateToDo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleToDo = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Sort todos by task text (todo.todo) based on sortAsc flag
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.todo.toLowerCase() < b.todo.toLowerCase()) return sortAsc ? -1 : 1;
    if (a.todo.toLowerCase() > b.todo.toLowerCase()) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <ToDoProvider
      value={{ todos, addToDo, updateToDo, deleteToDo, toggleToDo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-4 mt-2">
            Manage Your Todos
          </h1>

          {/* Sorting button */}
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setSortAsc((prev) => !prev)}
              className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Sort A-Z {sortAsc ? "▲" : "▼"}
            </button>
          </div>

          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Render sorted todos */}
            {sortedTodos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
