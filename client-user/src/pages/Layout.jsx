import Navbar from "../components/Navbar"
import { Outlet } from 'react-router-dom'
import "../assets/navbar.css"
import Footer from "../components/Footer"
function Layout(){
    return (
        <>
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
        <Footer></Footer>
      </>
    )
}

export default Layout