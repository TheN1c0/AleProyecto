import React, { useState } from 'react';
import { supabase } from '../../services/supabase';

const ProductForm = ({ product, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        published: product ? product.published : true,
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const uploadImage = async (file) => {
        console.log("🚀 [DEBUG] Iniciando subida de imagen:", file.name, " Tamaño:", file.size);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        console.log("🚀 [DEBUG] Subiendo al bucket 'product-images' con path:", filePath);
        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);

        if (uploadError) {
            console.error("❌ [DEBUG] Error de Supabase Storage:", uploadError);
            throw uploadError;
        }

        const { data } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        console.log("✅ [DEBUG] Imagen subida exitosamente. URL Pública:", data.publicUrl);
        return data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let image_url = product?.image_url || '/placeholder.png';

            if (imageFile) {
                image_url = await uploadImage(imageFile);
            }

            const productData = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                published: formData.published,
                image_url: image_url
            };

            console.log("🚀 [DEBUG] Datos a enviar a Supabase:", productData);

            const { data: s } = await supabase.auth.getSession();
            console.log("✅ SESSION USER:", s.session?.user?.id, s.session?.user?.email);

            if (product?.id) {
                console.log("🚀 [DEBUG] Actualizando producto ID:", product.id);
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', product.id);

                if (error) {
                    console.error("❌ [DEBUG] Error al actualizar:", error);
                    throw error;
                }
            } else {
                console.log("🚀 [DEBUG] Insertando nuevo producto...");
                const { error } = await supabase
                    .from('products')
                    .insert([productData]);

                if (error) {
                    console.error("❌ [DEBUG] Error al insertar:", error);
                    throw error;
                }
            }

            console.log("✅ [DEBUG] Operación exitosa en Supabase.");
            onSuccess();
        } catch (err) {
            console.error("❌ [DEBUG] Error atrapado en handleSubmit:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        borderRadius: 'var(--radius-small)',
        border: '1px solid #ccc',
        marginBottom: '1rem',
        fontFamily: 'inherit'
    };

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--color-neutral-white)', padding: '2rem', borderRadius: 'var(--radius-medium)', boxShadow: 'var(--shadow-soft)' }}>
            <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                {product ? 'Edit Product' : 'Add New Product'}
            </h3>

            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

            <label className="small-caps" style={{ display: 'block', marginBottom: '0.5rem' }}>Product Name</label>
            <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                style={inputStyle}
            />

            <label className="small-caps" style={{ display: 'block', marginBottom: '0.5rem' }}>Price ($)</label>
            <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                required
                style={inputStyle}
            />

            <label className="small-caps" style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
            <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                style={inputStyle}
            />

            <label className="small-caps" style={{ display: 'block', marginBottom: '0.5rem' }}>Product Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={inputStyle}
            />
            {product && !imageFile && (
                <img
                    src={product.image_url || '/placeholder.png'}
                    alt="Current"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '1rem' }}
                />
            )}

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={e => setFormData({ ...formData, published: e.target.checked })}
                />
                <span>Publish immediately</span>
            </label>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={onCancel} className="btn" style={{ backgroundColor: '#eee', color: '#333' }}>
                    Cancel
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary">
                    {loading ? 'Saving...' : 'Save Product'}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
