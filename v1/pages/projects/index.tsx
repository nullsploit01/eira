import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import Layout from '@/components/custom/layout';
import ProjectCard from '@/components/custom/project-card';
import { IProject } from '@/models/project';

const ProjectsPage = () => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await import('@/data/projects.json');
      data.default.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
      setProjects(data.default);
    };

    fetchProjects();
  }, []);

  return (
    <Layout>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }}
        className="max-w-4xl mx-auto px-6 sm:px-12 py-12"
        aria-labelledby="projects-heading"
      >
        <h2
          id="projects-heading"
          className="text-4xl font-semibold text-gray-200 text-center mb-10"
        >
          Projects I’ve Built
        </h2>

        <motion.div
          className="flex flex-col items-center justify-center w-full"
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
          {projects.length > 0 ? (
            projects.map((project) => (
              <motion.div
                key={project.id}
                className="w-full flex justify-center my-5"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400">Loading...</p>
          )}
        </motion.div>
      </motion.section>
    </Layout>
  );
};

export default ProjectsPage;
