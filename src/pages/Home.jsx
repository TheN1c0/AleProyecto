import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { supabase } from '../services/supabase';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setProducts(data || []);
            } catch (err) {
                console.error('Error fetching products:', err.message);
                // Fallback mock data if Supabase table doesn't exist yet
                setProducts([
                    { id: 1, name: 'Handcrafted Incense Holder', price: 45, image_url: 'https://images.unsplash.com/photo-1620893043258-3907a7e32bf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
                    { id: 2, name: 'Ritual Smudge Bundle', price: 28, image_url: 'https://images.unsplash.com/photo-1610486950275-c081e62128fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
                    { id: 3, name: 'Artisan Ceramic Vase', price: 110, image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
                    { id: 4, name: 'Botanical Face Oil', price: 65, image_url: 'https://images.unsplash.com/photo-1615397323145-8bc54b678120?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div style={{ backgroundColor: 'var(--color-primary-forestDeep)' }}>
            <Hero />

            {/* Brand Section */}
            <section className="section bg-olive">
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <h2 className="section-title" style={{ marginBottom: '2rem' }}>Our Philosophy</h2>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                        Casa Almara is born from a desire to return to the essential. We curate and craft
                        items that elevate your daily rituals—from the scent of burning herbs to the
                        texture of artisan ceramics. Each piece is selected with intention, weaving
                        natural materials into the fabric of modern, editorial living.
                    </p>
                </div>
            </section>

            {/* Catalog Section */}
            <section id="catalog" className="section bg-dark">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span className="small-caps" style={{ color: 'var(--color-secondary-oliveMuted)', display: 'block', marginBottom: '0.5rem' }}>
                            The Collection
                        </span>
                        <h2 className="section-title">Latest Offerings</h2>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-neutral-cream)' }}>
                            Loading collection...
                        </div>
                    ) : (
                        <div className="grid grid-3">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {!loading && products.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-secondary-oliveDark)' }}>
                            <p>No products available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Admin Fixed Button */}
            <Link
                to="/admin/login"
                style={{
                    position: 'fixed',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    color: 'var(--color-neutral-cream)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-small)',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    textDecoration: 'none',
                    zIndex: 100,
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background-color 0.2s ease, opacity 0.2s ease',
                    opacity: 0.7
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(0,0,0,0.8)';
                    e.target.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(0,0,0,0.4)';
                    e.target.style.opacity = '0.7';
                }}
            >
                Admin
            </Link>
        </div >
    );
};

export default Home;
