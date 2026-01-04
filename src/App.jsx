import StudentSiwesPage from './features/student/dashboard/StudentSiwesPage'
import StudentPaymentReceipt from './features/student/dashboard/StudentPayementReceipt'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<StudentPaymentReceipt />} />
        <Route path={"/Payments"} element={<StudentPaymentReceipt />} />
        <Route path={"/SIWES"} element={<StudentSiwesPage />} />
      </Routes>
    </Router>
  )
}

export default App
