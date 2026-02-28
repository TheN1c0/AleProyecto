import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login, user, loading } = useAuth();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="section container bg-light-card" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', backgroundColor: 'var(--color-neutral-white)', borderRadius: 'var(--radius-large)', boxShadow: 'var(--shadow-soft)' }}>
                <h1 className="section-title" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h1>
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label className="small-caps" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-small)', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div>
                        <label className="small-caps" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-small)', border: '1px solid #ccc' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
