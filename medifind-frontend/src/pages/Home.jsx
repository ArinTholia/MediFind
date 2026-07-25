import { Link } from 'react-router-dom';
import {
  FaSearch, FaHospital, FaCapsules, FaMapMarkerAlt,
  FaClock, FaShieldAlt, FaHeartbeat, FaUserMd, FaPills,
  FaDollarSign, FaBoxes, FaLock
} from 'react-icons/fa';

function Home() {
  return (
    <div className="home-page">
      {/* =================== HERO =================== */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">🏥 Smart Medicine Search</span>
            <h1 className="hero-title">
              Find Medicines <br />
              <span className="gradient-text">Near You, Instantly</span>
            </h1>
            <p className="hero-subtitle">
              Search medicines, compare pharmacy availability, check stock levels,
              and locate nearby pharmacies — all in one powerful platform.
            </p>
            <div className="hero-actions">
              <Link to="/medicines" className="btn btn-primary">Search Medicines</Link>
              <Link to="/register" className="btn btn-secondary">Get Started Free</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-glow"></div>
            <div className="hero-visual-card float-1">
              <FaSearch style={{ fontSize: '1.8rem', color: '#4F46E5' }} />
              <div>
                <strong>Search</strong>
                <br />
                <small>By Name</small>
              </div>
            </div>
            <div className="hero-visual-card float-2">
              <FaBoxes style={{ fontSize: '1.8rem', color: '#06B6D4' }} />
              <div>
                <strong>Check</strong>
                <br />
                <small>Stock Level</small>
              </div>
            </div>
            <div className="hero-visual-card float-3">
              <FaDollarSign style={{ fontSize: '1.8rem', color: '#10B981' }} />
              <div>
                <strong>Compare</strong>
                <br />
                <small>Prices</small>
              </div>
            </div>
            <div className="hero-visual-card float-4">
              <FaMapMarkerAlt style={{ fontSize: '1.8rem', color: '#F59E0B' }} />
              <div>
                <strong>Locate</strong>
                <br />
                <small>Pharmacy</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== FEATURES =================== */}
      <section className="features-section">
        <div className="features-header">
          <span className="section-badge">Features</span>
          <h2 className="section-title">What Can MediFind Do?</h2>
          <p className="section-subtitle">
            A complete medicine search platform built for patients and pharmacies alike.
          </p>
        </div>
        <div className="features-grid">
          {[
            { icon: <FaSearch />, title: 'Smart Search', desc: 'Find medicines instantly by name with real-time keyword matching.' },
            { icon: <FaBoxes />, title: 'Stock Tracking', desc: 'View current stock levels so you know availability before visiting.' },
            { icon: <FaDollarSign />, title: 'Price Sorting', desc: 'Sort medicines by price to find the most affordable options.' },
            { icon: <FaMapMarkerAlt />, title: 'Pharmacy Location', desc: 'See which pharmacy has your medicine and where it\'s located.' },
            { icon: <FaLock />, title: 'Secure Auth', desc: 'JWT-based authentication keeps your account safe and secure.' },
            { icon: <FaCapsules />, title: 'Medicine Database', desc: 'Browse a growing database of medicines with full details.' },
            { icon: <FaHeartbeat />, title: 'Healthcare Focus', desc: 'Designed to make finding essential medicines faster and easier.' },
            { icon: <FaUserMd />, title: 'User Dashboard', desc: 'Track platform stats and manage your account from one place.' },
          ].map((f, i) => (
            <div key={i} className={`feature-card stagger-${i + 1}`}>
              <div className="feature-icon-wrapper">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =================== HOW IT WORKS =================== */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <span className="section-badge">How It Works</span>
            <h2 className="section-title">Simple 3-Step Process</h2>
            <p>
              <strong>1. Search</strong> — Type a medicine name and get instant results from the database.
              <br /><br />
              <strong>2. Compare</strong> — View stock availability, prices, and pharmacy locations for each result.
              <br /><br />
              <strong>3. Locate</strong> — Find the nearest pharmacy that has your medicine in stock.
            </p>
          </div>
        </div>
      </section>

      {/* =================== CTA =================== */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Start Searching Medicines Today</h2>
            <p>Create a free account and explore the full medicine database.</p>
            <Link
              to="/register"
              className="btn btn-primary"
              style={{ background: 'white', color: '#4F46E5' }}
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;