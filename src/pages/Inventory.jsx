import React, { useState } from 'react';

function Inventory() {
  // इन्वेंटरी आइटम्स का डेटा (स्टेट)
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Gaming Mouse', stock: 15, location: 'Shelf A' },
    { id: 2, name: 'Monitor 24"', stock: 0, location: 'Shelf B' },
    { id: 3, name: 'USB-C Cable', stock: 50, location: 'Counter' }
  ]);

  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [location, setLocation] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!name.trim() || stock === '' || !location.trim()) {
      alert("Please fill all fields");
      return;
    }

    setInventory([
      ...inventory,
      {
        id: Date.now(),
        name: name.trim(),
        stock: Number(stock),
        location: location.trim()
      }
    ]);

    setName('');
    setStock('');
    setLocation('');
  };

  return (
    <>
      <header className="content-header">
        <h1>Inventory Management</h1>
        <p>Monitor stock levels and warehouse locations.</p>
      </header>

      {/* Add Inventory Form */}
      <form onSubmit={handleAddItem} className="product-form">
        <input 
          placeholder="Item Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="number"
          placeholder="Current Stock" 
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input 
          placeholder="Storage Location (e.g. Shelf A)" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Add to Inventory</button>
      </form>

      {/* Inventory Table */}
      <div className="table-container" style={{ marginTop: '25px' }}>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Stock Qty</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.stock}</td>
                <td>{item.location}</td>
                <td>
                  <span style={{ 
                    color: item.stock > 0 ? '#16a34a' : '#dc2626',
                    fontWeight: 'bold'
                  }}>
                    {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Inventory;
