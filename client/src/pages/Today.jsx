import { useEffect, useState } from 'react';
import GlassCard from '../components/common/GlassCard';
import Loading from '../components/common/Loading';
import EditTodo from '../components/todos/EditTodo';
import { getToday, deleteTodo, editTodo } from '../api/api';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function TodayItem({ todo, onComplete, onDelete, onEdit }) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="flex flex-col w-full bg-white/60 py-4 px-6 rounded-lg gap-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="mt-1 checkbox-wrapper-13 scale-150 hover:scale-[1.6] transition flex-shrink-0">
            <input type="checkbox" onChange={() => onComplete(todo)} />
          </div>
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="font-medium break-words">{todo.title}</span>
              {todo.priority && (
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${
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

export default function Today() {
  const [todayTodos, setTodayTodos] = useState([]);
  const [completedToday, setCompletedToday] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadToday = async () => {
    const [incomplete, completed] = await Promise.all([
      getToday(false),
      getToday(true)
    ]);
    setTodayTodos(Array.isArray(incomplete) ? incomplete : []);
    setCompletedToday(Array.isArray(completed) ? completed : []);
    setLoading(false);
  };

  useEffect(() => {
    loadToday();
  }, []);

  const onComplete = async (todo) => {
    await editTodo(todo.todo_id, todo.title, todo.notes, todo.due, todo.priority, todo.remind_at, true);
    loadToday();
  };

  const onDelete = async (id) => {
    await deleteTodo(id);
    loadToday();
  };

  const totalToday = todayTodos.length + completedToday.length;
  const progressPercent = totalToday > 0 ? (completedToday.length / totalToday) * 100 : 0;

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex w-full h-full min-h-screen">
      <div className="flex flex-col gap-4 md:gap-6 w-full h-full py-4 px-4 md:py-7 md:px-14">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loading size="lg" text="Loading today's tasks..." />
          </div>
        ) : (
          <>
            <div>
              <div className="font-semibold text-2xl md:text-3xl">
                Today's{' '}
                <span className="relative inline-block italic">
                  <span className="absolute w-full h-1/2 bg-white opacity-80 bottom-[2px] left-0 z-0" />
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue text-[1.75rem] md:text-[2.125rem]">
                    Focus
                  </span>
                </span>
              </div>
              <div className="text-gray-500 mt-1">{date}</div>
            </div>

            {/* Progress Bar - only show if there are tasks today */}
            {totalToday > 0 && (
              <GlassCard className="w-full flex-col gap-3 p-6 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Daily Progress</span>
                  <span className="text-sm text-gray-500">
                    {completedToday.length} of {totalToday} tasks
                  </span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {progressPercent === 100 && (
                  <div className="text-sm text-green-600 font-medium">All done for today! 🎉</div>
                )}
              </GlassCard>
            )}

            {/* Today's Tasks */}
            <GlassCard className="w-full flex-col flex-1 gap-4 p-10 rounded-lg">
              <div className="font-medium text-xl">Tasks for Today</div>
              {todayTodos.length > 0 ? todayTodos.map((todo) => (
                <TodayItem 
                  key={todo.todo_id} 
                  todo={todo} 
                  onComplete={onComplete}
                  onDelete={onDelete}
                  onEdit={loadToday}
                />
              )) : (
                <div className="text-gray-400 font-light">
                  {totalToday > 0 
                    ? "All tasks completed for today!" 
                    : "No tasks scheduled for today."}
                </div>
              )}
            </GlassCard>
          </>
        )}
      </div>
    </div>
  );
}