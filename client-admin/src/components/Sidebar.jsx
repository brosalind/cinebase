import { Nav } from 'react-bootstrap'
import { Link, NavLink, redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
function sidebar() {
  const navigate = useNavigate()

  function logout(){
    console.log("logout")
    localStorage.removeItem("access_token")
    navigate('/')
  }
  return (
    <Nav className="flex-column pt-5 ml-n5">
      <NavLink to="/admin/movies">Dashboard</NavLink>
      <NavLink to="/admin/movies">Movies</NavLink>
      <NavLink to="/admin/genres">Genres</NavLink>
      <hr>
      </hr>
      <NavLink to="/admin/register">Register Admin</NavLink>
      {/* <NavLink onClick={()=>logout()}>
        Logout</NavLink> */}
        <button onClick={()=>logout()}> Logout</button>
        
    </Nav>
  )
}

export default sidebar