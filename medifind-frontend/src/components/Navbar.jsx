import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  // Check login status
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    navigate("/login");
    window.location.reload();

  };

  return (

    <nav className="navbar">

      <h2 className="logo">MediFind</h2>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/medicines">Medicines</Link>
        </li>

        {isLoggedIn ? (

          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <button
                className="nav-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>

        ) : (

          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>

        )}

      </ul>

    </nav>

  );
}

export default Navbar;