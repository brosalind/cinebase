import { Nav, Image } from 'react-bootstrap'
import { Link, NavLink, redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai'
import '../assets/sidebar.css'
import { RiLogoutBoxRLine, RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineLocalMovies } from 'react-icons/md'
import { PiPopcornBold } from 'react-icons/pi'
import { LuHome } from 'react-icons/lu'

function sidebar() {
  const navigate = useNavigate()

  function logout() {
    console.log("logout")
    localStorage.removeItem("access_token")
    navigate('/')
  }
  return (
    <Nav className="flex-column pt-5 " style={{'--bs-nav-link-color': '#000000'}}>
       <ul className="nav flex-column">
       <Image src="../src/assets/logo.png" style={{'width': '200px', 'marginTop': '-40px'}}/>
       </ul>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin/dashboard" className="nav-link fw-bold" ><LuHome className="icon"></LuHome> Dashboard</NavLink>
        </li>
      </ul>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin/movies" className="nav-link fw-bold"><MdOutlineLocalMovies className="icon"></MdOutlineLocalMovies> Movies</NavLink>
        </li>
      </ul>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin/genres" className="nav-link fw-bold"><PiPopcornBold className="icon"></PiPopcornBold> Genres</NavLink>
        </li>
      </ul>
      <h6
        className="sidebar-heading px-3 mt-4 mb-1 text-muted text-uppercase">
        Account</h6>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin/register" className="nav-link fw-bold"><RiAccountCircleLine className="icon"></RiAccountCircleLine> Register Admin</NavLink>
        </li>
      </ul>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link fw-bold" onClick={() => logout()}><RiLogoutBoxRLine className="icon"></RiLogoutBoxRLine> Log Out</a>
        </li>
      </ul>

    </Nav>
  )
}

export default sidebar