import { useState } from 'react';
import EditTodo from './EditTodo';
import GlassCard from '../common/GlassCard';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { editTodo } from '../../api/api';

function TodoItem({ todo, onComplete, onDelete, onEdit }) {
  const [showNotes, setShowNotes] = useState(false);
  
  const isOverdue = todo.due && new Date(todo.due.split('T')[0]) < new Date(new Date().toLocaleDateString('en-CA'));

  return (
    <div className="flex flex-col w-full bg-white/60 py-4 px-6 rounded-lg gap-2">
      <div className="flex flex-col gap-1">
        {isOverdue && (
          <div className="flex items-center gap-1 text-red-600 text-xs font-medium">
            <ErrorOutlineIcon fontSize="small" />
            Overdue
          </div>
        )}
        <div className="flex items-center gap-2">
          {todo.due && (
            <span className={`text-sm ${isOverdue ? 'text-red-400' : 'text-gray-400'}`}>
              {new Date(todo.due.split('T')[0] + 'T12:00:00').toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          )}
          {todo.priority && (
            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
              todo.priority === 'high' 
                ? 'bg-red-100 text-red-600' 
                : todo.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-green-100 text-green-600'
            }`}>
              {todo.priority}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="mt-1 checkbox-wrapper-13 scale-150 hover:scale-[1.6] transition flex-shrink-0">
            <input type="checkbox" onChange={() => onComplete(todo)} />
          </div>
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <div className="font-medium break-words overflow-hidden">{todo.title}</div>
            {todo.notes && (
              <>
                <button 
                  onClick={() => setShowNotes(!showNotes)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition mt-1 w-fit"
                >
                  {showNotes ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                  {showNotes ? 'Hide notes' : 'Show notes'}
                </button>
                {showNotes && (
                  <div className="text-sm text-gray-500 mt-2 whitespace-pre-wrap [overflow-wrap:break-word] [word-break:normal] w-full">
                    {todo.notes}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center flex-shrink-0">
          <EditTodo todo={todo} onEdit={onEdit} />
          <button
            className="hover:scale-105 transition ease-in-out duration-300 text-gray-500 hover:text-charcoal"
            onClick={() => onDelete(todo.todo_id)}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TodoList({todos, onDelete, onEdit}) {

  const onComplete = async(todo) => {
    await editTodo(todo.todo_id, todo.title, todo.notes, todo.due, todo.priority, todo.remind_at, true);
    onEdit();
  }

  return (
    <GlassCard className="w-full flex-col flex-1 gap-4 p-10 rounded-lg">
      <div className="font-medium text-xl">All Tasks</div>
      {todos.length > 0 ? todos.map((todo) => (
        <TodoItem 
          key={todo.todo_id}
          todo={todo}
          onComplete={onComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )) : <div className='text-gray-400 font-light'>You currently have no tasks.</div>}
    </GlassCard>
  );
}
