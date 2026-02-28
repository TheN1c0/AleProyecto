import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabase';
import ProductForm from '../../components/admin/ProductForm';
import { Edit, Trash2, Plus } from 'lucide-react';

const Dashboard = () => {
    const { logout, user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        console.log("🛠️ [DEBUG] Dashboard fetchProducts - Error:", error);
        console.log("🛠️ [DEBUG] Dashboard fetchProducts - Data:", data);

        if (!error && data) {
            setProducts(data);
        } else if (error) {
            console.error("❌ [DEBUG] Failed to fetch products:", error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await supabase.from('products').delete().eq('id', id);
            fetchProducts();
        }
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsFormOpen(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        fetchProducts();
    };

    return (
        <div className="container section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="section-title">Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-secondary-oliveDark)' }}>
                        Admin: {user?.email}
                    </span>
                    <button className="btn btn-outline-light" style={{ color: 'var(--color-primary-forestDeep)', borderColor: 'var(--color-primary-forestDeep)' }} onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>

            {isFormOpen ? (
                <ProductForm
                    product={editingProduct}
                    onSuccess={handleFormSuccess}
                    onCancel={() => setIsFormOpen(false)}
                />
            ) : (
                <div style={{ backgroundColor: 'var(--color-neutral-white)', borderRadius: 'var(--radius-medium)', boxShadow: 'var(--shadow-soft)', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <h2 className="card-title">Product Catalog</h2>
                        <button className="btn btn-primary" onClick={handleAddNew} style={{ display: 'flex', gap: '0.5rem' }}>
                            <Plus size={16} /> Add Product
                        </button>
                    </div>

                    <div style={{ padding: '0 1.5rem' }}>
                        {loading ? (
                            <p style={{ padding: '2rem 0', textAlign: 'center' }}>Loading products...</p>
                        ) : products.length === 0 ? (
                            <p style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--color-secondary-oliveDark)' }}>No products found.</p>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                                        <th className="small-caps" style={{ padding: '1rem 0' }}>Image</th>
                                        <th className="small-caps" style={{ padding: '1rem 0' }}>Name</th>
                                        <th className="small-caps" style={{ padding: '1rem 0' }}>Price</th>
                                        <th className="small-caps" style={{ padding: '1rem 0' }}>Status</th>
                                        <th className="small-caps" style={{ padding: '1rem 0', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                            <td style={{ padding: '1rem 0' }}>
                                                <img
                                                    src={product.image_url || '/placeholder.png'}
                                                    alt={product.name}
                                                    onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                                />
                                            </td>
                                            <td style={{ padding: '1rem 0', fontWeight: 500 }}>{product.name}</td>
                                            <td style={{ padding: '1rem 0' }}>${product.price.toFixed(2)}</td>
                                            <td style={{ padding: '1rem 0' }}>
                                                <span style={{
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '1rem',
                                                    fontSize: '0.8rem',
                                                    backgroundColor: product.published ? '#e8f5e9' : '#ffebee',
                                                    color: product.published ? '#2e7d32' : '#c62828'
                                                }}>
                                                    {product.published ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                                                <button onClick={() => handleEdit(product)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-secondary-oliveDark)', marginRight: '1rem' }}>
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c62828' }}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
