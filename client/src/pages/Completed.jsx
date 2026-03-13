import { useEffect, useState } from 'react';
import GlassCard from '../components/common/GlassCard';
import Loading from '../components/common/Loading';
import { getTodos, deleteTodo } from '../api/api';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const motivationalMessages = [
  { text: "You're", highlight: "CRUSHING IT!" },
  { text: "You're on", highlight: "FIRE!" },
  { text: "One step", highlight: "closer..." },
  { text: "You're in the", highlight: "ZONE." },
  { text: "Keep up the", highlight: "MOMENTUM!" },
  { text: "Making", highlight: "progress..." },
  { text: "You're on a", highlight: "ROLL!" },
  { text: "Keep up the", highlight: "GOOD WORK!" },
  { text: "Nice", highlight: "WORK!" },
  { text: "Keep it", highlight: "UP!" },
];

function CompletedItem({ todo, onDelete }) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="flex flex-col w-full bg-white/60 py-4 px-6 rounded-lg gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">
          {new Date(todo.due).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
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
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="font-medium line-through text-gray-400 break-words">{todo.title}</div>
          {todo.notes && (
            <>
              <button 
                onClick={() => setShowNotes(!showNotes)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-500 transition mt-1 w-fit"
              >
                {showNotes ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                {showNotes ? 'Hide notes' : 'Show notes'}
              </button>
              {showNotes && (
                <div className="text-sm text-gray-400 mt-2 line-through whitespace-pre-wrap [overflow-wrap:break-word] [word-break:normal] w-full">
                  {todo.notes}
                </div>
              )}
            </>
          )}
        </div>
        <button
          className="hover:scale-105 transition ease-in-out duration-300 text-gray-500 hover:text-charcoal flex-shrink-0"
          onClick={() => onDelete(todo.todo_id)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default function Completed() {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomIndex] = useState(() => Math.floor(Math.random() * motivationalMessages.length));
  
  const message = completedTodos.length > 0 
    ? motivationalMessages[randomIndex] 
    : { text: "Ready to get", highlight: "started?" };

  const loadCompleted = async () => {
    const data = await getTodos(true);
    setCompletedTodos(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    loadCompleted();
  }, []);

  const onDelete = async (id) => {
    await deleteTodo(id);
    loadCompleted();
  };

  return (
    <div className="flex w-full h-full min-h-screen">
      <div className="flex flex-col gap-4 md:gap-6 w-full h-full py-4 px-4 md:py-7 md:px-14">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loading size="lg" text="Loading your achievements..." />
          </div>
        ) : (
          <>
            <div>
              <div className="font-semibold text-2xl md:text-3xl">
                {message.text}{' '}
                <span className="relative inline-block italic">
                  <span className="absolute w-full h-1/2 bg-white opacity-80 bottom-[2px] left-0 z-0" />
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue">
                    {message.highlight}
                  </span>
                </span>
              </div>
              <div className="text-gray-500 mt-1">
                You've completed {completedTodos.length} {completedTodos.length === 1 ? 'task' : 'tasks'}.
              </div>
            </div>
            <GlassCard className="w-full flex-col flex-1 gap-4 p-10 rounded-lg">
              <div className="font-medium text-xl">Completed Tasks</div>
              {completedTodos.length > 0 ? completedTodos.map((todo) => (
                <CompletedItem key={todo.todo_id} todo={todo} onDelete={onDelete} />
              )) : <div className="text-gray-400 font-light">No completed tasks yet. Get started!</div>}
            </GlassCard>
          </>
        )}
      </div>
    </div>
  );
}