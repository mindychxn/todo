import './landing.css';
import logo from '../assets/logo.svg';

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
    <div className="landing-page w-screen h-screen flex justify-center items-center gap-10 p-10 text-[#405064] px-20">
      <div className="w-full flex items-center fixed top-0 py-5 px-10">
        <div className="w-1/3">
          <img src={logo} className="h-[52px] aspect-square pb-2" />
        </div>
        <div className="w-1/3 font-bold text-4xl text-center">Taskify.</div>
        <div className="flex justify-end gap-5 text-lg w-1/3">
          <button className="font-medium py-2 px-4">Log In</button>
          <button className="py-2 px-4 bg-[#FFD2D8] rounded-lg font-medium">Sign In</button>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-1/2 w-min-fit">
        <div className="flex flex-col gap-6 font-bold text-6xl text-nowrap">
          Organize your day
          <div className="flex gap-2">
            with
            <div className="relative w-fit px-2">
              <span className="absolute w-full h-1/2 bg-white opacity-80 bottom-[9px] z-0" />
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#FFCCCC] via-[#D4B2FF] to-[#BBE2FF]">
                Taskify
              </span>
            </div>
          </div>
        </div>
        <div className="w-3/4 text-xl leading-relaxed font-light">
          Take charge of your day, one to-do at a time! Seamlessly organize your tasks, set
          priorities, and track progress effortlessly.
        </div>
        <button className="mt-2 w-fit py-2.5 px-6 bg-[#FFD2D8] rounded-lg text-xl font-medium">
          Get Started
        </button>
      </div>
      <div className="flex flex-col items-center justify-center bg-white/40 rounded-2xl py-12 px-14 gap-8 backdrop-blur-sm border-white/40 border-2 animate-float1">
        <div className="font-semibold text-[26px]">The Grinch's To Do List</div>
        <div className="text-xl space-y-8 w-full">
          {grinchTodos.map((todo, i) => (
            <div className="flex gap-4 items-center" key={i}>
              <div class="mt-2 checkbox-wrapper-13 scale-150">
                <input id="c1-13" type="checkbox" />
              </div>
              {todo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
