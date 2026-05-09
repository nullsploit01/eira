import { motion } from 'framer-motion';
import { useState } from 'react';

type ExperienceType = {
  role: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
};

const ExperienceCard: React.FC<{ exp: ExperienceType; index: number }> = ({ exp, index }) => {
  const [expanded, setExpanded] = useState(false);

  const responsibilitiesToShow = expanded ? exp.responsibilities : exp.responsibilities.slice(0, 2);

  return (
    <motion.article
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0px 8px 20px rgba(0, 255, 255, 0.2)',
      }}
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer bg-gradient-to-r from-[#1a1a1a] to-[#222222] border-l-4 border-cyan-500 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
      aria-expanded={expanded}
      role="button"
      aria-labelledby={`experience-title-${index}`}
    >
      <h3 id={`experience-title-${index}`} className="text-2xl font-bold text-gray-100 mb-1">
        {exp.role}
      </h3>

      <div className="flex justify-between items-center">
        <p className="text-gray-400">
          {exp.company} · {exp.location}
        </p>
        <p className="text-sm text-gray-500">{exp.duration}</p>
      </div>

      <motion.ul
        className="mt-4 list-disc list-inside text-gray-300 space-y-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        {responsibilitiesToShow.map((task, i) => (
          <motion.li
            key={i}
            className="leading-relaxed"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          >
            {task}
          </motion.li>
        ))}
        {!expanded && exp.responsibilities.length > 2 && (
          <li className="text-gray-500 italic">...Read more</li>
        )}
      </motion.ul>
    </motion.article>
  );
};

export default ExperienceCard;
