import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaClinicMedical } from 'react-icons/fa';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollClose = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScrollClose);
    return () => window.removeEventListener('scroll', handleScrollClose);
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={handleNavLinkClick}>
          <FaClinicMedical className="brand-icon" />
          <span className="brand-text">MediFind</span>
        </Link>
        
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/" end className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick}>Home</NavLink>
          <NavLink to="/medicines" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick}>Medicines</NavLink>
          {token && <NavLink to="/dashboard" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleNavLinkClick}>Dashboard</NavLink>}
        </div>
        
        <div className={`nav-actions ${menuOpen ? 'active' : ''}`}>
          {!token ? (
            <>
              <Link to="/login" className="nav-auth-btn login" onClick={handleNavLinkClick}>Login</Link>
              <Link to="/register" className="nav-auth-btn register" onClick={handleNavLinkClick}>Register</Link>
            </>
          ) : (
            <>
              <div className="nav-user-badge">
                <div className="user-avatar-circle">{username?.charAt(0)?.toUpperCase() || 'U'}</div>
                <span>{username || 'User'}</span>
              </div>
              <button onClick={() => { handleLogout(); handleNavLinkClick(); }} className="nav-auth-btn logout">Logout</button>
            </>
          )}
        </div>
        
        <button className={`mobile-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;