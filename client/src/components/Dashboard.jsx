import TodoList from './TodoList';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CreateTodo from './CreateTodo';

export default function Dashboard({ authenticate }) {
  const [username, setUsername] = useState('');
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [openCreate, setOpenCreate] = useState(false);

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
  });

  return (
    <div className="bg-gradient1 bg-cover flex w-screen h-screen">
      <Nav authenticate={authenticate} />
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
            className="bg-babyPink py-2 px-2.5 rounded-lg flex items-center gap-2"
          >
            <AddIcon />
            New Task
          </button>
        </div>
        <CreateTodo open={openCreate} onClose={() => setOpenCreate(false)} />
        <div className="opacity-70">Today is {date}.</div>
        <TodoList />
      </div>
    </div>
  );
}
