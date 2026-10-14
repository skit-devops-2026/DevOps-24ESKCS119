import React, { useState } from 'react';

const styles = {
  container: { color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '16px', maxWidth: '1400px', margin: '0 auto' },
  header: { borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' },
  title: { fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' },
  subtitle: { fontSize: '14px', color: '#64748b', margin: '0' },
  layout: { display: 'grid', gridTemplateColumns: '1fr', gap: '32px' },
  section: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', height: 'fit-content', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', marginBottom: '24px' },
  sectionTitle: { fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' },
  formGroup: { marginBottom: '20px', maxWidth: '500px' },
  label: { display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' },
  input: { width: '100%', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box', outline: 'none' },
  btnSubmit: { backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' },
  dangerSection: { backgroundColor: '#fff5f5', border: '1px solid #fee2e2', borderRadius: '16px', padding: '24px', height: 'fit-content' }
};
// 🔥 अब storeName और setStoreName मास्टर प्रोप्स से आ रहे हैं ताकि पूरे ऐप में नाम बदले!
export default function Settings({ storeName, setStoreName }) {
  // लोकल इनपुट हैंडलिंग के लिए टेम्परेरी स्टेट
  const [tempName, setTempName] = useState(storeName);
  const [currency, setCurrency] = useState('INR (₹)');
  const [taxRate, setTaxRate] = useState('18');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (!tempName.trim()) {
      alert("कृपया दुकान का नाम दर्ज करें!");
      return;
    }
    // मास्टर स्टेट को अपडेट करना
    setStoreName(tempName.trim());
    alert(`दुकान का नाम बदलकर "${tempName.trim()}" कर दिया गया है!`);
  };

  const handleClearDatabase = () => {
    if (window.confirm("⚠️ क्या आप सच में पूरा डेटाबेस डिलीट करना चाहते हैं?")) {
      if (window.confirm("🚨 यह डेटा वापस नहीं आएगा। क्या आप कन्फर्म करते हैं?")) {
        localStorage.clear();
        alert("डेटाबेस साफ़ कर दिया गया है!");
        window.location.reload();
      }
    }
  };
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>⚙️ System Settings</h1>
        <p style={styles.subtitle}>Configure shop profiles, taxation preferences, and database controls.</p>
      </header>

      <div style={styles.layout}>
        {/* Store Configurations */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>🏪 Store Configurations</h3>
          <form onSubmit={handleSaveSettings}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Store Display Name</label>
              <input 
                style={styles.input} 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)} 
                placeholder="e.g. Nexus Shop"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Primary Currency</label>
              <select style={{ ...styles.input, cursor: 'pointer' }} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option>INR (₹)</option>
                <option>USD ($)</option>
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Default GST / Tax Rate (%)</label>
              <input type="number" style={styles.input} value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
            </div>
            
            <button type="submit" style={styles.btnSubmit}>
              Save Preferences
            </button>
          </form>
        </div>

        {/* System Danger Zone */}
        <div style={styles.dangerSection}>
          <h3 style={{ ...styles.sectionTitle, color: '#ef4444', borderBottom: '1px solid #fee2e2' }}>🚨 System Danger Zone</h3>
          <p style={{ fontSize: '13px', color: '#7f1d1d', margin: '0 0 16px 0' }}>
            निचे दिए गए बटन पर क्लिक करने से लोकलस्टोरेज में मौजूद सारा डेटा हमेशा के लिए डिलीट हो जाएगा।
          </p>
          <button type="button" onClick={handleClearDatabase} style={{ ...styles.btnSubmit, backgroundColor: '#ef4444' }}>
            🧹 Wipe Complete Database & Reset
          </button>
        </div>
      </div>
    </div>
  );
}
