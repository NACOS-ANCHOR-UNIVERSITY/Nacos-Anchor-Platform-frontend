// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { ContentModerationPage } from './features/content-moderation';

export default function App() {
  return (
    <Routes>
      <Route path="/admin/moderation" element={<ContentModerationPage />} />
      <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />
    </Routes>
  );
}