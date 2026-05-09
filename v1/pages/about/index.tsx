import Experience from './experience';
import { motion } from 'framer-motion';

import Layout from '@/components/custom/layout';

const AboutPage = () => {
  return (
    <Layout>
      <motion.header
        className="max-w-4xl mx-auto px-6 sm:px-12 py-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        aria-labelledby="about-heading"
      >
        <h1 id="about-heading" className="text-4xl font-bold text-gray-100 mb-4 text-center">
          About Me
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto text-center">
          Hi, I'm a software engineer and coding instructor passionate about simplifying complex
          technologies. I love creating systems that improve efficiency and teaching practical
          coding skills in Python, JavaScript, and Data Science.
        </p>
      </motion.header>
      <motion.section
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        aria-labelledby="experience-heading"
      >
        <h2 id="experience-heading" className="sr-only">
          Work Experience
        </h2>
        <Experience />
      </motion.section>
    </Layout>
  );
};

export default AboutPage;
