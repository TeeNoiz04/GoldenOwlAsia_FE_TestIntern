import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ScoreLookup from './pages/ScoreLookup';
import MainLayout from './components/layout/MainLayout';
export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/score-lookup" element={<ScoreLookup />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </MainLayout>
  );
}
