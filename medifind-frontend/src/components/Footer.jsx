import { Link } from 'react-router-dom';
import { FaClinicMedical, FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-section">
            <div className="footer-brand">
              <FaClinicMedical /> MediFind
            </div>
            <p className="footer-description">
              An open-source medicine search platform that helps users find medicines,
              check stock availability, and locate nearby pharmacies.
            </p>
            <div className="social-icons">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/medicines" className="footer-link">Medicines</Link>
            <Link to="/login" className="footer-link">Login</Link>
            <Link to="/register" className="footer-link">Register</Link>
          </div>

          {/* Features */}
          <div className="footer-section">
            <h4 className="footer-title">Features</h4>
            <span className="footer-link">Medicine Search</span>
            <span className="footer-link">Stock Availability</span>
            <span className="footer-link">Price Comparison</span>
            <span className="footer-link">Pharmacy Lookup</span>
          </div>

          {/* Project */}
          <div className="footer-section">
            <h4 className="footer-title">Project</h4>
            <span className="footer-link">Built with React & Spring Boot</span>
            <span className="footer-link">MySQL Database</span>
            <span className="footer-link">JWT Authentication</span>
            <div className="footer-contact-item" style={{ marginTop: '0.5rem' }}>
              <FaEnvelope /> medifind.app@gmail.com
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© {new Date().getFullYear()} MediFind. Built as a full-stack project.</p>
          <button className="back-to-top-btn" onClick={scrollToTop}>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;