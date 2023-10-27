import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import '../assets/navbar.css'

function Navbar() {
    const [isTop, setIsTop] = useState(true);
    const location = useLocation();
    const navigate = useNavigate()

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsTop(false);
        } else {
            setIsTop(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const pageColor = location.pathname === "/movies" || location.pathname === '/search' ? "black" : "white";

    const getLogo = () => {
        if (location.pathname === "/movies" || location.pathname==="/search") {
            return "/src/assets/logo.png";
        } else {
            return "/src/assets/logo-white.png";
        }
    };
    const navbarStyle = {
        color: pageColor,
        opacity: isTop ? 1 : 0,
        transition: "opacity 0.3s"
    };

    const linkStyle = {
        fontFamily: "Poppins, sans-serif",
        color: pageColor,
        fontSize: '18px',
        fontWeight: '500',
        letterSpacing: '3px',
        textTransform: 'uppercase'
    };

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (event) => {
        if (event.key === "Enter") {
          navigate(`/search?query=${searchQuery}`);
        }
      };

    return (
        <div className="row align-items-center w-100 navbar-container" style={navbarStyle}>
            <div className="col-2 text-end">
                <Link className="nav-link active" to="/" style={linkStyle}>
                    Home
                </Link>
            </div>

            <div className="col-2 text-end">
                <Link className="nav-link active" to="/movies" style={linkStyle}>
                    Movies
                </Link>
            </div>
            <div className="col-4 text-center">
                <Link className="navbar-brand" to="/">
                    <img src={getLogo()} style={{ width: '200px' }} alt="Logo" />
                </Link>
            </div>
            <div className="col-4 text-start">
                <Form.Control
                    type="text"
                    placeholder="Search"
                    className={`mr-sm-2 search-box ${location.pathname === "/movies"  ? "placeholder-black" : "placeholder-white"}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyUp={handleSearch}
                    style={{
                        width: '330px',
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        borderBottom: pageColor === "white" ? "1px solid #fff" : "1px solid #000",
                        borderRadius: "0",
                        backgroundColor: "transparent",
                        outline: 'none',
                        color: pageColor === "white" ? "#fff" : "#000",
                        boxShadow: "none"
                      }}
                      
                />
            </div>

        </div>
    );
}

export default Navbar;
