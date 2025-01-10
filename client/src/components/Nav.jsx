import logo from '../assets/checklist.png';

export default function Nav({authenticate}) {
  const tabs = ['Home', 'Today', 'Completed'];

  return (
    <div className="w-1/5 flex flex-col bg-white/40 backdrop-blur-sm h-screen justify-between text-charcoal min-w-fit">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center font-bold text-2xl text-center pt-7 pb-4 px-7 self-center mb-2">
          <img src={logo} className="w-[40px] h-[35px]" />
          Taskify.
        </div>
        {tabs.map((tab, i) => (
          <button className="text-left py-3 px-7 hover:bg-babyPurple/70 duration-300" key={i}>
            {tab}
          </button>
        ))}
      </div>
      <button
        className="mb-7 bg-babyPink mx-6 px-4 py-2 rounded-lg"
        onClick={() => (authenticate(false), localStorage.removeItem('token'))}
      >
        Logout
      </button>
    </div>
  );
}
