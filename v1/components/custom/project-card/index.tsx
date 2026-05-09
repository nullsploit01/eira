import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';

import self from '@/constants/self';
import { IProject } from '@/models/project';

const ProjectCard: React.FC<{ project: IProject }> = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ perspective: 1000 }}>
      <motion.article
        className="bg-gradient-to-b from-[#171717] hover:cursor-pointer to-[#252525] border border-gray-800 text-gray-300 rounded-xl shadow-lg p-5 flex flex-col md:flex-row gap-6 max-w-2xl transition-all duration-300"
        onClick={() => setExpanded(!expanded)}
        role="button"
        aria-expanded={expanded}
        whileHover={{
          scale: 1.05,
          boxShadow: '0px 15px 30px rgba(0, 255, 255, 0.2)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <header className="w-full md:w-2/5 flex items-center justify-center relative">
          {project.image ? (
            <img
              loading="lazy"
              src={project.image}
              alt={`Screenshot of ${project.name}`}
              className="rounded-lg object-cover w-full h-auto shadow-xl"
              style={{
                boxShadow: '0 10px 20px rgba(0, 255, 255, 0.1)',
                transform: 'translateY(-5px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            />
          ) : (
            <div
              className="bg-gray-700 rounded-lg w-full h-32 flex items-center justify-center text-gray-400"
              aria-label="No image available"
            >
              No Image
            </div>
          )}
        </header>

        <section className="w-full md:w-3/5 flex flex-col text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
          <p
            className={`text-gray-400 text-sm mt-2 transition-all duration-300 ${
              expanded ? '' : 'line-clamp-3'
            }`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            {project.tags?.split(',').map((tag, index) => (
              <span
                key={index}
                className="bg-gray-800 text-gray-300 px-2 py-1 text-xs rounded-md"
                aria-label={`Technology used: ${tag.trim()}`}
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          <footer className="mt-5 flex gap-4 justify-center md:justify-start">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-gray-400 hover:text-cyan-400 transition transform hover:scale-110"
                aria-label={`View ${project.name} on GitHub`}
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={20} />
              </a>
            )}

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-gray-400 hover:text-cyan-400 transition transform hover:scale-110"
                aria-label={`Visit ${project.name} live demo`}
                onClick={(e) => e.stopPropagation()}
              >
                <FaLink size={20} />
              </a>
            )}
          </footer>
        </section>

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: project.name,
            description: project.description,
            image: project.image,
            url: project.url,
            author: {
              '@type': 'Person',
              name: self.NAME,
            },
            applicationCategory: 'Developer Tools',
            operatingSystem: 'All',
          })}
        </script>
      </motion.article>
    </div>
  );
};

export default ProjectCard;
