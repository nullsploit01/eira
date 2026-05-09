import { motion } from 'framer-motion';

import Layout from '@/components/custom/layout';
import company from '@/constants/company';
import self from '@/constants/self';

const HomePage = () => {
  return (
    <Layout>
      <header className="min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', duration: 1, ease: 'easeOut' }}
        >
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl permanent-marker-regular text-gray-100">
            {self.NAME}
          </h1>
          <p className="kalam-regular text-xl mt-3 text-gray-400">
            {company.JOBTITLE}{' '}
            <a
              href={company.LINKEDIN}
              className="text-cyan-400 hover:text-cyan-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{company.SHORT_NAME}
            </a>
          </p>
        </motion.div>
      </header>
    </Layout>
  );
};

export default HomePage;
