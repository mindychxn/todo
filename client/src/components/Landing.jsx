import './landing.css';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';

export default function Landing() {
  const grinchTodos = [
    'Wallow in self pity',
    'Stare into the abyss',
    'Solve world hunger (tell no one)',
    'Jazzercise!',
    'Dinner with me',
    'Wrestle with my self loathing',
  ];
  return (
    <div className="landing-page w-screen h-screen flex justify-center items-center gap-10 py-10 text-charcoal px-20 min-w-min">
      <div className="w-full flex items-center fixed top-0 py-5 px-10">
        <div className="w-1/3">
          <img src={logo} className="h-[52px] aspect-square pb-2" />
        </div>
        <div className="w-1/3 font-bold text-4xl text-center">Taskify.</div>
        <div className="flex justify-end gap-3 text-lg w-1/3">
          <Link to={'/login'}>
            <button className="font-medium py-2 px-4 transition ease-in-out duration-200 hover:scale-105">
              Log In
            </button>
          </Link>
          <Link to={'/register'}>
            <button className="py-2 px-4 bg-babyPink rounded-lg font-medium hover:scale-105 hover:bg-darkPink transition ease-in-out duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-1/2 min-w-min">
        <div className="flex flex-col gap-6 font-bold text-6xl text-nowrap">
          Organize your day
          <div className="flex gap-2">
            with
            <div className="relative w-fit px-2">
              <span className="absolute w-full h-1/2 bg-white opacity-80 bottom-[9px] z-0" />
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue">
                Taskify
              </span>
            </div>
          </div>
        </div>
        <div className="w-3/4 text-xl leading-relaxed font-light">
          Take charge of your day, one to-do at a time! Seamlessly organize your tasks, set
          priorities, and track progress effortlessly.
        </div>
        <Link to="./register">
          <button className="mt-2 w-fit py-2.5 px-6 bg-babyPink rounded-lg text-xl font-medium hover:scale-105 transition ease-in-out duration-300 hover:bg-darkPink ">
            Get Started
          </button>
        </Link>
      </div>
      <GlassCard className="flex-col items-center justify-center gap-8 animate-float1 py-12 px-14">
        <div className="font-semibold text-[26px]">The Grinch's To Do List</div>
        <div className="text-xl space-y-8 w-full">
          {grinchTodos.map((todo, i) => (
            <div className="flex gap-4 items-center" key={i}>
              <div className="mt-2 checkbox-wrapper-13 scale-150 hover:scale-[1.6] transition">
                <input id="c1-13" type="checkbox" />
              </div>
              {todo}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
