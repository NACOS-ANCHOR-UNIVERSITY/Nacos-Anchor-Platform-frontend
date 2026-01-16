// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import ContactPage from './features/contact/ContactPage'; // ✅ Fixed: default import
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

const HomePage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800">NACOS Anchor University</h1>
      <p className="mt-4 text-gray-600">
        Go to <a href="/contact" className="text-nacos-green font-medium">Contact Page</a>
      </p>
    </div>
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;