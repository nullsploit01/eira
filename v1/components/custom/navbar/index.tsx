import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
  ];

  return (
    <nav className="flex justify-center mt-5" role="navigation" aria-label="Main Navigation">
      <div className="flex relative bg-[#222222] p-2 rounded-full shadow-xl">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative px-8 py-3 rounded-full text-md font-semibold text-gray-200 hover:text-white transition"
              aria-current={isActive ? 'page' : undefined}
              tabIndex={0}
            >
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 bg-gray-700 rounded-full shadow-lg"
                  transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
