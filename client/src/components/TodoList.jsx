import { useEffect, useState } from 'react';
import EditTodo from './EditTodo';
import GlassCard from './GlassCard';
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  //TODO: sorting/filtering
  //get all todos
  const getTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/todos', {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });
      const jsonData = await response.json(); // parse
      console.log(jsonData)
      setTodos(jsonData); // sort from newest to oldest
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    getTodos();
  }, []);

  // delete function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GlassCard className="w-full flex-col gap-4 p-10">
      <div className="font-medium text-xl">All Tasks</div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex justify-between items-center w-full bg-white/60 py-2 px-4 rounded-lg"
        >
          <label className="flex gap-2">
            <input type="checkbox" />
            <div>
              {/* todo.description.charAt(0).toUpperCase() + todo.description.slice(1)} */}
              {todo.description}
            </div>
          </label>
          <div className="flex gap-2">
            <EditTodo todo={todo} />
            <button
              className="bg-babyPink px-4 py-2 rounded-lg"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </GlassCard>
  );
}
