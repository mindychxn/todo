import { Link, useLocation } from 'react-router-dom';
import GlassCard from './GlassCard';
import Logo from './Logo';

export default function Nav({ authenticate }) {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop/Tablet Sidebar*/}
      <GlassCard 
        className="group hidden md:flex flex-col h-screen justify-between text-charcoal transition-all duration-300 ease-in-out w-[70px] hover:w-[220px]"
      >
        <div className="flex flex-col">
          <div className="flex items-center pt-5 pb-4 px-4 mb-2">
            <Logo 
              size="md" 
              showText={true} 
              className="overflow-hidden transition-all duration-300 w-0 opacity-0 group-hover:w-auto group-hover:opacity-100" 
            />
            <Logo 
              size="md" 
              showText={false} 
              className="transition-all duration-300 opacity-100 group-hover:w-0 group-hover:opacity-0" 
            />
          </div>
          
          <Link 
            to="/dashboard/home" 
            className={`flex items-center gap-3 py-3 px-4 hover:bg-babyPurple duration-300 ${
              isActive('/dashboard/home') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <span className="text-lg flex-shrink-0">🏠</span>
            <span className="transition-all duration-300 whitespace-nowrap w-0 opacity-0 overflow-hidden group-hover:w-auto group-hover:opacity-100">
              Home
            </span>
          </Link>
          <Link 
            to="/dashboard/today" 
            className={`flex items-center gap-3 py-3 px-4 hover:bg-babyPurple duration-300 ${
              isActive('/dashboard/today') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <span className="text-lg flex-shrink-0">📅</span>
            <span className="transition-all duration-300 whitespace-nowrap w-0 opacity-0 overflow-hidden group-hover:w-auto group-hover:opacity-100">
              Today
            </span>
          </Link>
          <Link 
            to="/dashboard/completed" 
            className={`flex items-center gap-3 py-3 px-4 hover:bg-babyPurple duration-300 ${
              isActive('/dashboard/completed') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <span className="text-lg flex-shrink-0">✓</span>
            <span className="transition-all duration-300 whitespace-nowrap w-0 opacity-0 overflow-hidden group-hover:w-auto group-hover:opacity-100">
              Completed
            </span>
          </Link>
        </div>
        
        <button
          className="mb-7 mx-2 px-2 group-hover:mx-4 group-hover:px-4 bg-babyPink py-2 rounded-lg hover:scale-105 transition-all ease-in-out duration-300 hover:bg-darkPink text-charcoal overflow-hidden"
          onClick={() => (authenticate(false), localStorage.removeItem('token'))}
        >
          <span className="group-hover:hidden">🚪</span>
          <span className="hidden group-hover:inline">Log out</span>
        </button>
      </GlassCard>

      {/* Mobile Header - shown only on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10">
        <GlassCard className="w-full justify-between items-center px-4 py-3 rounded-none">
          <Logo size="sm" className="text-charcoal" />
          <button
            className="bg-babyPink px-3 py-1.5 rounded-lg text-sm hover:bg-darkPink text-charcoal"
            onClick={() => (authenticate(false), localStorage.removeItem('token'))}
          >
            Log out
          </button>
        </GlassCard>
      </div>

      {/* Mobile Bottom Nav*/}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10">
        <GlassCard className="w-full justify-around items-center py-2 rounded-none">
          <Link 
            to="/dashboard/home" 
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition duration-300 ${
              isActive('/dashboard/home') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <span className="text-xl">🏠</span>
            <span className="text-xs text-charcoal">Home</span>
          </Link>
          <Link 
            to="/dashboard/today" 
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition duration-300 ${
              isActive('/dashboard/today') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <span className="text-xl">📅</span>
            <span className="text-xs text-charcoal">Today</span>
          </Link>
          <Link 
            to="/dashboard/completed" 
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition duration-300 ${
              isActive('/dashboard/completed') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <span className="text-xl">✓</span>
            <span className="text-xs text-charcoal">Completed</span>
          </Link>
        </GlassCard>
      </div>
    </>
  );
}
