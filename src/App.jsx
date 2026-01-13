import Navbar from "./components/shared/navbar/Navbar";
import Footer from "./components/shared/footer/Footer";
import "./index.css";
import {Routes, Route} from "react-router-dom";
import Landing from "./pages/public/Landing";
import AboutUs from "./pages/public/AboutUs";
import Executivepage from "./pages/public/Executivepage";
import Events from "./pages/public/Events";
import Login from "./features/auth/Login";
import Signup from "./pages/student/Signup";
import PublicLayout from "./layouts/PublicLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/executives" element={<Executivepage />} />
          <Route path="/events" element={<Events />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
