import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, isDrawerOpen, closeDrawer } = useCart();

    const handleWhatsAppOrder = () => {
        let message = "Hi Casa Almara! I would like to order the following items:%0A%0A";

        cartItems.forEach(item => {
            message += `- ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}%0A`;
        });

        message += `%0A*Subtotal: $${cartTotal.toFixed(2)}*`;

        // Using a placeholder number. User must configure this later.
        const whatsappNumber = "1234567890";
        const url = `https://wa.me/${whatsappNumber}?text=${message}`;

        window.open(url, '_blank');
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--color-overlay-darkGradientTop)',
        zIndex: 99,
        opacity: isDrawerOpen ? 1 : 0,
        pointerEvents: isDrawerOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease'
    };

    const drawerStyle = {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        maxWidth: '400px',
        height: '100vh',
        backgroundColor: 'var(--color-neutral-beigeCard)',
        zIndex: 100,
        transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.1)'
    };

    return (
        <>
            <div style={overlayStyle} onClick={closeDrawer} />

            <div style={drawerStyle}>
                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Your Cart</h2>
                    <button onClick={closeDrawer} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} color="var(--color-primary-forestDeep)" />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--color-secondary-oliveDark)', marginTop: '2rem' }}>
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {cartItems.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <img
                                        src={item.imageUrl || '/placeholder.png'}
                                        alt={item.name}
                                        onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
                                        style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-small)' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.25rem' }}>{item.name}</h3>
                                        <p style={{ color: 'var(--color-secondary-oliveDark)', marginBottom: '0.5rem' }}>${item.price.toFixed(2)}</p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-small)' }}>
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                                    <Minus size={14} />
                                                </button>
                                                <span style={{ fontSize: '0.9rem' }}>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} style={{ fontSize: '0.8rem', color: 'var(--color-secondary-oliveDark)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div style={{ padding: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'var(--color-neutral-creamSoft)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <span className="small-caps">Subtotal</span>
                            <span style={{ fontWeight: 500 }}>${cartTotal.toFixed(2)}</span>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleWhatsAppOrder}>
                            Order via WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
