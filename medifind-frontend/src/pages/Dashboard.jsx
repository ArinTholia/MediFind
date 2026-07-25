import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaCapsules, FaUsers, FaExclamationTriangle, FaSearch,
  FaMapMarkerAlt, FaCheckCircle, FaChartLine, FaSignOutAlt,
  FaBoxes, FaExclamationCircle
} from 'react-icons/fa';
import api from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const [dashData, setDashData] = useState({
    totalMedicines: 0,
    totalUsers: 0,
    lowStockMedicines: 0,
  });
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard');
        setDashData(res.data);
        setApiConnected(true);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
        setApiConnected(false);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      {/* Welcome Banner */}
      <div className="dashboard-welcome">
        <div>
          <h1>Welcome, {username} 👋</h1>
          <p>Here's an overview of the MediFind platform.</p>
        </div>
        <div className="welcome-actions">
          <Link to="/medicines" className="btn btn-primary">Browse Medicines</Link>
          <button onClick={handleLogout} className="btn btn-outline">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Connection error */}
      {!apiConnected && (
        <div className="error-box" style={{ marginBottom: '1.5rem' }}>
          <FaExclamationCircle style={{ marginRight: 6 }} />
          Cannot connect to backend server. Make sure Spring Boot is running on port 8080.
        </div>
      )}

      {/* Stats — Real data from /dashboard API */}
      <div className="dashboard-stats-grid">
        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
            <FaCapsules />
          </div>
          <div className="dash-stat-info">
            <div className="dash-stat-number">{loading ? '—' : dashData.totalMedicines}</div>
            <div className="dash-stat-label">Total Medicines</div>
          </div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ background: '#CFFAFE', color: '#06B6D4' }}>
            <FaUsers />
          </div>
          <div className="dash-stat-info">
            <div className="dash-stat-number">{loading ? '—' : dashData.totalUsers}</div>
            <div className="dash-stat-label">Registered Users</div>
          </div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ background: '#FEF3C7', color: '#F59E0B' }}>
            <FaExclamationTriangle />
          </div>
          <div className="dash-stat-info">
            <div className="dash-stat-number">{loading ? '—' : dashData.lowStockMedicines}</div>
            <div className="dash-stat-label">Low Stock Items</div>
          </div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ background: '#D1FAE5', color: '#10B981' }}>
            <FaBoxes />
          </div>
          <div className="dash-stat-info">
            <div className="dash-stat-number">
              {loading ? '—' : Math.max(0, dashData.totalMedicines - dashData.lowStockMedicines)}
            </div>
            <div className="dash-stat-label">In Stock Items</div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="dashboard-content-grid">
        {/* Platform Info */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2><FaChartLine /> Platform Overview</h2>
          </div>
          <div className="status-list">
            <div className="status-item">
              <span className="status-name">Total Medicines in DB</span>
              <span className="status-text" style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                {loading ? '...' : dashData.totalMedicines}
              </span>
            </div>
            <div className="status-item">
              <span className="status-name">Total Registered Users</span>
              <span className="status-text" style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                {loading ? '...' : dashData.totalUsers}
              </span>
            </div>
            <div className="status-item">
              <span className="status-name">Low Stock Medicines</span>
              <span className="status-text" style={{ color: 'var(--warning)', fontWeight: 700 }}>
                {loading ? '...' : dashData.lowStockMedicines}
              </span>
            </div>
            <div className="status-item">
              <span className="status-name">Logged in as</span>
              <span className="status-text" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                {username}
              </span>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2><FaCheckCircle /> System Status</h2>
          </div>
          <div className="status-list">
            <div className="status-item">
              <span className="status-name">Backend API</span>
              <span className={`status-dot ${apiConnected ? 'online' : ''}`}></span>
              <span className="status-text" style={!apiConnected ? { color: 'var(--error)' } : {}}>
                {loading ? 'Checking...' : apiConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div className="status-item">
              <span className="status-name">Database</span>
              <span className={`status-dot ${apiConnected ? 'online' : ''}`}></span>
              <span className="status-text" style={!apiConnected ? { color: 'var(--error)' } : {}}>
                {loading ? 'Checking...' : apiConnected ? 'Connected' : 'Unknown'}
              </span>
            </div>
            <div className="status-item">
              <span className="status-name">Authentication</span>
              <span className="status-dot online"></span>
              <span className="status-text">Active</span>
            </div>
            <div className="status-item">
              <span className="status-name">Frontend</span>
              <span className="status-dot online"></span>
              <span className="status-text">Running</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-panel" style={{ marginTop: '1.5rem' }}>
        <div className="panel-header">
          <h2>Quick Actions</h2>
        </div>
        <div className="quick-actions-grid">
          <Link to="/medicines" className="action-card">
            <FaSearch className="action-icon" />
            <span>Search Medicines</span>
          </Link>
          <Link to="/medicines" className="action-card">
            <FaCapsules className="action-icon" />
            <span>View All Medicines</span>
          </Link>
          <Link to="/medicines" className="action-card">
            <FaMapMarkerAlt className="action-icon" />
            <span>Find by Location</span>
          </Link>
          <Link to="/" className="action-card">
            <FaChartLine className="action-icon" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;