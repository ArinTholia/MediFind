import { useNavigate } from "react-router-dom";

function LogoutButton() {

    const navigate = useNavigate();

    const handleLogout = () => {

        // Remove login status
        localStorage.removeItem("isLoggedIn");

        // Redirect to login page
        navigate("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="logout-button"
        >
            Logout
        </button>
    );
}

export default LogoutButton;