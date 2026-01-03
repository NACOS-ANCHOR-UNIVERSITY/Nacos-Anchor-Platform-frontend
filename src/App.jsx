import { useState } from 'react'
import StudentPaymentReceipt from './features/student/dashboard/StudentPayementReceipt'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StudentPaymentReceipt />
    </>
  )
}

export default App
