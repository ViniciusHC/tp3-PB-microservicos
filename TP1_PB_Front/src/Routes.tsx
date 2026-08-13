
import { Routes, Route } from 'react-router-dom';
import App from './Pages/App';
import ForumPage from './Pages/Forum';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/forum" element={<ForumPage />} />
    </Routes>
  );
}