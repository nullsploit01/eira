import { motion } from 'framer-motion';

import ExperienceCard from '@/components/custom/experience-card';
import experiences from '@/constants/experience';

const Experience: React.FC = () => {
  return (
    <motion.section
      className="text-gray-300 px-6 sm:px-12 py-5 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
      aria-labelledby="experience-heading"
    >
      <h2
        id="experience-heading"
        className="text-3xl font-semibold text-gray-100 text-center mb-12 border-b border-gray-700 pb-4"
      >
        Experience
      </h2>
      <motion.div
        className="flex flex-col space-y-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <ExperienceCard exp={exp} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Experience;
