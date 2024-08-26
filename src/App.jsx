import { Route, Routes } from 'react-router-dom'
import './index.css'
import ProtectedRoutes from './components/layout/ProtectedRoutes'
import SignIn from './pages/SignIn'
import Payments from './pages/Payments'
import Layout from './components/layout/layout'
import SignUp from './pages/SignUp'
function App() {

  let user = localStorage.getItem('user') ? localStorage.getItem('user') : false;

  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/payments' element={<Layout><Payments /></Layout>} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
