import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaCheck, FaTimes } from 'react-icons/fa';
import api from '../services/api';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Password strength calculation
  const passwordChecks = useMemo(() => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }, [password]);

  const passwordStrength = useMemo(() => {
    const passed = Object.values(passwordChecks).filter(Boolean).length;
    if (passed <= 1) return { label: 'Very Weak', color: '#EF4444', percent: 20 };
    if (passed === 2) return { label: 'Weak', color: '#F59E0B', percent: 40 };
    if (passed === 3) return { label: 'Fair', color: '#F59E0B', percent: 60 };
    if (passed === 4) return { label: 'Strong', color: '#10B981', percent: 80 };
    return { label: 'Very Strong', color: '#059669', percent: 100 };
  }, [passwordChecks]);

  const validate = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Full name is required';
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!passwordChecks.uppercase || !passwordChecks.lowercase || !passwordChecks.number) {
      errors.password = 'Password needs uppercase, lowercase, and a number';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) return;

    setLoading(true);

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
      });

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        if (typeof data === 'object' && data.message) {
          setError(data.message);
        } else if (typeof data === 'object') {
          // Validation errors from backend (field -> message map)
          const messages = Object.values(data).join('. ');
          setError(messages);
        } else if (typeof data === 'string') {
          setError(data);
        } else {
          setError('Registration failed. Please try again.');
        }
      } else {
        setError('Cannot connect to server. Make sure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearFieldError = (field) => {
    setFieldErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-overlay">
          <h1>Join MediFind 🚀</h1>
          <p>
            Create your free account and start searching medicines, checking
            pharmacy availability, and accessing healthcare services.
          </p>
          <div className="auth-feature-list">
            <div className="auth-feature-item">✔ Find Medicines Instantly</div>
            <div className="auth-feature-item">✔ Check Nearby Pharmacies</div>
            <div className="auth-feature-item">✔ Secure & Free Registration</div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>Create Account</h2>
          <p>Register to get started</p>

          {success && <div className="success-box">{success}</div>}
          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="form-group">
              <label className="form-label"><FaUser style={{ marginRight: 6 }} />Full Name</label>
              <input
                type="text"
                className={`form-input ${fieldErrors.name ? 'input-error' : ''}`}
                placeholder="John Doe"
                value={name}
                onChange={(e) => { setName(e.target.value); clearFieldError('name'); }}
                required
              />
              {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label"><FaEnvelope style={{ marginRight: 6 }} />Email</label>
              <input
                type="email"
                className={`form-input ${fieldErrors.email ? 'input-error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearFieldError('email'); }}
                required
              />
              {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group" style={{ position: 'relative' }}>
              <label className="form-label"><FaLock style={{ marginRight: 6 }} />Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-input ${fieldErrors.password ? 'input-error' : ''}`}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearFieldError('password'); }}
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

            {/* Password Strength Meter */}
            {password && (
              <div className="password-strength-section">
                <div className="strength-bar-bg">
                  <div
                    className="strength-bar-fill"
                    style={{ width: `${passwordStrength.percent}%`, background: passwordStrength.color }}
                  ></div>
                </div>
                <span className="strength-label" style={{ color: passwordStrength.color }}>
                  {passwordStrength.label}
                </span>
                <div className="password-rules">
                  {[
                    { key: 'length', label: 'At least 8 characters' },
                    { key: 'uppercase', label: 'One uppercase letter' },
                    { key: 'lowercase', label: 'One lowercase letter' },
                    { key: 'number', label: 'One number' },
                    { key: 'special', label: 'One special character' },
                  ].map(rule => (
                    <div key={rule.key} className={`rule-item ${passwordChecks[rule.key] ? 'rule-pass' : 'rule-fail'}`}>
                      {passwordChecks[rule.key] ? <FaCheck /> : <FaTimes />}
                      <span>{rule.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label"><FaLock style={{ marginRight: 6 }} />Confirm Password</label>
              <input
                type="password"
                className={`form-input ${fieldErrors.confirmPassword ? 'input-error' : ''}`}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword'); }}
                required
              />
              {fieldErrors.confirmPassword && <span className="field-error">{fieldErrors.confirmPassword}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="auth-footer-text">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;