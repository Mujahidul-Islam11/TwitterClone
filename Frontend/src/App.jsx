import { Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import LoginPage from "./pages/auth/login/LoginPage"
import HomePage from "./pages/home/homePage"
import Sidebar from "./components/common/Sidebar"
import RightPanel from "./components/common/RightPanel"
import ProfilePage from "./pages/proflie/ProfilePage"
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function App() {

  const {data, isLoading, error} = useQuery({
    queryKey: ["authUser"],
    queryFn: async() =>{
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });

        if (res.data.error) throw new Error( res.data.error ||"Something went wrong");
       

        return res.data;
      } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
      }
      
    }
  });

  console.log(data)

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