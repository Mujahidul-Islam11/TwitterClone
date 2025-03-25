import { Navigate, Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import LoginPage from "./pages/auth/login/LoginPage"
import HomePage from "./pages/home/homePage"
import Sidebar from "./components/common/Sidebar"
import RightPanel from "./components/common/RightPanel"
import ProfilePage from "./pages/proflie/ProfilePage"
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import LoadingSpinner from "./components/common/LoadingSpinner"
import NotificationPage from "./pages/notification/NotificationPage"

function App() {

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });

        if (res.data.error) throw new Error(res.data.error || "Something went wrong");

        return res.data;
      } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
      }
    },
    retry: false
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>)
  }


  return (
    <div className='flex max-w-6xl mx-auto'>
      <Toaster position="top-center" />
      {authUser && <Sidebar />}
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"}/>} />
        <Route path='/signup' element={authUser ? <Navigate to={"/"} /> : <SignUpPage />} />
        <Route path='/login' element={authUser ? <Navigate to={"/"} /> : <LoginPage />} />
        <Route path='/notifications' element={authUser ? <NotificationPage to={"/"} /> : <LoginPage />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
      </Routes>
      {authUser && <RightPanel />}
    </div>
  )
}

export default App