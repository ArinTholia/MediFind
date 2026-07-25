import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import api from '../services/api';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // Backend returns JWT as plain string
      localStorage.setItem('token', response.data);
      localStorage.setItem('username', email);
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        if (typeof data === 'object' && data.message) {
          setError(data.message);
        } else if (typeof data === 'string') {
          setError(data);
        } else {
          setError('Invalid email or password.');
        }
      } else {
        setError('Cannot connect to server. Make sure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-overlay">
          <h1>Welcome Back 👋</h1>
          <p>
            Login to search medicines, check stock availability,
            and access your MediFind dashboard.
          </p>
          <div className="auth-feature-list">
            <div className="auth-feature-item">✔ Search Medicines Instantly</div>
            <div className="auth-feature-item">✔ Check Pharmacy Stock</div>
            <div className="auth-feature-item">✔ Fast & Secure Login</div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>Login</h2>
          <p>Sign in to your account</p>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label"><FaEnvelope style={{ marginRight: 6 }} />Email</label>
              <input
                type="email"
                className={`form-input ${fieldErrors.email ? 'input-error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors(p => ({...p, email: ''})); }}
                required
              />
              {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
            </div>

            <div className="form-group" style={{ position: 'relative' }}>
              <label className="form-label"><FaLock style={{ marginRight: 6 }} />Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-input ${fieldErrors.password ? 'input-error' : ''}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFieldErrors(p => ({...p, password: ''})); }}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{ top: '70%' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="auth-footer-text">
            Don't have an account?
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;