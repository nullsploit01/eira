import { DiMsqlServer } from 'react-icons/di';
import { FaGit, FaGithub, FaHtml5 } from 'react-icons/fa';
import { FaDocker, FaGolang, FaNodeJs, FaPython } from 'react-icons/fa6';
import { IoLogoCss3, IoLogoFirebase, IoLogoJavascript, IoLogoReact } from 'react-icons/io5';
import { LiaNodeJs } from 'react-icons/lia';
import {
  SiDotnet,
  SiExpo,
  SiGooglecloud,
  SiGraphql,
  SiMongodb,
  SiMysql,
  SiOpenai,
  SiPostgresql,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { VscAzure } from 'react-icons/vsc';

const skills = [
  // Backend Skills
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Express', icon: LiaNodeJs },
  { name: 'Golang', icon: FaGolang },
  { name: 'Python', icon: FaPython },
  { name: 'GraphQL', icon: SiGraphql },
  { name: 'C#', icon: TbBrandCSharp },
  { name: '.NET', icon: SiDotnet },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'SQL Server', icon: DiMsqlServer },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MySQL', icon: SiMysql },
  { name: 'Redis', icon: SiRedis },

  // DevOps Skills
  { name: 'Docker', icon: FaDocker },
  { name: 'Git', icon: FaGit },
  { name: 'GitHub', icon: FaGithub },
  { name: 'Firebase', icon: IoLogoFirebase },
  { name: 'Azure', icon: VscAzure },
  { name: 'GCP', icon: SiGooglecloud },

  // Frontend & Mobile Skills
  { name: 'React', icon: IoLogoReact },
  { name: 'React Native', icon: IoLogoReact },
  { name: 'Expo', icon: SiExpo },
  { name: 'HTML', icon: FaHtml5 },
  { name: 'CSS', icon: IoLogoCss3 },
  { name: 'JavaScript', icon: IoLogoJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },

  // AI & LLMs
  { name: 'OpenAI', icon: SiOpenai },
  { name: 'Vertex AI', icon: SiGooglecloud },
] as const;

export default skills;
