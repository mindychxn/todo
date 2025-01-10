import TodoList from './TodoList';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CreateTodo from './CreateTodo';
import { getTodos, deleteTodo } from '../api/api';
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
    try {
      const res = await fetch('http://localhost:3000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();
      setUsername(parseRes.username);
    } catch (error) {
      console.error(error.message);
    }
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
    <div className="bg-gradient1 bg-cover flex w-screen h-screen">
      <div className="flex flex-col gap-6 w-full text-charcoal py-7 px-14">
        <div className="flex justify-between w-full">
          <div className="font-semibold text-3xl ">
            {greeting},
            <span className="ml-2.5 text-transparent bg-clip-text bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue">
              {username.charAt(0).toUpperCase() + username.slice(1)}.
            </span>
          </div>
          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center gap-2 w-fit py-2 pl-3 pr-4 bg-babyBlue rounded-lg text-md hover:scale-105 transition ease-in-out duration-300 hover:bg-darkBlue
            text-charcoal"
          >
            <AddIcon />
            New Task
          </button>
        </div>
        <CreateTodo open={openCreate} onClose={ onCreateModalClose} />
        <div className="opacity-70">Today is {date}.</div>
        <div className="w-full grid grid-cols-3 gap-2">
          <div className="rounded-lg p-3 flex flex-col justify-center items-center bg-babyBlue">
            You have
            <div className=" text-3xl font-semibold">
              {todayCount}
            </div>  
            tasks today
          </div>
          <div className="justify-center rounded-lg p-3 flex flex-col text-center items-center bg-babyPurple">
            You have 
            <div className="text-3xl font-semibold">
              {todos.length}
            </div> 
            tasks left
          </div>
          <div className="justify-center rounded-lg p-3 flex flex-col text-center items-center bg-babyPink">
            You have completed 
            <div className="text-3xl font-semibold">
              {completeTasks.length}
            </div> 
            tasks
          </div>
        </div>
        <TodoList todos={todos} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}
