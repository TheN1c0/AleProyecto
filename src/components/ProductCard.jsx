import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <div className="product-card" style={{
            position: 'relative',
            borderRadius: 'var(--radius-medium)',
            overflow: 'hidden',
            backgroundColor: 'transparent',
            color: 'var(--color-neutral-cream)',
            transition: 'transform var(--transition-duration) var(--transition-easing), box-shadow var(--transition-duration)'
        }}>
            <div style={{
                position: 'relative',
                aspectRatio: '3/4',
                overflow: 'hidden',
                borderRadius: 'var(--radius-medium)'
            }}>
                <img
                    src={product.imageUrl || '/placeholder.png'}
                    alt={product.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                    }}
                    className="product-image"
                />

                {/* Overlay Action */}
                <div className="product-overlay" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            <div style={{ padding: '1rem 0', textAlign: 'center' }}>
                <h3 style={{
                    fontSize: 'var(--font-card-size)',
                    fontWeight: 'var(--font-card-weight)',
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-family-serifDisplay)'
                }}>
                    {product.name}
                </h3>
                <p style={{
                    color: 'var(--color-accent-goldSoft)',
                    fontWeight: 500
                }}>
                    ${product.price.toFixed(2)}
                </p>
            </div>

            <style>{`
        .product-card:hover {
          transform: scale(1.02);
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        .product-card:hover .product-overlay {
          opacity: 1;
        }
      `}</style>
        </div>
    );
};

export default ProductCard;
