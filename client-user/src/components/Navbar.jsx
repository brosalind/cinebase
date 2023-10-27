import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "white" }}>
            <div className="container">
                <div className="row align-items-center w-100">
                    <div className="col-4 text-end">
                        <Link className="nav-link active" to="/">Home</Link>
                    </div>
                    <div className="col-4 text-center">
                        <Link className="navbar-brand" to="/">
                            <img src="../src/assets/logo.png" style={{ width: '200px' }} alt="Logo" />
                        </Link>
                    </div>
                    <div className="col-4 text-start">
                        <Link className="nav-link active" to="/movies">Movies</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
