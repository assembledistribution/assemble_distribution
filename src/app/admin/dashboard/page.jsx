'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import { getApiUrl } from '@/utils/api';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  LogOut, Package, Plus, Trash2, Home, Edit2, Search, 
  CheckCircle, AlertTriangle, ShieldCheck, Eye, RefreshCw, Layers, ArrowLeft
} from 'lucide-react';

function DashboardContent() {
  const { logout } = useAuth();
  const { products, addProduct, deleteProduct, updateProduct } = useProducts();
  const router = useRouter();

  // Navigation tab state: 'products' | 'add-product'
  const [activeTab, setActiveTab] = useState('products');
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Delete Security Confirmation Modal state
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });
  
  // Notification Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  // Form State
  const [newProduct, setNewProduct] = useState({
    title: '',
    asin: '',
    description: '',
    shortDescription: '',
    price: '',
    category: 'art-craft',
    imageUrl: '',
    images: [],
    hasSizes: false,
    sizes: '',
    variations: '',
    combinations: []
  });

  const [customImageUrl, setCustomImageUrl] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleMultipleImagesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (let file of files) {
      if (!file.type.startsWith('image/')) {
        showNotification(`Security Alert: "${file.name}" is not an image file!`, 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showNotification(`File "${file.name}" exceeds 5MB limit!`, 'error');
        return;
      }
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    setUploading(true);

    try {
      const apiBase = getApiUrl();
      const response = await fetch(`${apiBase}/upload/multiple`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.urls)) {
          setNewProduct(prev => {
            const updatedImages = [...(prev.images || []), ...data.urls];
            return {
              ...prev,
              images: updatedImages,
              imageUrl: prev.imageUrl || updatedImages[0] || ''
            };
          });
          showNotification(`${data.urls.length} images uploaded successfully to Cloudinary!`);
        } else {
          showNotification('Upload failed: ' + (data.message || 'Server error'), 'error');
        }
      } else {
        showNotification('Upload failed with status: ' + response.status, 'error');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      showNotification('Error uploading images. Check network connection.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleAddCustomUrl = () => {
    if (!customImageUrl || !customImageUrl.trim()) return;
    const url = customImageUrl.trim();
    setNewProduct(prev => {
      const updatedImages = [...(prev.images || []), url];
      return {
        ...prev,
        images: updatedImages,
        imageUrl: prev.imageUrl || url
      };
    });
    setCustomImageUrl('');
    showNotification('Image URL added to gallery!');
  };

  const handleRemoveImage = (indexToRemove) => {
    setNewProduct(prev => {
      const updatedImages = (prev.images || []).filter((_, idx) => idx !== indexToRemove);
      const removedUrl = prev.images[indexToRemove];
      let newMainUrl = prev.imageUrl;
      if (removedUrl === prev.imageUrl) {
        newMainUrl = updatedImages[0] || '';
      }
      return {
        ...prev,
        images: updatedImages,
        imageUrl: newMainUrl
      };
    });
  };

  const handleSetCoverImage = (url) => {
    setNewProduct(prev => ({
      ...prev,
      imageUrl: url
    }));
    showNotification('Set as main cover image!');
  };

  // Auto-generate combinations matrix when sizes or variations change
  useEffect(() => {
    const sizeArr = newProduct.hasSizes && newProduct.sizes ? newProduct.sizes.split(',').map(s => s.trim()).filter(Boolean) : [];
    const varArr = newProduct.variations ? newProduct.variations.split(',').map(v => v.trim()).filter(Boolean) : [];
    
    let newCombinations = [];
    
    if (sizeArr.length > 0 && varArr.length > 0) {
      sizeArr.forEach(s => {
        varArr.forEach(v => {
          newCombinations.push({ size: s, variation: v, price: '' });
        });
      });
    } else if (sizeArr.length > 0) {
      sizeArr.forEach(s => {
        newCombinations.push({ size: s, variation: '', price: '' });
      });
    } else if (varArr.length > 0) {
      varArr.forEach(v => {
        newCombinations.push({ size: '', variation: v, price: '' });
      });
    }

    setNewProduct(prev => {
      const merged = newCombinations.map(nc => {
        const existing = prev.combinations.find(ec => ec.size === nc.size && ec.variation === nc.variation);
        return existing || nc;
      });

      if (JSON.stringify(prev.combinations) !== JSON.stringify(merged)) {
        return { ...prev, combinations: merged };
      }
      return prev;
    });
  }, [newProduct.sizes, newProduct.variations, newProduct.hasSizes]);

  const updateCombination = (index, field, value) => {
    const updated = [...newProduct.combinations];
    updated[index] = { ...updated[index], [field]: value };
    setNewProduct({ ...newProduct, combinations: updated });
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const handleEditClick = (product) => {
    setEditingId(product.id || product._id);
    const existingImages = Array.isArray(product.images) && product.images.length > 0 
      ? product.images 
      : (product.imageUrl ? [product.imageUrl] : []);

    setNewProduct({
      title: product.title || '',
      asin: product.asin || '',
      description: product.description || '',
      shortDescription: product.shortDescription || '',
      price: product.price || '',
      category: product.category || 'art-craft',
      imageUrl: product.imageUrl || (existingImages[0] || ''),
      images: existingImages,
      hasSizes: product.hasSizes || false,
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : (product.sizes || ''),
      variations: Array.isArray(product.variations) ? product.variations.join(', ') : (product.variations || ''),
      combinations: (product.combinations || []).map(c => ({
        ...c,
        price: c.price !== null && c.price !== undefined ? c.price : ''
      }))
    });
    setActiveTab('add-product');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewProduct({
      title: '',
      asin: '',
      description: '',
      shortDescription: '',
      price: '',
      category: 'art-craft',
      imageUrl: '',
      images: [],
      hasSizes: false,
      sizes: '',
      variations: '',
      combinations: []
    });
    setActiveTab('products');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!newProduct.title || newProduct.title.trim() === '') {
        showNotification('Security Notice: Product Title is required!', 'error');
        return;
      }
      if (!newProduct.price || isNaN(parseFloat(newProduct.price)) || parseFloat(newProduct.price) < 0) {
        showNotification('Security Notice: Valid non-negative price is required!', 'error');
        return;
      }

      const galleryImages = newProduct.images && newProduct.images.length > 0 
        ? newProduct.images 
        : (newProduct.imageUrl ? [newProduct.imageUrl] : []);

      const mainCover = newProduct.imageUrl || galleryImages[0] || '';

      const productData = {
        title: newProduct.title.trim(),
        asin: newProduct.asin ? newProduct.asin.trim() : '',
        description: newProduct.description ? newProduct.description.trim() : '',
        shortDescription: newProduct.shortDescription ? newProduct.shortDescription.trim() : '',
        price: parseFloat(newProduct.price),
        category: newProduct.category || 'art-craft',
        imageUrl: mainCover,
        images: galleryImages,
        hasSizes: Boolean(newProduct.hasSizes),
        sizes: newProduct.hasSizes ? (newProduct.sizes || '').split(',').map(s => s.trim()).filter(Boolean) : [],
        variations: (newProduct.variations || '') ? newProduct.variations.split(',').map(v => v.trim()).filter(Boolean) : [],
        combinations: (newProduct.combinations || []).map(c => ({
          ...c,
          price: c.price ? parseFloat(c.price) : null
        }))
      };

      if (editingId) {
        updateProduct(editingId, productData);
        setEditingId(null);
        showNotification('Product updated successfully!');
      } else {
        addProduct(productData);
        showNotification('New product published successfully!');
      }
      
      setNewProduct({
        title: '',
        description: '',
        price: '',
        category: 'apparel',
        imageUrl: '',
        stock: '',
        hasSizes: false,
        sizes: '',
        variations: '',
        combinations: []
      });

      setActiveTab('products');
    } catch (error) {
      console.error(error);
      showNotification('Error saving product: ' + error.message, 'error');
    }
  };

  // Trigger Security Confirmation Modal for Deletion
  const promptDeleteProduct = (product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const confirmDeleteProduct = () => {
    if (deleteModal.product) {
      const id = deleteModal.product.id || deleteModal.product._id;
      deleteProduct(id);
      showNotification(`Product "${deleteModal.product.title}" has been permanently deleted.`, 'info');
    }
    setDeleteModal({ isOpen: false, product: null });
  };

  const formatProductPrice = (product) => {
    let basePrice = parseFloat(product.price);
    if (isNaN(basePrice)) basePrice = 0;

    if (product.combinations && product.combinations.length > 0) {
      const validPrices = product.combinations
        .map(c => parseFloat(c.price))
        .filter(p => !isNaN(p));

      if (validPrices.length > 0) {
        const minP = Math.min(basePrice, ...validPrices);
        const maxP = Math.max(basePrice, ...validPrices);

        if (maxP > minP) {
          return `$${minP.toFixed(2)} - $${maxP.toFixed(2)}`;
        }
        return `$${minP.toFixed(2)}`;
      }
    }

    return `$${basePrice.toFixed(2)}`;
  };

  // Filtered Products Logic (Includes Search by ASIN, Title, Description)
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      (product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.asin && product.asin.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Calculate Statistics
  const totalProducts = products.length;
  const categoriesCount = new Set(products.map(p => p.category)).size;

  return (
    <div className="admin-brand-wrapper" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-neutral, #F4F3F0)', fontFamily: 'var(--font, "Poppins", sans-serif)', color: 'var(--ink, #1C1C1C)' }}>
      
      {/* Toast Notification Banner matching website style */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          padding: '14px 22px',
          borderRadius: 'var(--radius-sm, 14px)',
          boxShadow: '0 12px 30px rgba(28, 92, 83, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: toast.type === 'error' ? '#ef4444' : (toast.type === 'info' ? '#3b82f6' : 'var(--teal, #1C5C53)'),
          color: '#ffffff',
          fontWeight: '500',
          fontSize: '14px',
          animation: 'slideIn 0.3s ease'
        }}>
          {toast.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Security Deletion Modal matching website styling */}
      {deleteModal.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(28, 28, 28, 0.6)',
          backdropFilter: 'blur(6px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md, 16px)',
            maxWidth: '460px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '1px solid var(--line, #E7E5E0)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#dc2626', marginBottom: '16px' }}>
              <div style={{ padding: '12px', backgroundColor: '#fee2e2', borderRadius: '50%' }}>
                <AlertTriangle size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: 'var(--ink, #1C1C1C)' }}>Confirm Permanent Deletion</h3>
            </div>
            <p style={{ color: 'var(--gray, #6B6F6E)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
              Are you sure you want to delete <strong style={{ color: 'var(--ink, #1C1C1C)' }}>&quot;{deleteModal.product?.title}&quot;</strong>? This will permanently remove it from your store and Cloudinary media library.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setDeleteModal({ isOpen: false, product: null })}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-pill, 30px)',
                  border: '1px solid var(--line, #E7E5E0)',
                  backgroundColor: '#ffffff',
                  color: 'var(--ink, #1C1C1C)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProduct}
                style={{
                  padding: '10px 22px',
                  borderRadius: 'var(--radius-pill, 30px)',
                  border: 'none',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Trash2 size={16} /> Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Brand Teal Sidebar matching Website Theme */}
      <aside style={{ width: '270px', backgroundColor: '#134943', color: '#ffffff', display: 'flex', flexDirection: 'column', flexShrink: 0, boxShadow: '4px 0 20px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
            <Package size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '0.5px' }}>STORE CONTROL</h2>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>Admin Dashboard</span>
          </div>
        </div>

        {/* Security Session Badge */}
        <div style={{ padding: '12px 20px', backgroundColor: '#0e3833', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#2dd4bf' }}>
          <ShieldCheck size={16} />
          <span>Security Status: <strong>Active Session</strong></span>
        </div>

        <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm, 14px)',
              backgroundColor: activeTab === 'products' ? '#1C5C53' : 'transparent',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'products' ? '700' : '500',
              fontSize: '14px',
              textAlign: 'left',
              width: '100%',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'products' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Package size={18} /> Products Manager
            </div>
            <span style={{ backgroundColor: activeTab === 'products' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)', color: '#ffffff', fontSize: '11px', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
              {products.length}
            </span>
          </button>

          <button
            onClick={() => {
              handleCancelEdit();
              setActiveTab('add-product');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm, 14px)',
              backgroundColor: activeTab === 'add-product' ? '#1C5C53' : 'transparent',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'add-product' ? '700' : '500',
              fontSize: '14px',
              textAlign: 'left',
              width: '100%',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'add-product' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            <Plus size={18} /> Add New Product
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm, 14px)',
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              marginTop: '12px',
              transition: 'background 0.2s ease'
            }}
          >
            <Home size={18} /> View Website <Eye size={14} style={{ marginLeft: 'auto' }} />
          </a>
        </nav>

        <div style={{ padding: '20px 16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-pill, 30px)',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#fca5a5',
              fontWeight: '600',
              width: '100%',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'all 0.2s ease'
            }}
          >
            <LogOut size={16} /> Logout Admin
          </button>
        </div>
      </aside>

      {/* Main Admin Dashboard View */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '36px 40px' }}>
        
        {/* Brand Theme Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--teal, #1C5C53)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              ADMINISTRATION
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--ink, #1C1C1C)', margin: '4px 0 0 0' }}>
              Products Management
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                handleCancelEdit();
                setActiveTab('add-product');
              }}
              style={{
                backgroundColor: 'var(--teal, #1C5C53)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 22px',
                borderRadius: 'var(--radius-pill, 30px)',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 16px rgba(28, 92, 83, 0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              <Plus size={18} /> Add New Product
            </button>
          </div>
        </header>

        {/* Quick Summary Stat Cards in Website Palette */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--line, #E7E5E0)', padding: '22px 24px', borderRadius: 'var(--radius-md, 16px)', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ color: 'var(--gray, #6B6F6E)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Products</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--teal, #1C5C53)', marginTop: '4px' }}>{totalProducts}</div>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--line, #E7E5E0)', padding: '22px 24px', borderRadius: 'var(--radius-md, 16px)', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ color: 'var(--gray, #6B6F6E)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Categories</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--ink, #1C1C1C)', marginTop: '4px' }}>{categoriesCount}</div>
          </div>
        </div>

        {/* TAB 1: Brand Styled Products Table */}
        {activeTab === 'products' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--line, #E7E5E0)', borderRadius: 'var(--radius-md, 16px)', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            
            {/* Table Search & Filter Bar */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line, #E7E5E0)', backgroundColor: 'var(--cream, #FBFAF8)', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', flex: 1 }}>
                
                {/* Search Bar */}
                <div style={{ position: 'relative', minWidth: '280px', flex: 1, maxWidth: '400px' }}>
                  <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray, #6B6F6E)' }} />
                  <input
                    type="text"
                    placeholder="Search by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 42px',
                      borderRadius: 'var(--radius-pill, 30px)',
                      border: '1px solid var(--line, #E7E5E0)',
                      fontSize: '14px',
                      backgroundColor: '#ffffff',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 'var(--radius-pill, 30px)',
                    border: '1px solid var(--line, #E7E5E0)',
                    fontSize: '14px',
                    backgroundColor: '#ffffff',
                    color: 'var(--ink, #1C1C1C)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="art-craft">Art & Craft</option>
                  <option value="toys-games">Toys & Games</option>
                  <option value="garden-outdoor">Garden & Outdoor</option>
                </select>

                {(searchQuery || categoryFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('all');
                    }}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--teal, #1C5C53)',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <RefreshCw size={14} /> Reset
                  </button>
                )}
              </div>

              <div style={{ fontSize: '13px', color: 'var(--gray, #6B6F6E)', fontWeight: '500' }}>
                Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> items
              </div>
            </div>

            {/* Products Table matching Website Aesthetic */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--cream, #FBFAF8)', borderBottom: '1px solid var(--line, #E7E5E0)', color: 'var(--ink, #1C1C1C)', fontWeight: '700' }}>
                    <th style={{ padding: '16px 20px', width: '80px' }}>Image</th>
                    <th style={{ padding: '16px 20px' }}>Title & Details</th>
                    <th style={{ padding: '16px 20px' }}>Category</th>
                    <th style={{ padding: '16px 20px' }}>Price</th>
                    <th style={{ padding: '16px 20px' }}>Variations</th>
                    <th style={{ padding: '16px 20px', textAlign: 'right', width: '150px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: 'var(--gray, #6B6F6E)' }}>
                        No products found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => {
                      const isEditingThis = editingId === (product.id || product._id);

                      return (
                        <tr
                          key={product.id || product._id}
                          style={{
                            borderBottom: '1px solid var(--line, #E7E5E0)',
                            backgroundColor: isEditingThis ? '#e6f2f0' : '#ffffff',
                            transition: 'background-color 0.15s ease'
                          }}
                        >
                          {/* Image Column */}
                          <td style={{ padding: '14px 20px' }}>
                            <div style={{ width: '54px', height: '54px', borderRadius: '12px', backgroundColor: 'var(--bg-neutral, #F4F3F0)', overflow: 'hidden', border: '1px solid var(--line, #E7E5E0)' }}>
                              {Boolean(product.imageUrl) ? (
                                <img src={product.imageUrl || null} alt={product.title || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray, #6B6F6E)' }}>
                                  <Package size={22} />
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Title Column */}
                          <td style={{ padding: '14px 20px' }}>
                            <div style={{ fontWeight: '700', color: 'var(--ink, #1C1C1C)', fontSize: '15px' }}>{product.title}</div>
                            <div style={{ color: 'var(--gray, #6B6F6E)', fontSize: '12px', marginTop: '3px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <span>ID: {product.id || product._id}</span>
                              {product.asin && (
                                <span style={{ backgroundColor: '#e6f2f0', color: 'var(--teal, #1C5C53)', padding: '1px 6px', borderRadius: '4px', fontWeight: '700', fontSize: '11px' }}>
                                  ASIN: {product.asin}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Category Column */}
                          <td style={{ padding: '14px 20px' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '4px 12px',
                              borderRadius: 'var(--radius-pill, 30px)',
                              backgroundColor: '#e6f2f0',
                              color: 'var(--teal, #1C5C53)',
                              fontSize: '12px',
                              textTransform: 'capitalize',
                              fontWeight: '700'
                            }}>
                              {(product.category || 'Art Craft').replace('-', ' ')}
                            </span>
                          </td>

                          {/* Price Column */}
                          <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--teal, #1C5C53)', fontSize: '15px' }}>
                            {formatProductPrice(product)}
                          </td>

                          {/* Variations Column */}
                          <td style={{ padding: '14px 20px', color: 'var(--gray, #6B6F6E)', fontSize: '13px' }}>
                            {product.hasSizes && product.sizes?.length > 0 ? `${product.sizes.length} Sizes` : 'Standard'}
                            {product.variations?.length > 0 ? `, ${product.variations.length} Colors` : ''}
                          </td>

                          {/* Actions Column */}
                          <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => handleEditClick(product)}
                                style={{
                                  padding: '8px 14px',
                                  borderRadius: 'var(--radius-pill, 30px)',
                                  border: '1px solid var(--teal, #1C5C53)',
                                  backgroundColor: '#ffffff',
                                  color: 'var(--teal, #1C5C53)',
                                  cursor: 'pointer',
                                  fontSize: '13px',
                                  fontWeight: '700',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  transition: 'all 0.2s ease'
                                }}
                                title="Edit Product"
                              >
                                <Edit2 size={14} /> Edit
                              </button>

                              <button
                                onClick={() => promptDeleteProduct(product)}
                                style={{
                                  padding: '8px 14px',
                                  borderRadius: 'var(--radius-pill, 30px)',
                                  border: '1px solid #f43f5e',
                                  backgroundColor: '#ffffff',
                                  color: '#f43f5e',
                                  cursor: 'pointer',
                                  fontSize: '13px',
                                  fontWeight: '700',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  transition: 'all 0.2s ease'
                                }}
                                title="Delete Product"
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Brand Styled Add / Edit Product Meta Boxes Form */}
        {activeTab === 'add-product' && (
          <div style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--ink, #1C1C1C)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                {editingId ? <Edit2 style={{ color: 'var(--teal)' }} size={22} /> : <Plus size={22} />}
                {editingId ? `Edit Product: ${newProduct.title}` : 'Add New Product'}
              </h2>

              <button
                onClick={handleCancelEdit}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--line, #E7E5E0)',
                  color: 'var(--ink, #1C1C1C)',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-pill, 30px)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ArrowLeft size={16} /> Back to Products
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Box 1: General Product Details */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--line, #E7E5E0)', borderRadius: 'var(--radius-md, 16px)', padding: '28px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--teal, #1C5C53)', marginTop: 0, marginBottom: '20px', borderBottom: '1px solid var(--line, #E7E5E0)', paddingBottom: '12px' }}>
                  General Product Information
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--ink, #1C1C1C)' }}>Product Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Premium Cotton Oversized Hoodie"
                        value={newProduct.title}
                        onChange={e => setNewProduct({...newProduct, title: e.target.value})}
                        required
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--line, #E7E5E0)', fontSize: '14px', outline: 'none', backgroundColor: 'var(--cream, #FBFAF8)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--ink, #1C1C1C)' }}>
                        ASIN Code <span style={{ fontSize: '11px', color: 'var(--gray)', fontWeight: 'normal' }}>(Internal Only)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. B08N5WRWNW"
                        value={newProduct.asin}
                        onChange={e => setNewProduct({...newProduct, asin: e.target.value})}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--line, #E7E5E0)', fontSize: '14px', outline: 'none', backgroundColor: 'var(--cream, #FBFAF8)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--ink, #1C1C1C)' }}>
                      Short Description <span style={{ fontSize: '11px', color: 'var(--gray)', fontWeight: 'normal' }}>(Appears under price next to main image)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lightweight, breathable cotton blend with relaxed fit."
                      value={newProduct.shortDescription}
                      onChange={e => setNewProduct({...newProduct, shortDescription: e.target.value})}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--line, #E7E5E0)', fontSize: '14px', outline: 'none', backgroundColor: 'var(--cream, #FBFAF8)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--ink, #1C1C1C)' }}>
                      Full Description <span style={{ fontSize: '11px', color: 'var(--gray)', fontWeight: 'normal' }}>(Appears below on scroll)</span>
                    </label>
                    <textarea
                      placeholder="Enter full detailed product description..."
                      value={newProduct.description}
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      rows={4}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--line, #E7E5E0)', fontSize: '14px', resize: 'vertical', outline: 'none', backgroundColor: 'var(--cream, #FBFAF8)' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--ink, #1C1C1C)' }}>Base Price ($) *</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="49.99"
                        value={newProduct.price}
                        onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                        required
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--line, #E7E5E0)', fontSize: '14px', outline: 'none', backgroundColor: 'var(--cream, #FBFAF8)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--ink, #1C1C1C)' }}>Category</label>
                      <select
                        value={newProduct.category}
                        onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--line, #E7E5E0)', fontSize: '14px', backgroundColor: 'var(--cream, #FBFAF8)', color: 'var(--ink, #1C1C1C)', cursor: 'pointer' }}
                      >
                        <option value="art-craft">Art and Craft</option>
                        <option value="toys-games">Toys and Games</option>
                        <option value="garden-outdoor">Garden and Outdoor</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 2: Cloudinary Multiple Image Upload & Gallery */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--line, #E7E5E0)', borderRadius: 'var(--radius-md, 16px)', padding: '28px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--teal, #1C5C53)', marginTop: 0, marginBottom: '20px', borderBottom: '1px solid var(--line, #E7E5E0)', paddingBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Product Media & Gallery</span>
                  <span style={{ fontSize: '12px', color: 'var(--gray, #6B6F6E)', fontWeight: '500' }}>
                    {newProduct.images?.length || 0} Images Uploaded
                  </span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* File Upload Button (Multiple Images) */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleMultipleImagesUpload}
                      style={{ display: 'none' }}
                      id="brand-image-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="brand-image-upload"
                      style={{
                        backgroundColor: uploading ? 'var(--gray)' : 'var(--teal, #1C5C53)',
                        color: '#ffffff',
                        padding: '12px 22px',
                        borderRadius: 'var(--radius-pill, 30px)',
                        cursor: uploading ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Plus size={16} /> {uploading ? 'Uploading Images to Cloudinary...' : 'Upload Multiple Product Images'}
                    </label>
                    <span style={{ fontSize: '12px', color: 'var(--gray, #6B6F6E)' }}>
                      Select 1 or multiple image files at once.
                    </span>
                  </div>

                  {/* Add Image by URL input */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--gray, #6B6F6E)', fontWeight: '600' }}>
                      Or paste direct Image URL:
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        placeholder="https://res.cloudinary.com/..."
                        value={customImageUrl}
                        onChange={e => setCustomImageUrl(e.target.value)}
                        style={{ flex: 1, padding: '10px 16px', borderRadius: '10px', border: '1px solid var(--line, #E7E5E0)', fontSize: '14px', backgroundColor: 'var(--cream, #FBFAF8)' }}
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomUrl}
                        style={{
                          padding: '10px 18px',
                          borderRadius: '10px',
                          border: '1px solid var(--teal, #1C5C53)',
                          backgroundColor: '#ffffff',
                          color: 'var(--teal, #1C5C53)',
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        Add URL
                      </button>
                    </div>
                  </div>

                  {/* Gallery Preview Grid */}
                  {newProduct.images && newProduct.images.length > 0 ? (
                    <div>
                      <label style={{ display: 'block', marginBottom: '10px', fontSize: '13px', color: 'var(--ink, #1C1C1C)', fontWeight: '700' }}>
                        Product Image Gallery (Click star to set main cover image):
                      </label>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '14px' }}>
                        {newProduct.images.map((imgUrl, idx) => {
                          const isMainCover = imgUrl === newProduct.imageUrl || (idx === 0 && !newProduct.imageUrl);

                          return (
                            <div
                              key={idx}
                              style={{
                                position: 'relative',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: isMainCover ? '2px solid var(--teal, #1C5C53)' : '1px solid var(--line, #E7E5E0)',
                                backgroundColor: 'var(--bg-neutral, #F4F3F0)',
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <div style={{ height: '110px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                                <img src={imgUrl || null} alt={`Product view ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                {isMainCover && (
                                  <span style={{
                                    position: 'absolute',
                                    top: '6px',
                                    left: '6px',
                                    backgroundColor: 'var(--teal, #1C5C53)',
                                    color: '#ffffff',
                                    fontSize: '10px',
                                    fontWeight: '800',
                                    padding: '2px 6px',
                                    borderRadius: '10px'
                                  }}>
                                    MAIN COVER
                                  </span>
                                )}
                              </div>

                              <div style={{ padding: '6px', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line, #E7E5E0)' }}>
                                <button
                                  type="button"
                                  onClick={() => handleSetCoverImage(imgUrl)}
                                  style={{
                                    border: 'none',
                                    background: 'none',
                                    color: isMainCover ? 'var(--teal, #1C5C53)' : 'var(--gray, #6B6F6E)',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                  }}
                                  title="Set as main cover image"
                                >
                                  {isMainCover ? '★ Cover' : 'Set Cover'}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(idx)}
                                  style={{
                                    border: 'none',
                                    background: 'none',
                                    color: '#f43f5e',
                                    fontSize: '11px',
                                    cursor: 'pointer'
                                  }}
                                  title="Remove image"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: '24px', textAlign: 'center', backgroundColor: 'var(--cream, #FBFAF8)', borderRadius: '12px', border: '1px dashed var(--line, #E7E5E0)', color: 'var(--gray, #6B6F6E)', fontSize: '13px' }}>
                      No images added yet. Click &quot;Upload Multiple Product Images&quot; above to select multiple photos.
                    </div>
                  )}
                </div>
              </div>

              {/* Box 3: Variants & Sizes Matrix */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--line, #E7E5E0)', borderRadius: 'var(--radius-md, 16px)', padding: '28px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--teal, #1C5C53)', marginTop: 0, marginBottom: '20px', borderBottom: '1px solid var(--line, #E7E5E0)', paddingBottom: '12px' }}>
                  Sizes & Product Variants
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="checkbox"
                      id="brand-hasSizes"
                      checked={newProduct.hasSizes}
                      onChange={e => setNewProduct({...newProduct, hasSizes: e.target.checked})}
                      style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--teal, #1C5C53)' }}
                    />
                    <label htmlFor="brand-hasSizes" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--ink, #1C1C1C)', cursor: 'pointer' }}>
                      Product has multiple sizes (e.g. S, M, L)
                    </label>
                  </div>

                  {newProduct.hasSizes && (
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--ink, #1C1C1C)' }}>Sizes (comma separated)</label>
                      <input
                        type="text"
                        placeholder="S, M, L, XL"
                        value={newProduct.sizes}
                        onChange={e => setNewProduct({...newProduct, sizes: e.target.value})}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--line, #E7E5E0)', fontSize: '14px', backgroundColor: 'var(--cream, #FBFAF8)' }}
                      />
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--ink, #1C1C1C)' }}>Variations / Colors (comma separated, optional)</label>
                    <input
                      type="text"
                      placeholder="Black, White, Olive"
                      value={newProduct.variations}
                      onChange={e => setNewProduct({...newProduct, variations: e.target.value})}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--line, #E7E5E0)', fontSize: '14px', backgroundColor: 'var(--cream, #FBFAF8)' }}
                    />
                  </div>

                  {(newProduct.sizes || newProduct.variations) && newProduct.combinations.length > 0 && (
                    <div style={{ marginTop: '12px', backgroundColor: 'var(--cream, #FBFAF8)', padding: '20px', borderRadius: '12px', border: '1px solid var(--line, #E7E5E0)' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--ink, #1C1C1C)', marginTop: 0, marginBottom: '14px' }}>
                        Variant Pricing Matrix
                      </h4>

                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--line, #E7E5E0)', color: 'var(--ink, #1C1C1C)' }}>
                            <th style={{ padding: '10px 6px' }}>Variant</th>
                            <th style={{ padding: '10px 6px' }}>Price ($)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newProduct.combinations.map((combo, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid var(--line, #E7E5E0)' }}>
                              <td style={{ padding: '10px 6px', fontWeight: '600' }}>
                                {combo.size && combo.variation ? `${combo.variation} - ${combo.size}` : combo.size || combo.variation}
                              </td>
                              <td style={{ padding: '10px 6px' }}>
                                <input
                                  type="number"
                                  step="0.01"
                                  placeholder={newProduct.price || 'Base'}
                                  value={combo.price ?? ''}
                                  onChange={e => updateCombination(index, 'price', e.target.value)}
                                  style={{ width: '120px', padding: '8px', borderRadius: '6px', border: '1px solid var(--line, #E7E5E0)' }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    padding: '14px 28px',
                    borderRadius: 'var(--radius-pill, 30px)',
                    border: '1px solid var(--line, #E7E5E0)',
                    backgroundColor: '#ffffff',
                    color: 'var(--ink, #1C1C1C)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '15px'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    padding: '14px 34px',
                    borderRadius: 'var(--radius-pill, 30px)',
                    border: 'none',
                    backgroundColor: 'var(--teal, #1C5C53)',
                    color: '#ffffff',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '15px',
                    boxShadow: '0 8px 20px rgba(28, 92, 83, 0.3)'
                  }}
                >
                  {editingId ? 'Update Product' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        `
      }} />
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
