import { useEffect, useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  // get all todos
  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos');
      const jsonData = await response.json(); // parse
      setTodos(jsonData);
      console.log(todos);
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
    <div className="flex flex-col gap-4 w-3/4">
      <div className="font-semibold">List To Dos</div>
      {todos.map((todo) => (
        <div key={todo.id} className="flex justify-between w-full bg-white py-2 px-4 rounded-lg">
          <label className="flex gap-2">
            <input type="checkbox" />
            <div>{todo.description.charAt(0).toUpperCase() + todo.description.slice(1)}</div>
          </label>
          <div className="flex gap-2">
            <button className="bg-blue-100">Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
