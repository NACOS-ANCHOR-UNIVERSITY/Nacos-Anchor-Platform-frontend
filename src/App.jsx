// src/App.jsx
import { Routes, Route } from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout";
import LibraryPage from './features/library/pages/LibraryPage';
function App() {
  return (
    <Routes>
      <Route path="/student" element={<StudentLayout />}>
        <Route path="/student/library" element={<LibraryPage />} />
      </Route>
      {/* All Student Pages use the StudentLayout (and get the Navbar for free) */}
    
    </Routes>
  );
}

export default App;
