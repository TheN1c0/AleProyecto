import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { cartCount, openDrawer } = useCart();

    const isHome = location.pathname === '/';

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

    const navStyle = {
        position: isHome ? 'fixed' : 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        transition: 'background-color 0.3s ease, border-bottom 0.3s ease',
        backgroundColor: (isHome && !scrolled) ? 'transparent' : 'var(--color-primary-forestDeep)',
        color: 'var(--color-neutral-cream)',
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: (isHome && !scrolled) ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)'
    };

    const linkStyle = {
        fontFamily: 'var(--font-family-sansUI)',
        fontSize: 'var(--font-smallCaps-size)',
        fontWeight: 'var(--font-smallCaps-weight)',
        letterSpacing: 'var(--font-smallCaps-letterSpacing)',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'color var(--transition-duration) var(--transition-easing)'
    };

    return (
        <nav style={navStyle}>
            <div style={{ flex: 1 }}>
                <Link to="/" style={linkStyle} className="hover-gold">Shop</Link>
            </div>

            <div style={{ flex: 1, textAlign: 'center' }}>
                <Link to="/" style={{ ...linkStyle, fontSize: '1.2rem', fontFamily: 'var(--font-family-serifDisplay)', letterSpacing: '0.05em' }}>
                    Casa Almara
                </Link>
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={openDrawer}
                    style={{ ...linkStyle, background: 'none', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    className="hover-gold"
                >
                    <ShoppingBag size={18} />
                    {cartCount > 0 && <span>({cartCount})</span>}
                </button>
            </div>

            <style>{`
        .hover-gold:hover {
          color: var(--color-accent-goldSoft) !important;
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
