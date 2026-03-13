import { Link, useLocation } from 'react-router-dom';
import GlassCard from './GlassCard';
import Logo from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCalendarDay, faCircleCheck, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Nav({ authenticate }) {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop/Tablet Sidebar*/}
      <GlassCard 
        className="group hidden md:flex flex-col h-screen justify-between text-charcoal transition-all duration-300 ease-in-out w-[70px] hover:w-[220px] overflow-hidden !min-w-0"
      >
        <div className="flex flex-col">
          <div className="flex items-center pt-5 pb-4 mb-2 pl-[15px]">
            <Logo 
              size="md" 
              showText={false}
              className="flex-shrink-0"
            />
            <span className="ml-2 font-bold text-2xl whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              Taskify.
            </span>
          </div>
          
          <Link 
            to="/dashboard/home" 
            className={`flex items-center gap-3 py-3 pl-[22px] hover:bg-babyPurple transition-colors duration-300 ${
              isActive('/dashboard/home') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faHouse} className="text-lg flex-shrink-0 w-5" />
            <span className="whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              Home
            </span>
          </Link>
          <Link 
            to="/dashboard/today" 
            className={`flex items-center gap-3 py-3 pl-[22px] hover:bg-babyPurple transition-colors duration-300 ${
              isActive('/dashboard/today') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faCalendarDay} className="text-lg flex-shrink-0 w-5" />
            <span className="whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              Today
            </span>
          </Link>
          <Link 
            to="/dashboard/completed" 
            className={`flex items-center gap-3 py-3 pl-[22px] hover:bg-babyPurple transition-colors duration-300 ${
              isActive('/dashboard/completed') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faCircleCheck} className="text-lg flex-shrink-0 w-5" />
            <span className="whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              Completed
            </span>
          </Link>
        </div>
        
        <button
          className="flex items-center gap-3 py-3 pl-[22px] mb-4 hover:bg-babyPink transition-colors duration-300"
          onClick={() => (authenticate(false), localStorage.removeItem('token'))}
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="text-lg flex-shrink-0 w-5" />
          <span className="whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            Log out
          </span>
        </button>
      </GlassCard>

      {/* Mobile Header - shown only on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10">
        <GlassCard className="w-full justify-between items-center px-4 py-3 rounded-none">
          <Logo size="sm" className="text-charcoal" />
          <button
            className="bg-babyPink px-3 py-1.5 rounded-lg text-sm hover:bg-darkPink text-charcoal flex items-center gap-2"
            onClick={() => (authenticate(false), localStorage.removeItem('token'))}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
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
            <FontAwesomeIcon icon={faHouse} className="text-xl" />
            <span className="text-xs text-charcoal">Home</span>
          </Link>
          <Link 
            to="/dashboard/today" 
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition duration-300 ${
              isActive('/dashboard/today') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faCalendarDay} className="text-xl" />
            <span className="text-xs text-charcoal">Today</span>
          </Link>
          <Link 
            to="/dashboard/completed" 
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition duration-300 ${
              isActive('/dashboard/completed') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faCircleCheck} className="text-xl" />
            <span className="text-xs text-charcoal">Completed</span>
          </Link>
        </GlassCard>
      </div>
    </>
  );
}
