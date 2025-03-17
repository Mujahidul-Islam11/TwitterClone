import { Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import LoginPage from "./pages/auth/login/LoginPage"
import HomePage from "./pages/home/homePage"
import Sidebar from "./components/common/Sidebar"
import RightPanel from "./components/common/RightPanel"
import ProfilePage from "./pages/proflie/ProfilePage"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <div className='flex max-w-6xl mx-auto'>
      <Toaster position="top-center"/>
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile/:username' element={<ProfilePage />} />
      </Routes>
      <RightPanel />
    </div>
  )
}

export default App