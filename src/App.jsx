
import {Routes, Route} from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout";
import UploadResourcePage from "./features/library/pages/UploadResourcePage";

function App() {
  return (
    <Routes>
     
      <Route element={<StudentLayout />}>
        <Route
          path="/student/resources/upload"
          element={<UploadResourcePage />}
        />
        
      </Route>
    </Routes>
  );
}

export default App;
