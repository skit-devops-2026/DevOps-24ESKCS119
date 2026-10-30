import React, { useState, useMemo } from 'react';

const styles = {
  container: { backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b', padding: '32px', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.025em' },
  subtitle: { fontSize: '14px', color: '#64748b', margin: '0' },
  
  // Actions & Controls
  headerActions: { display: 'flex', gap: '12px', alignItems: 'center' },
  buttonPrimary: { backgroundColor: '#4f46e5', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 18px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)' },
  buttonSecondary: { backgroundColor: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '10px 18px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
  
  // Metrics Grid
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '28px' },
  card: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)', transition: 'transform 0.2s, box-shadow 0.2s' },
  cardLabel: { fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardValue: { fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '10px 0 0 0' },
  cardMeta: { fontSize: '12px', color: '#64748b', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' },
  
  // Neon Side Indicators
  cyanGlow: { borderLeft: '4px solid #06b6d4' },
  indigoGlow: { borderLeft: '4px solid #4f46e5' },
  emeraldGlow: { borderLeft: '4px solid #10b981' },
  roseGlow: { borderLeft: '4px solid #ef4444' },

  // Navigation Tabs
  tabsContainer: { display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' },
  tabButton: (isActive) => ({
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: isActive ? '#0f172a' : 'transparent',
    color: isActive ? '#ffffff' : '#64748b',
    transition: 'all 0.2s'
  }),

  // Layout Grids
  twoColumnGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '28px' },
  section: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' },
  sectionTitle: { fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  
  infoLabel: { color: '#475569', fontWeight: '500' },
  infoValue: { fontWeight: '700', color: '#0f172a' },

  // Input Controls
  searchBar: { display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' },
  input: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', flex: 1, minWidth: '200px' },
  select: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', backgroundColor: '#ffffff' },

  // Tables
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' },
  th: { padding: '12px', borderBottom: '2px solid #e2e8f0', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' },
  td: { padding: '12px', borderBottom: '1px solid #f1f5f9', color: '#1e293b' },
  badge: (type) => {
    const colors = {
      completed: { bg: '#dcfce7', text: '#15803d' },
      pending: { bg: '#fef3c7', text: '#b45309' },
      failed: { bg: '#fee2e2', text: '#b91c1c' },
      lowStock: { bg: '#fef3c7', text: '#b45309' },
      outOfStock: { bg: '#fee2e2', text: '#b91c1c' },
      inStock: { bg: '#dcfce7', text: '#15803d' }
    };
    const style = colors[type] || { bg: '#f1f5f9', text: '#475569' };
    return {
      backgroundColor: style.bg,
      color: style.text,
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-block'
    };
  },

  // Progress Bar Visualizer
  progressBg: { width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden', marginTop: '6px' },
  progressBar: (percentage, color) => ({ width: `${percentage}%`, height: '100%', backgroundColor: color, borderRadius: '4px' })
};

function Dashboard({ products = [], customers = [], sales = [] }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Key Calculations
  const totalCustomers = customers.length;
  const totalProducts = products.length;
  const totalDailySales = sales.reduce((total, sale) => total + parseFloat(sale.amount || 0), 0);
  const outOfStockCount = products.filter(item => item.stock <= 0).length;
  
  const categories = useMemo(() => {
    return ['All', ...new Set(products.map(item => item.category).filter(Boolean))];
  }, [products]);

  const totalCategories = categories.length - 1;
  const lowStockCount = products.filter(item => item.stock > 0 && item.stock <= 5).length;

  // Filtered Products List
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Export CSV Functionality
  const handleExportCSV = () => {
    if (!products.length) return alert("No product data to export!");
    const headers = ["ID", "Name", "Category", "Stock", "Price"];
    const rows = products.map(p => [p.id || '', p.name || '', p.category || '', p.stock || 0, p.price || 0]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Retail_Manager_Inventory_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      {/* Header with Quick Actions */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>🚀 Retail Manager Overview</h1>
          <p style={styles.subtitle}>Welcome back, Admin! Here is what's happening in your shop today.</p>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.buttonSecondary} onClick={handleExportCSV}>
            📥 Export CSV
          </button>
          <button style={styles.buttonPrimary} onClick={() => alert('Quick sale feature triggered!')}>
            + New Sale
          </button>
        </div>
      </header>

      {/* Tabs Bar */}
      <div style={styles.tabsContainer}>
        <button style={styles.tabButton(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>
          Overview
        </button>
        <button style={styles.tabButton(activeTab === 'inventory')} onClick={() => setActiveTab('inventory')}>
          Inventory ({products.length})
        </button>
        <button style={styles.tabButton(activeTab === 'sales')} onClick={() => setActiveTab('sales')}>
          Sales Ledger ({sales.length})
        </button>
      </div>

      {/* 4 Primary Metric Cards */}
      <div style={styles.grid}>
        <div style={{ ...styles.card, ...styles.cyanGlow }}>
          <div style={styles.cardLabel}>
            <span>Total Customers</span>
            <span>👥</span>
          </div>
          <div style={styles.cardValue}>{totalCustomers}</div>
          <div style={styles.cardMeta}>Active registered buyers</div>
        </div>

        <div style={{ ...styles.card, ...styles.indigoGlow }}>
          <div style={styles.cardLabel}>
            <span>Total Products</span>
            <span>📦</span>
          </div>
          <div style={styles.cardValue}>{totalProducts}</div>
          <div style={styles.cardMeta}>across {totalCategories} categories</div>
        </div>

        <div style={{ ...styles.card, ...styles.emeraldGlow }}>
          <div style={styles.cardLabel}>
            <span>Daily Sales</span>
            <span>💰</span>
          </div>
          <div style={{ ...styles.cardValue, color: '#10b981' }}>₹{totalDailySales.toFixed(2)}</div>
          <div style={styles.cardMeta}>Updated in real-time</div>
        </div>

        <div style={{ ...styles.card, ...styles.roseGlow }}>
          <div style={styles.cardLabel}>
            <span>Out Of Stock Items</span>
            <span>⚠️</span>
          </div>
          <div style={{ ...styles.cardValue, color: outOfStockCount > 0 ? '#ef4444' : '#0f172a' }}>
            {outOfStockCount}
          </div>
          <div style={styles.cardMeta}>Requires immediate restocking</div>
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div style={styles.twoColumnGrid}>
          {/* Live Inventory Summary */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span>📦 Inventory Status</span>
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748b' }}>Live Status</span>
            </h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
              <span style={styles.infoLabel}>Categories Tracked:</span>
              <span style={{ ...styles.infoValue, color: '#2563eb' }}>{totalCategories} Active Categories</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
              <span style={styles.infoLabel}>Critical Low Stock Items (1-5 Pcs):</span>
              <span style={{ ...styles.infoValue, color: lowStockCount > 0 ? '#f59e0b' : '#64748b' }}>
                {lowStockCount} Items Need Attention
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', fontSize: '14px' }}>
              <span style={styles.infoLabel}>Products Completely Out of Stock:</span>
              <span style={{ ...styles.infoValue, color: outOfStockCount > 0 ? '#ef4444' : '#64748b' }}>
                {outOfStockCount} Items
              </span>
            </div>
          </div>

          {/* Quick Category Health Widget */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span>📊 Stock Level Health</span>
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748b' }}>Distribution</span>
            </h2>
            <div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600' }}>
                  <span>In Stock Ratio</span>
                  <span>{totalProducts ? Math.round(((totalProducts - outOfStockCount) / totalProducts) * 100) : 0}%</span>
                </div>
                <div style={styles.progressBg}>
                  <div style={styles.progressBar(totalProducts ? ((totalProducts - outOfStockCount) / totalProducts) * 100 : 0, '#10b981')} />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600' }}>
                  <span>Low Stock Warnings</span>
                  <span>{totalProducts ? Math.round((lowStockCount / totalProducts) * 100) : 0}%</span>
                </div>
                <div style={styles.progressBg}>
                  <div style={styles.progressBar(totalProducts ? (lowStockCount / totalProducts) * 100 : 0, '#f59e0b')} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600' }}>
                  <span>Out of Stock Ratio</span>
                  <span>{totalProducts ? Math.round((outOfStockCount / totalProducts) * 100) : 0}%</span>
                </div>
                <div style={styles.progressBg}>
                  <div style={styles.progressBar(totalProducts ? (outOfStockCount / totalProducts) * 100 : 0, '#ef4444')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Inventory Management */}
      {activeTab === 'inventory' && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔍 Detailed Inventory Directory</h2>
          
          <div style={styles.searchBar}>
            <input 
              type="text" 
              placeholder="Search product by name..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={styles.input}
            />
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)} 
              style={styles.select}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Product Name</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Stock Level</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item, index) => {
                    const statusType = item.stock <= 0 ? 'outOfStock' : item.stock <= 5 ? 'lowStock' : 'inStock';
                    const statusLabel = item.stock <= 0 ? 'Out of Stock' : item.stock <= 5 ? 'Low Stock' : 'In Stock';
                    return (
                      <tr key={index}>
                        <td style={{ ...styles.td, fontWeight: '600' }}>{item.name || 'Unnamed Product'}</td>
                        <td style={styles.td}>{item.category || 'Uncategorized'}</td>
                        <td style={styles.td}>₹{parseFloat(item.price || 0).toFixed(2)}</td>
                        <td style={styles.td}>{item.stock} pcs</td>
                        <td style={styles.td}>
                          <span style={styles.badge(statusType)}>{statusLabel}</span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" style={{ ...styles.td, textAlign: 'center', color: '#94a3b8', padding: '24px' }}>
                      No matching products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Sales Ledger */}
      {activeTab === 'sales' && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>💳 Recent Sales Transactions</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.length > 0 ? (
                  sales.map((sale, index) => (
                    <tr key={index}>
                      <td style={{ ...styles.td, fontWeight: '600' }}>#{sale.id || index + 1001}</td>
                      <td style={styles.td}>{sale.customerName || 'Walk-in Customer'}</td>
                      <td style={{ ...styles.td, fontWeight: '700', color: '#10b981' }}>₹{parseFloat(sale.amount || 0).toFixed(2)}</td>
                      <td style={styles.td}>
                        <span style={styles.badge(sale.status || 'completed')}>
                          {sale.status ? sale.status.toUpperCase() : 'COMPLETED'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ ...styles.td, textAlign: 'center', color: '#94a3b8', padding: '24px' }}>
                      No sales recorded for today.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;