import TodoList from '../components/todos/TodoList';
import StatusRow from '../components/common/StatusRow';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CreateTodo from '../components/todos/CreateTodo';
import { getTodos, deleteTodo, getUsername } from '../api/api';
import dayjs from 'dayjs';


export default function Home() {
  const [username, setUsername] = useState('');
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [openCreate, setOpenCreate] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const todayCount = Array.isArray(todos) ? todos.filter(t => dayjs(t.due).isSame(dayjs(), 'day')).length : 0;
  const overdueCount = Array.isArray(todos) ? todos.filter(t => dayjs(t.due).isBefore(dayjs(), 'day')).length : 0;

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const [todoData, completedData] = await Promise.all([
          getTodos(false),
          getTodos(true)
        ]);
        setTodos(Array.isArray(todoData) ? todoData : []);
        setCompletedTasks(Array.isArray(completedData) ? completedData : []);
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    };

    loadTodos();
  }, []);

  const onDelete = async (id) => {
    try {
      await deleteTodo(id);
      const todoData = await getTodos(false);
      setTodos(Array.isArray(todoData) ? todoData : []); 
    } catch (error) {
      console.error(error);
    }
  }

  const onEdit = async () => {
    try {
      const [todoData, completedData] = await Promise.all([
        getTodos(false),
        getTodos(true)
      ]);
      setTodos(Array.isArray(todoData) ? todoData : []);
      setCompletedTasks(Array.isArray(completedData) ? completedData : []);
    } catch (error) {
      console.error(error);
    }
  }

  const getName = async () => {
    const name = await getUsername();
    setUsername(name);
  };

  const onCreateModalClose = async(added) => {
    if (added) {
      const todoData = await getTodos(false);
      setTodos(Array.isArray(todoData) ? todoData : []);
    }
    setOpenCreate(false);
  }

  useEffect(() => {
    getName();

    const intervalId = setInterval(() => {
      const hour = new Date().getHours();
      setCurrentHour(hour); // Update the current hour in the state
    }, 60000); // Update every minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const greeting =
    currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex w-full h-full min-h-screen">
      <div className="flex flex-col gap-4 md:gap-6 w-full h-full text-charcoal py-4 px-4 md:py-7 md:px-14">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start w-full gap-3">
          <div className="flex flex-col">
            <div className="font-semibold text-2xl md:text-3xl flex flex-wrap items-baseline">
              <span className="whitespace-nowrap">{greeting},</span>
              <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue">
                {username ? username.charAt(0).toUpperCase() + username.slice(1) : ''}.
              </span>
            </div>
            <div className="opacity-70 mt-1">Today is {date}.</div>
          </div>
          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center justify-center gap-2 w-full md:w-fit py-2 pl-3 pr-4 bg-babyBlue rounded-lg text-md hover:scale-105 transition ease-in-out duration-300 hover:bg-darkBlue text-charcoal"
          >
            <AddIcon />
            New Task
          </button>
        </div>
        <CreateTodo open={openCreate} onClose={onCreateModalClose} />
        <StatusRow 
          overdueCount={overdueCount}
          todayCount={todayCount}
          incompleteCount={todos.length}
          completedCount={completedTasks.length}
        />
        <TodoList todos={todos} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}
