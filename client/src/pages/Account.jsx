import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function Account({ authenticate }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    authenticate(false);
  };

  return (
    <div className="flex w-full h-full min-h-screen">
      <div className="flex flex-col gap-4 md:gap-6 w-full text-charcoal py-4 px-4 md:py-7 md:px-14">
        <div className="font-semibold text-2xl md:text-3xl">Account</div>
        <div className="text-gray-500">Account settings coming soon...</div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-fit px-4 py-2 bg-babyPink rounded-lg hover:scale-105 transition ease-in-out duration-300 hover:bg-darkPink text-charcoal"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Log out
        </button>
      </div>
    </div>
  );
}
