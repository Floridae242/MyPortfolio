import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/ui/NavBar';
import { Home } from './components/Home';
import { CaseStudy } from './components/case-study/CaseStudy';
import { AdminGateway } from './components/ui/AdminGateway';

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminGateway />} />
      <Route path="*" element={<><NavBar /><Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/:slug" element={<CaseStudy />} />
      </Routes></>} />
    </Routes>
  );
}
