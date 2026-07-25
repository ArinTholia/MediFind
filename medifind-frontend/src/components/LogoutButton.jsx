import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };
  
  return (
    <button onClick={handleLogout} className="btn-logout">Logout</button>
  );
}

export default LogoutButton;