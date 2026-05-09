import { motion } from 'framer-motion';
import React from 'react';
import { IconType } from 'react-icons';

interface TechBoxProps {
  icon: IconType;
  name: string;
}

const TechBox: React.FC<TechBoxProps> = ({ icon: Icon, name }) => {
  return (
    <motion.button
      className="flex items-center justify-center gap-3 bg-[#1a1a1a] border border-gray-700 rounded-lg w-full h-[50px] px-4 py-3 transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-cyan-400"
      whileHover={{
        scale: 1.05,
        boxShadow: '0px 5px 15px rgba(255, 255, 255, 0.1)',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Technology: ${name}`}
    >
      <Icon className="w-5 h-5 text-gray-200 flex-shrink-0" />
      <span className="text-gray-200 text-sm font-medium truncate min-w-0">{name}</span>
    </motion.button>
  );
};

export default TechBox;
