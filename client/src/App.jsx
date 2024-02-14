import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <div className="flex flex-col gap-4 items-center h-screen bg-[#f0f0f3] text-slate-600">
      <InputTodo />
      <TodoList />
    </div>
  );
}
