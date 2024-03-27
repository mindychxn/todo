import InputTodo from './InputTodo';
import TodoList from './TodoList';
import Nav from './Nav';

export default function Dashboard({ authenticate }) {
  return (
    <div className="flex w-screen h-screen">
      <Nav />
      <button onClick={() => authenticate(false)}>Logout</button>
      <div className="flex flex-col gap-4 w-full items-center bg-[#f0f0f3] text-slate-600">
        <InputTodo />
        <TodoList />
      </div>
    </div>
  );
}
