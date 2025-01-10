import EditTodo from './EditTodo';
import GlassCard from './GlassCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { editTodo } from '../api/api';

export default function TodoList({todos, onDelete, onEdit}) {

  const onComplete = async(todo) => {
    await editTodo(todo.todo_id, todo.description, todo.due, true);
    onEdit();
  }

  return (
    <GlassCard className="w-full flex-col gap-4 p-10">
      <div className="font-medium text-xl">All Tasks</div>
      {todos.length > 0 ? todos.map((todo) => (
        <div
          key={todo.todo_id}
          className="flex justify-between items-center w-full bg-white/60 py-4 px-6 rounded-lg"
        >
          <label className="flex gap-6 items-center w-full">
            <div className="ml-1 mt-2 checkbox-wrapper-13 scale-150 hover:scale-[1.6] transition">
              <input id="c1-13" type="checkbox" onChange={() => onComplete(todo)} />
            </div>
            <div>
              <div className='text-sm text-gray-400'>
                {new Date(todo.due).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div>
              {todo.description}
              </div>
            </div>
          </label>
          <div className="flex gap-2 items-center">
            <EditTodo todo={todo} onEdit={onEdit} />
            <button
              className=" hover:scale-105 transition ease-in-out duration-300 text-gray-500 hover:text-charcoal"
              onClick={() => onDelete(todo.todo_id)}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      )) : <div className='text-gray-400 font-light'>You currently have no tasks.</div>}
    </GlassCard>
  );
}
