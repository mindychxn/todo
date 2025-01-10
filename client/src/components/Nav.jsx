import logo from '../assets/checklist.png';
import { Link } from 'react-router-dom';
export default function Nav({authenticate}) {
  const tabs = ['Home', 'Today', 'Completed'];

  return (
    <div className="w-1/5 flex flex-col bg-white/40 backdrop-blur-sm h-screen justify-between text-charcoal min-w-fit">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center font-bold text-2xl text-center pt-7 pb-4 px-7 self-center mb-2">
          <img src={logo} className="w-[40px] h-[35px]" />
          Taskify.
        </div>
        <Link to="/dashboard/home" className="text-left py-3 px-7 hover:bg-babyPurple duration-300">
          Home
        </Link>
        <Link to="/dashboard/today" className="text-left py-3 px-7 hover:bg-babyPurple duration-300">
          Today
        </Link>
        <Link to="/dashboard/completed" className="text-left py-3 px-7 hover:bg-babyPurple duration-300">
          Completed
        </Link>
      </div>
      <button
        className="mb-7 bg-babyPink mx-6 px-4 py-2 rounded-lg hover:scale-105 transition ease-in-out duration-300 hover:bg-darkPink text-charcoal"
        onClick={() => (authenticate(false), localStorage.removeItem('token'))}
      >
        Log out
      </button>
    </div>
  );
}
