import React, { useState, useEffect } from 'react';

const styles = {
  container: { color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '16px', maxWidth: '1400px', margin: '0 auto' },
  header: { borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' },
  title: { fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0' },
  layout: { display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '32px' },
  section: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', height: 'fit-content', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', marginBottom: '20px' },
  sectionTitle: { fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: '0 0 16px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' },
  formGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' },
  input: { width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s' },
  btnSubmit: { width: '100%', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px', transition: 'background 0.2s' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' },
  th: { color: '#64748b', padding: '12px 16px', borderBottom: '2px solid #e2e8f0', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em' },
  td: { padding: '16px', borderBottom: '1px solid #e2e8f0', color: '#334155', verticalAlign: 'middle' },
  actionWrapper: { display: 'flex', gap: '12px', alignItems: 'center' },
  inlineGroup: { display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '2px 4px' },
  inlineInput: { width: '65px', padding: '6px', fontSize: '12px', border: 'none', background: 'transparent', outline: 'none', textAlign: 'center' },
  inlineBtn: { backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' },
  btnDelete: { background: '#fee2e2', border: 'none', color: '#ef4444', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }
};
export default function Inventory({ products = [], setProducts }) {
  // कैटेगरीज को localStorage से लोड करना ताकि वो भी डिलीट न हों
  const [categories, setCategories] = useState(() => {
    const savedCats = localStorage.getItem('nexus_categories');
    return savedCats ? JSON.parse(savedCats) : ['Electronics', 'Groceries', 'Apparel'];
  });

  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [search, setSearch] = useState('');

  const [updateStockAmounts, setUpdateStockAmounts] = useState({});
  const [updatePriceAmounts, setUpdatePriceAmounts] = useState({});

  // जब भी कैटेगरीज बदलें, उन्हें लोकल स्टोरेज में सेव करें
  useEffect(() => {
    localStorage.setItem('nexus_categories', JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    const cat = newCategoryInput.trim();
    if (!cat) return;
    if (categories.some(c => c.toLowerCase() === cat.toLowerCase())) {
      alert("यह कैटेगरी पहले से मौजूद है!");
      return;
    }
    setCategories([...categories, cat]);
    setSelectedCategory(cat);
    setNewCategoryInput('');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !stock) return;

    const newItem = {
      id: Date.now(),
      name: name.trim(),
      category: selectedCategory,
      price: parseFloat(price),
      stock: parseInt(stock)
    };

    const updatedList = [...products, newItem];
    setProducts(updatedList);
    // मास्टर लिस्ट को localStorage में तुरंत पुश करना
    localStorage.setItem('nexus_products', JSON.stringify(updatedList));

    setName(''); setPrice(''); setStock('');
  };

  const handleQuickStockUpdate = (id) => {
    const amount = parseInt(updateStockAmounts[id]);
    if (isNaN(amount) || amount <= 0) {
      alert("कृपया सही स्टॉक संख्या दर्ज करें!");
      return;
    }
    const updatedList = products.map(p => p.id === id ? { ...p, stock: p.stock + amount } : p);
    setProducts(updatedList);
    localStorage.setItem('nexus_products', JSON.stringify(updatedList));
    setUpdateStockAmounts({ ...updateStockAmounts, [id]: '' });
  };

  const handleQuickPriceUpdate = (id) => {
    const newPrice = parseFloat(updatePriceAmounts[id]);
    if (isNaN(newPrice) || newPrice <= 0) {
      alert("कृपया सही कीमत दर्ज करें!");
      return;
    }
    const updatedList = products.map(p => p.id === id ? { ...p, price: newPrice } : p);
    setProducts(updatedList);
    localStorage.setItem('nexus_products', JSON.stringify(updatedList));
    setUpdatePriceAmounts({ ...updatePriceAmounts, [id]: '' });
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("क्या आप इस आइटम को हटाना चाहते हैं?")) {
      const updatedList = products.filter(item => item.id !== id);
      setProducts(updatedList);
      localStorage.setItem('nexus_products', JSON.stringify(updatedList));
    }
  };

  const filteredStock = products.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div><h1 style={styles.title}>📦 Master Store Inventory</h1></div>
        <input 
          style={{ ...styles.input, width: '300px', padding: '12px' }} 
          placeholder="🔍 Search products or categories..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        /> 
      </header>

      <div style={styles.layout}>
        {/* Left Side: Form Panels */}
        <div>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>🛠️ Manage Categories</h3>
            <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '8px' }}>
              <input style={styles.input} placeholder="e.g. Footwear" value={newCategoryInput} onChange={(e) => setNewCategoryInput(e.target.value)} />
              <button type="submit" style={{ ...styles.btnSubmit, width: 'auto', marginTop: 0, padding: '0 18px', backgroundColor: '#10b981' }}>Add</button>
            </form>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>➕ Register New Product</h3>
            <form onSubmit={handleAddProduct}>
              <div style={styles.formGroup}><label style={styles.label}>Product Name</label><input style={styles.input} placeholder="Item description" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Category</label>
                <select style={{ ...styles.input, cursor: 'pointer' }} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}><label style={styles.label}>Retail Price (₹)</label><input style={styles.input} type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
              <div style={styles.formGroup}><label style={styles.label}>Initial Stock Qty</label><input style={styles.input} type="number" placeholder="Total pcs" value={stock} onChange={(e) => setStock(e.target.value)} /></div>
              <button type="submit" style={styles.btnSubmit}>Save To Master Database</button>
            </form>
          </div>
        </div>

        {/* Right Side: Table Panel */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Live Inventory Log ({filteredStock.length} items)</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Product Details</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Stock Status</th>
                  <th style={styles.th}>⚡ Quick Refill & Price Change</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStock.map((item) => (
                  <tr key={item.id}>
                    <td style={styles.td}><b>{item.name}</b></td>
                    <td style={styles.td}>
                      <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', color: '#475569', fontWeight: '500' }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ ...styles.td, fontWeight: 'bold', color: '#0f172a' }}>₹{item.price}</td>
                    <td style={styles.td}>
                      <span style={{ 
                        fontWeight: 'bold', 
                        color: item.stock <= 5 ? '#ef4444' : '#10b981',
                        backgroundColor: item.stock <= 5 ? '#fef2f2' : '#f0fdf4',
                        padding: '4px 8px',
                        borderRadius: '6px'
                      }}>
                        {item.stock} Pcs {item.stock <= 5 && '⚠️'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionWrapper}>
                        <div style={styles.inlineGroup}>
                          <input 
                            type="number" 
                            style={styles.inlineInput} 
                            placeholder="+ Stock"
                            value={updateStockAmounts[item.id] || ''}
                            onChange={(e) => setUpdateStockAmounts({ ...updateStockAmounts, [item.id]: e.target.value })}
                          />
                          <button type="button" onClick={() => handleQuickStockUpdate(item.id)} style={styles.inlineBtn}>Refill</button>
                        </div>
                        
                        <div style={styles.inlineGroup}>
                          <input 
                            type="number" 
                            style={styles.inlineInput} 
                            placeholder="New ₹"
                            value={updatePriceAmounts[item.id] || ''}
                            onChange={(e) => setUpdatePriceAmounts({ ...updatePriceAmounts, [item.id]: e.target.value })}
                          />
                          <button type="button" onClick={() => handleQuickPriceUpdate(item.id)} style={{ ...styles.inlineBtn, backgroundColor: '#10b981' }}>Set ₹</button>
                        </div>
                      </div>
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                      <button type="button" style={styles.btnDelete} onClick={() => handleDeleteItem(item.id)} title="Delete Product">✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
