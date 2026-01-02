// src/App.jsx
import {Routes, Route} from "react-router-dom";
import LibraryPage from './features/library/pages/LibraryPage';
function App() {
  return (
    <Routes>
      {/* All Student Pages use the StudentLayout (and get the Navbar for free) */}
      <Route path="/student/library" element={<LibraryPage />} />
    </Routes>
  );
}

export default App;
