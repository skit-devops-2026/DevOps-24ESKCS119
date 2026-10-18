import React, { useState } from 'react';

const styles = {
  container: { color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '16px', maxWidth: '1400px', margin: '0 auto' },
  header: { borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' },
  title: { fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' },
  subtitle: { fontSize: '14px', color: '#64748b', margin: '0' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' },
  section: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', height: 'fit-content', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', marginBottom: '20px' },
  sectionTitle: { fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: '0 0 16px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' },
  formGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' },
  input: { width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box', outline: 'none' },
  btnSubmit: { width: '100%', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' },
  th: { color: '#64748b', padding: '12px 16px', borderBottom: '2px solid #e2e8f0', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold' },
  td: { padding: '16px', borderBottom: '1px solid #e2e8f0', color: '#334155', verticalAlign: 'middle' },
  badge: { backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' },
  duesText: { fontWeight: '700', color: '#ef4444', backgroundColor: '#fef2f2', padding: '4px 8px', borderRadius: '6px' },
  settleBtn: { backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginLeft: '6px' },
  btnDelete: { background: '#fee2e2', border: 'none', color: '#ef4444', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }
};
function Suppliers({ suppliers = [], setSuppliers, products = [] }) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [dues, setDues] = useState('');
  const [leadTime, setLeadTime] = useState('');

  const handleAddSupplier = (e) => {
    e.preventDefault();
    if (!name.trim() || !company.trim() || !phone.trim()) {
      alert("कृपया नाम, कंपनी और फोन नंबर जरूर भरें!");
      return;
    }
    
    const newSupplier = {
      id: Date.now(),
      name: name.trim(),
      company: company.trim(),
      phone: phone.trim(),
      dues: dues ? parseFloat(dues) : 0,
      leadTime: leadTime ? parseInt(leadTime) : 2
    };

    setSuppliers([...suppliers, newSupplier]);
    setName(''); setCompany(''); setPhone(''); setDues(''); setLeadTime('');
  };

  const handleSettleDues = (id) => {
    const amount = prompt("कृपया चुकता की जाने वाली राशि दर्ज करें:");
    if (amount === null || isNaN(amount) || parseFloat(amount) <= 0) return;

    setSuppliers(suppliers.map(s => {
      if (s.id === id) {
        const remaining = s.dues - parseFloat(amount);
        return { ...s, dues: remaining < 0 ? 0 : remaining };
      }
      return s;
    }));
    alert("उधारी का हिसाब अपडेट कर दिया गया है!");
  };

  const handleDeleteSupplier = (id) => {
    if (window.confirm("क्या आप इस सप्लायर को हटाना चाहते हैं?")) {
      setSuppliers(suppliers.filter(s => s.id !== id));
    }
  };

  const criticalItemsCount = products.filter(p => p.stock <= 5).length;
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🏢 Advanced Suppliers Hub</h1>
        <p style={styles.subtitle}>Track wholesale networks, pending dues, and fulfillment speed.</p>
      </header>

      {criticalItemsCount > 0 && (
        <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fef3c7', color: '#b45309', padding: '14px 20px', borderRadius: '12px', marginBottom: '24px', fontSize: '14px', fontWeight: '600' }}>
          ⚠️ ध्यान दें: आपकी इन्वेंट्री में <b>{criticalItemsCount} आइटम्स</b> का स्टॉक बहुत कम है। कृपया नीचे दिए गए डीलर्स से तुरंत संपर्क करें!
        </div>
      )}

      <div style={styles.layout}>
        {/* Onboard Supplier Form */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>➕ Onboard New Supplier</h3>
          <form onSubmit={handleAddSupplier}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Supplier Name</label>
              <input style={styles.input} placeholder="e.g. Rahul Sharma" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Company / Brand Name</label>
              <input style={styles.input} placeholder="e.g. Sony Wholesale Ind." value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number</label>
              <input style={styles.input} placeholder="10-digit mobile" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Current Pending Dues (₹)</label>
              <input type="number" style={styles.input} placeholder="0.00" value={dues} onChange={(e) => setDues(e.target.value)} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Delivery Lead Time (Days)</label>
              <input type="number" style={styles.input} placeholder="e.g. 3 days" value={leadTime} onChange={(e) => setLeadTime(e.target.value)} />
            </div>
            <button type="submit" style={styles.btnSubmit}>Save To Supplier Ledger</button>
          </form>
        </div>

        {/* Suppliers Matrix Table */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Master Supplier Matrix ({suppliers.length})</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Vendor Details</th>
                  <th style={styles.th}>Company</th>
                  <th style={styles.th}>Fulfillment Speed</th>
                  <th style={styles.th}>Pending Ledger</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>Control</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((s) => (
                  <tr key={s.id}>
                    <td style={styles.td}>
                      <b>{s.name}</b>
                      <div style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>📞 {s.phone}</div>
                    </td>
                    <td style={styles.td}><span style={styles.badge}>{s.company}</span></td>
                    <td style={styles.td}>⏱️ {s.leadTime || 2} Days</td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={s.dues > 0 ? styles.duesText : { color: '#10b981', fontWeight: 'bold' }}>
                            ₹{s.dues ? s.dues.toFixed(2) : '0.00'}
                          </span>
                          {s.dues > 0 && (
                            <button type="button" onClick={() => handleSettleDues(s.id)} style={styles.settleBtn}>Settle</button>
                          )}
                        </div>
                        {/* ⚡ Live Manual Dues Setter Input Box */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                          <input 
                            type="number" 
                            style={{ ...styles.input, width: '75px', padding: '4px 6px', fontSize: '11px' }}
                            placeholder="New ₹"
                            id={`supplier-due-input-${s.id}`}
                          />
                          <button 
                            type="button" 
                            onClick={() => {
                              const val = parseFloat(document.getElementById(`supplier-due-input-${s.id}`).value);
                              if (isNaN(val) || val < 0) return alert("सही अमाउंट डालें!");
                              setSuppliers(suppliers.map(sup => sup.id === s.id ? { ...sup, dues: val } : sup));
                              document.getElementById(`supplier-due-input-${s.id}`).value = '';
                              alert("सप्लायर उधारी अपडेट हो गई है!");
                            }} 
                            style={{ ...styles.settleBtn, backgroundColor: '#3b82f6', marginLeft: 0 }}
                          >
                            Set
                          </button>
                        </div>
                      </div>
                    </td>
                    <td style={{ ...styles.td, display: 'flex', justifyContent: 'center' }}>
                      <button type="button" style={styles.btnDelete} onClick={() => handleDeleteSupplier(s.id)}>✕</button>
                    </td>
                  </tr>
                ))}
                {suppliers.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ ...styles.td, textAlign: 'center', color: '#64748b', padding: '32px 0' }}>
                      No suppliers registered in master system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Suppliers;
