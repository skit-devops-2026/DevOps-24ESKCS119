import React from 'react';

const styles = {
  container: { backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b', padding: '32px', fontFamily: 'system-ui, sans-serif' },
  header: { borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '32px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.025em' },
  subtitle: { fontSize: '14px', color: '#64748b', margin: '0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '32px' },
  card: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' },
  cardLabel: { fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
  cardValue: { fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '10px 0 0 0' },
  
  // नियॉन साइड इंडीकेटर्स
  cyanGlow: { borderLeft: '4px solid #06b6d4' },
  indigoGlow: { borderLeft: '4px solid #4f46e5' },
  emeraldGlow: { borderLeft: '4px solid #10b981' },
  roseGlow: { borderLeft: '4px solid #ef4444' },
  
  section: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' },
  sectionTitle: { fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' },
  infoLabel: { color: '#475569', fontWeight: '500' },
  infoValue: { fontWeight: '700', color: '#0f172a' }
};
function Dashboard({ products = [], customers = [], sales = [], storeName }) {
  
  // ⚡ यहाँ गड़बड़ थी भाई! मैंने "|| 2" हटा दिया है, अब यह असली काउंट (0 होने पर 0) ही दिखाएगा।
  const totalCustomers = customers.length; 
  
  // बाकी सभी लाइव कैलकुलेशंस बिल्कुल सही तरीके से कनेक्टेड हैं:
  const totalProducts = products.length;
  const totalDailySales = sales.reduce((total, sale) => total + parseFloat(sale.amount || 0), 0);
  const outOfStockCount = products.filter(item => item.stock <= 0).length;
  const totalCategories = [...new Set(products.map(item => item.category))].length;
  const lowStockCount = products.filter(item => item.stock > 0 && item.stock <= 5).length;
  return (
    <div style={styles.container}>
      {/* शीर्ष हेडर जो सेटिंग्स से लाइव नाम दिखाता है */}
      <header style={styles.header}>
        <h1 style={styles.title}>🚀 {storeName || 'NEXUS SHOP'} Overview</h1>
        <p style={styles.subtitle}>Welcome back, Admin! Here is what's happening in your shop today.</p>
      </header>

      {/* 4 मुख्य मैट्रिक्स कार्ड्स */}
      <div style={styles.grid}>
        <div style={{ ...styles.card, ...styles.cyanGlow }}>
          <div style={styles.cardLabel}>Total Customers</div>
          <div style={styles.cardValue}>{totalCustomers}</div>
        </div>

        <div style={{ ...styles.card, ...styles.indigoGlow }}>
          <div style={styles.cardLabel}>Total Products</div>
          <div style={styles.cardValue}>{totalProducts}</div>
        </div>

        <div style={{ ...styles.card, ...styles.emeraldGlow }}>
          <div style={styles.cardLabel}>Daily Sales</div>
          <div style={{ ...styles.cardValue, color: '#10b981' }}>₹{totalDailySales.toFixed(2)}</div>
        </div>

        <div style={{ ...styles.card, ...styles.roseGlow }}>
          <div style={styles.cardLabel}>Out Of Stock Items</div>
          <div style={{ ...styles.cardValue, color: outOfStockCount > 0 ? '#ef4444' : '#0f172a' }}>
            {outOfStockCount}
          </div>
        </div>
      </div>

      {/* लाइव इन्वेंट्री समरी ब्लॉक */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📦 Live Inventory Summary</h2>
        
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
    </div>
  );
}

export default Dashboard;
