import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import self from '@/constants/self';

const socials = [
  { icon: FaGithub, link: self.GITHUB, label: 'GitHub' },
  { icon: FaLinkedin, link: self.LINKEDIN, label: 'LinkedIn' },
  { icon: FaTwitter, link: self.X, label: 'Twitter' },
  { icon: FaEnvelope, link: `mailto:${self.EMAIL}`, label: 'Email' },
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.footer
      ref={ref}
      className="text-gray-400 py-6 flex flex-col items-center justify-center"
      role="contentinfo"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={
          isInView ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } : {}
        }
        className="w-full flex flex-col items-center"
      >
        <div className="flex gap-6 mb-4 items-center justify-center" aria-label="Social Links">
          {socials.map(({ icon: Icon, link, label }, index) => (
            <motion.a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-cyan-400 transition"
              aria-label={label}
            >
              <Icon size={28} className="inline-block" aria-hidden="true" />
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView ? { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } } : {}
          }
          className="text-sm text-center w-full"
        >
          © {new Date().getFullYear()} Harshal D. All rights reserved.
        </motion.p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
