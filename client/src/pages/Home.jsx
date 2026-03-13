import TodoList from '../components/TodoList';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CreateTodo from '../components/CreateTodo';
import { getTodos, deleteTodo, getUsername } from '../api/api';
import dayjs from 'dayjs';


export default function Home() {
  const [username, setUsername] = useState('');
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [openCreate, setOpenCreate] = useState(false);
  const [todos, setTodos] = useState([]);
  const todayCount = todos.filter(t => dayjs(t.due).isSame(dayjs(), 'day')).length;
  const [completeTasks, setCompleteTasks] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todoData = await getTodos(false); 
        setTodos(todoData); // Set the todos state with the fetched data
        const completedData = await getTodos(true);
        setCompleteTasks(completedData);
        // const today = await getToday();
        // console.log(today)
        //setTotalTasksToday(today);
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
      setTodos(todoData); 
    } catch (error) {
      console.error(error);
    }
  }

  const onEdit = async (id) => {
    try {
      const todoData = await getTodos(false);
      setTodos(todoData); 
      const completedData = await getTodos(true);
      setCompleteTasks(completedData);
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
      // refetch to get updated list
      const todoData = await getTodos(false);
      setTodos(todoData);
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
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col gap-4 md:gap-6 w-full text-charcoal py-4 px-4 md:py-7 md:px-14">
        <div className="flex flex-col md:flex-row justify-between w-full gap-3">
          <div className="font-semibold text-2xl md:text-3xl flex flex-wrap items-baseline">
            <span className="whitespace-nowrap">{greeting},</span>
            <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue">
              {username.charAt(0).toUpperCase() + username.slice(1)}.
            </span>
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
        <div className="opacity-70">Today is {date}.</div>
        <div className="w-full grid grid-cols-3 gap-2 text-sm md:text-base">
          <div className="rounded-lg p-2 md:p-3 flex flex-col justify-center items-center bg-babyBlue text-center">
            <span className="hidden md:inline">You have</span>
            <div className="text-2xl md:text-3xl font-semibold">
              {todayCount}
            </div>  
            <span className="text-xs md:text-base">tasks today</span>
          </div>
          <div className="rounded-lg p-2 md:p-3 flex flex-col justify-center items-center bg-babyPurple text-center">
            <span className="hidden md:inline">You have</span>
            <div className="text-2xl md:text-3xl font-semibold">
              {todos.length}
            </div> 
            <span className="text-xs md:text-base">tasks left</span>
          </div>
          <div className="rounded-lg p-2 md:p-3 flex flex-col justify-center items-center bg-babyPink text-center">
            <span className="hidden md:inline">Completed</span>
            <div className="text-2xl md:text-3xl font-semibold">
              {completeTasks.length}
            </div> 
            <span className="text-xs md:text-base">tasks</span>
          </div>
        </div>
        <TodoList todos={todos} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}
