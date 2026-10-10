import React, { useState } from 'react';

function Settings() {
  const [shopName, setShopName] = useState('SmartShop');
  const [currency, setCurrency] = useState('INR (₹)');

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <>
      <header className="content-header">
        <h1>Shop Settings</h1>
        <p>Update your shop information and preferences.</p>
      </header>

      <div className="table-container" style={{ padding: '20px', maxWidth: '500px' }}>
        <form onSubmit={handleSave} className="product-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Shop Display Name</label>
            <input value={shopName} onChange={(e) => setShopName(e.target.value)} style={{ width: '100%' }} />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Default Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
              <option>INR (₹)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>

          <button type="submit" style={{ marginTop: '10px' }}>Save Configuration</button>
        </form>
      </div>
    </>
  );
}

export default Settings;
