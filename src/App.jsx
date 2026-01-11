import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Executivepage from './pages/public/Executivepage';
import Login from './features/auth/Login';
import  "./index.css"


function App() {
  

  return (

  
      
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
     
    
  )

   

}

export default App
