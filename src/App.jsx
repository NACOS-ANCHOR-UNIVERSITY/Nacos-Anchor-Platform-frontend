// src/App.jsx
import {Routes, Route} from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout";
import UploadResourcePage from "./features/library/pages/UploadResourcePage";

function App() {
  return (
    <Routes>
      {/* All Student Pages use the StudentLayout (and get the Navbar for free) */}
      <Route element={<StudentLayout />}>
        <Route
          path="/student/resources/upload"
          element={<UploadResourcePage />}
        />
        {/* Add other pages here later, e.g., <Route path="/student/dashboard" ... /> */}
      </Route>
    </Routes>
  );
}

export default App;
