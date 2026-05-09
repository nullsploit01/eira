import { Route, Routes } from 'react-router';

import AboutPage from '@/pages/about';
import HomePage from '@/pages/home';
import ProjectsPage from '@/pages/projects';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      {/* <Route path="blogs" element={<BlogsHomePage />} /> */}
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="about" element={<AboutPage />} />
    </Routes>
  );
};

export default RoutesConfig;
