import { Link, useLocation } from 'react-router-dom';
import GlassCard from './GlassCard';
import Logo from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCalendarDay, faCircleCheck, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop/Tablet Sidebar*/}
      <GlassCard 
        className="group hidden md:flex flex-col h-screen justify-between text-charcoal transition-all duration-200 ease-in-out w-[70px] hover:w-[210px] overflow-hidden !min-w-0"
      >
        <div className="flex flex-col">
          <div className="flex items-center h-[60px] mb-2 pl-[15px]">
            <Logo 
              size="md" 
              showText={false}
            />
            <span className="ml-2 font-bold text-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Taskify.
            </span>
          </div>
          
          <Link 
            to="/dashboard/home" 
            className={`flex items-center h-12 pl-[25px] gap-3 hover:bg-babyPurple transition-all duration-300 ${
              isActive('/dashboard/home') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faHouse} className="text-lg w-5 flex-shrink-0" />
            <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Home
            </span>
          </Link>
          <Link 
            to="/dashboard/today" 
            className={`flex items-center h-12 pl-[25px] gap-3 hover:bg-babyPurple transition-all duration-300 ${
              isActive('/dashboard/today') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faCalendarDay} className="text-lg w-5 flex-shrink-0" />
            <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Today
            </span>
          </Link>
          <Link 
            to="/dashboard/completed" 
            className={`flex items-center h-12 pl-[25px] gap-3 hover:bg-babyPurple transition-all duration-300 ${
              isActive('/dashboard/completed') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faCircleCheck} className="text-lg w-5 flex-shrink-0" />
            <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Complete
            </span>
          </Link>
          <Link 
            to="/dashboard/account" 
            className={`flex items-center h-12 pl-[25px] gap-3 hover:bg-babyPurple transition-all duration-300 ${
              isActive('/dashboard/account') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="text-lg w-5 flex-shrink-0" />
            <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Account
            </span>
          </Link>
        </div>
      </GlassCard>

      {/* Mobile Header - shown only on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10">
        <GlassCard className="w-full justify-center items-center px-4 py-3 rounded-none">
          <Logo size="sm" className="text-charcoal" />
        </GlassCard>
      </div>

      {/* Mobile Bottom Nav*/}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10">
        <GlassCard className="w-full items-center py-2 rounded-none gap-2 px-2">
          <Link 
            to="/dashboard/home" 
            className={`flex-1 flex flex-col items-center py-1.5 rounded-lg transition duration-300 gap-0.5 ${
              isActive('/dashboard/home') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faHouse} className="text-lg w-5" />
            <span className="text-[10px]">Home</span>
          </Link>
          <Link 
            to="/dashboard/today" 
            className={`flex-1 flex flex-col items-center py-1.5 rounded-lg transition duration-300 gap-0.5 ${
              isActive('/dashboard/today') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faCalendarDay} className="text-lg w-5" />
            <span className="text-[10px]">Today</span>
          </Link>
          <Link 
            to="/dashboard/completed" 
            className={`flex-1 flex flex-col items-center py-1.5 rounded-lg transition duration-300 gap-0.5 ${
              isActive('/dashboard/completed') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faCircleCheck} className="text-lg w-5" />
            <span className="text-[10px]">Complete</span>
          </Link>
          <Link 
            to="/dashboard/account" 
            className={`flex-1 flex flex-col items-center py-1.5 rounded-lg transition duration-300 gap-0.5 ${
              isActive('/dashboard/account') ? 'bg-babyPurple/50' : ''
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="text-lg w-5" />
            <span className="text-[10px]">Account</span>
          </Link>
        </GlassCard>
      </div>
    </>
  );
}
