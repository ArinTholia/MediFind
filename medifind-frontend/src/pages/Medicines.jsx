import { useState, useEffect } from 'react';
import { FaSearch, FaCapsules, FaIndustry, FaMapMarkerAlt, FaDollarSign, FaBoxes, FaTimes } from 'react-icons/fa';
import api from '../services/api';

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/medicines');
      setMedicines(res.data);
    } catch (err) {
      if (err.response) {
        setError('Failed to load medicines.');
      } else {
        setError('Cannot connect to server. Make sure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      fetchMedicines();
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/medicines/search?name=${encodeURIComponent(search)}`);
      setMedicines(res.data);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = async (e) => {
    const value = e.target.value;
    setSortOrder(value);
    setLoading(true);
    setError('');
    try {
      let res;
      if (value === 'asc') {
        res = await api.get('/medicines/sort/price-asc');
      } else if (value === 'desc') {
        res = await api.get('/medicines/sort/price-desc');
      } else {
        res = await api.get('/medicines');
      }
      setMedicines(res.data);
    } catch (err) {
      setError('Sort failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearch('');
    fetchMedicines();
  };

  return (
    <div className="medicines-page">
      <div className="medicines-hero">
        <h1>Medicine Database</h1>
        <p>Browse and search our comprehensive medicine catalog</p>
      </div>

      {error && <div className="error-box" style={{ maxWidth: 600, margin: '0 auto 1.5rem' }}>{error}</div>}

      <div className="search-section">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            className="search-input"
            placeholder="Search medicines by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          {search && (
            <button
              className="btn-icon"
              onClick={clearSearch}
              style={{ color: 'var(--text-muted)', background: 'transparent' }}
            >
              <FaTimes />
            </button>
          )}
          <button className="search-btn btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        <select className="sort-select" value={sortOrder} onChange={handleSort}>
          <option value="default">Sort by</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      <p className="medicines-count">
        {loading ? 'Loading...' : `${medicines.length} medicine${medicines.length !== 1 ? 's' : ''} found`}
      </p>

      {loading ? (
        <div className="medicines-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-line" style={{ width: '60%', height: '20px' }}></div>
              <div className="skeleton-line" style={{ width: '40%', height: '16px' }}></div>
              <div className="skeleton-line" style={{ width: '80%', height: '16px' }}></div>
              <div className="skeleton-line" style={{ width: '50%', height: '16px' }}></div>
              <div className="skeleton-line" style={{ width: '30%', height: '24px' }}></div>
            </div>
          ))}
        </div>
      ) : medicines.length === 0 ? (
        <div className="empty-state">
          <FaCapsules className="empty-state-icon" />
          <h3>No medicines found</h3>
          <p>
            {search
              ? `No results for "${search}". Try a different search term.`
              : 'No medicines in the database yet.'}
          </p>
          {search && (
            <button className="btn btn-outline" onClick={clearSearch} style={{ marginTop: '1rem' }}>
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="medicines-grid">
          {medicines.map((med) => (
            <div key={med.id} className="medicine-card">
              <div className="medicine-card-top">
                <h3 className="medicine-name">{med.name}</h3>
                <span
                  className={`stock-badge ${
                    med.stock > 50 ? 'in-stock' : med.stock > 0 ? 'low-stock' : 'out-stock'
                  }`}
                >
                  {med.stock > 50 ? 'In Stock' : med.stock > 0 ? `Low (${med.stock})` : 'Out of Stock'}
                </span>
              </div>
              <div className="medicine-card-body">
                <div className="medicine-detail">
                  <FaIndustry className="medicine-detail-icon" />
                  <span>{med.manufacturer || 'Unknown manufacturer'}</span>
                </div>
                <div className="medicine-detail">
                  <FaBoxes className="medicine-detail-icon" />
                  <span>Stock: {med.stock} units</span>
                </div>
                {med.pharmacyName && (
                  <div className="medicine-detail">
                    <FaCapsules className="medicine-detail-icon" />
                    <span>{med.pharmacyName}</span>
                  </div>
                )}
                {med.location && (
                  <div className="medicine-detail">
                    <FaMapMarkerAlt className="medicine-detail-icon" />
                    <span>{med.location}</span>
                  </div>
                )}
              </div>
              <div className="medicine-card-footer">
                <span className="medicine-price">
                  ₹{med.price?.toFixed(2) || 'N/A'}
                </span>
                {med.location && (
                  <span className="medicine-location">
                    <FaMapMarkerAlt /> {med.location}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Medicines;