import Navbar from "./components/shared/navbar/Navbar";
import Footer from "./components/shared/footer/Footer";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/public/Landing";
import Login from "./features/auth/Login";
import Signup from "./pages/student/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
