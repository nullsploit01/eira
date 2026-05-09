import Footer from '../footer';
import NavBar from '../navbar';
import { Helmet } from 'react-helmet-async';

import company from '@/constants/company';
import self from '@/constants/self';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      <Helmet>
        <meta
          name="description"
          content="Welcome to my portfolio! I specialize in backend development, DevOps, and frontend technologies. Check out my projects and experience."
        />
        <meta
          name="keywords"
          content="Portfolio, Developer, Backend, DevOps, Frontend, JavaScript, Python"
        />
        <meta name="author" content={self.NAME} />
        <meta property="og:title" content={`${self.NAME} | ${company.JOBTITLE}`} />
        <meta
          property="og:description"
          content="Welcome to my portfolio! Explore my projects, experience, and skills in backend development, DevOps, and frontend."
        />
        <meta property="og:image" content="https://nullsploit.in/favicon-32x32.png" />
        <meta property="og:url" content="https://nullsploit.in" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={`${self.NAME} | ${company.JOBTITLE}`} />
        <meta
          name="twitter:description"
          content="Check out my portfolio showcasing my work in backend development, DevOps, and frontend technologies."
        />
        <meta name="twitter:image" content="https://nullsploit.in/favicon-32x32.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
