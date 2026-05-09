import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

import TechBox from '@/components/custom/tech-box';
import skills from '@/constants/skills';

const SkillsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="min-h-screen text-white px-6 sm:px-12 py-16"
      aria-labelledby="skills-heading"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1, transition: { duration: 0.6 } } : {}}
    >
      <div className="max-w-5xl mx-auto">
        <h3
          id="skills-heading"
          className="scroll-m-20 border-b border-gray-600/50 pb-4 text-3xl font-semibold tracking-wide mb-10 text-center text-gray-200 font-nunito"
        >
          What I Work With
        </h3>

        {isInView && (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            aria-label="Skills and Technologies"
          >
            {skills.map((tech) => (
              <motion.div
                key={tech.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <TechBox icon={tech.icon} name={tech.name} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default SkillsSection;
