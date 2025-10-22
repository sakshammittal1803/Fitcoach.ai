import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ currentPage }) => {
  const navigate = useNavigate();

  const navItems = [
    {
      id: 'chat',
      label: 'Coach',
      path: '/chat',
      icon: (
        <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px">
          <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
        </svg>
      )
    },
    {
      id: 'progress',
      label: 'Progress',
      path: '/progress',
      icon: (
        <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px">
          <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM104,144a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32,0a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"></path>
        </svg>
      )
    },
    {
      id: 'rewards',
      label: 'Rewards',
      path: '/rewards',
      icon: (
        <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px">
          <path d="M216,64H176L159.79,25.13a8,8,0,0,0-14.23,0L128,64,110.44,25.13a8,8,0,0,0-14.23,0L80,64H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM40,80H80a8,8,0,0,0,7.12-4.44L104,48l16.88,27.56A8,8,0,0,0,128,80h0a8,8,0,0,0,7.12-4.44L152,48l16.88,27.56A8,8,0,0,0,176,80h40V200H40ZM128,112a32,32,0,1,0,32,32A32,32,0,0,0,128,112Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,128,160Z"></path>
        </svg>
      )
    },
    {
      id: 'shop',
      label: 'Shop',
      path: '/shop',
      icon: (
        <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px">
          <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16H34.05l5.81,29.14A16,16,0,0,0,55.32,72H208.1l-9.11,45.53A24,24,0,0,0,222.14,58.87ZM64,184a24,24,0,1,0,24,24A24,24,0,0,0,64,184Zm128,0a24,24,0,1,0,24,24A24,24,0,0,0,192,184Z"></path>
        </svg>
      )
    },
    {
      id: 'settings',
      label: 'Profile',
      path: '/settings',
      icon: (
        <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px">
          <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
        </svg>
      )
    }
  ];

  return (
    <footer className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg max-w-6xl mx-auto w-full">
      <nav className="flex justify-around items-center h-14 sm:h-16 px-1 sm:px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`relative flex flex-col items-center justify-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-200 ease-out hover:scale-105 active:scale-95 min-w-0 flex-1 ${
              currentPage === item.id
                ? 'text-primary bg-primary/10 dark:bg-primary/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {/* Badge for notifications */}
            {item.badge && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold animate-pulse">
                {item.badge}
              </div>
            )}
            
            {/* Active indicator */}
            {currentPage === item.id && (
              <div className="absolute -top-1 sm:-top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
            )}
            
            <div className={`transition-transform duration-200 ${currentPage === item.id ? 'scale-110' : ''}`}>
              {item.icon}
            </div>
            
            <span className={`text-xs font-medium transition-all duration-200 truncate ${
              currentPage === item.id ? 'font-semibold' : 'font-normal'
            }`}>
              {item.label}
            </span>
            

          </button>
        ))}
      </nav>
      
      {/* E-commerce style bottom accent */}
      <div className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>
    </footer>
  );
};

export default Navigation;