import React, { useState } from 'react';

function Sales() {
  // सेल्स का डेटा (स्टेट)
  const [sales, setSales] = useState([
    { id: 1, product: 'Wireless Mouse', qty: 2, price: 500, date: '2026-10-08' },
    { id: 2, product: 'Mechanical Keyboard', qty: 1, price: 2500, date: '2026-10-09' }
  ]);

  // नए सेल्स इनपुट की स्टेट्स
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  // लाइव टोटल कमाई कैलकुलेट करना
  const totalRevenue = sales.reduce((sum, item) => sum + (item.qty * item.price), 0);

  const handleAddSale = (e) => {
    e.preventDefault();
    if (!productName.trim() || !quantity || !price) {
      alert("Please fill all fields");
      return;
    }

    setSales([
      ...sales,
      {
        id: Date.now(),
        product: productName.trim(),
        qty: Number(quantity),
        price: Number(price),
        date: new Date().toISOString().split('T')[0] // आज की तारीख
      }
    ]);

    setProductName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <>
      <header className="content-header">
        <h1>Sales Report</h1>
        <p>Track your shop sales and total earnings.</p>
      </header>

      {/* Total Earnings Card */}
      <div className="chart-box" style={{ marginBottom: '20px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <h2 style={{ color: '#16a34a' }}>Total Revenue: ₹{totalRevenue}</h2>
      </div>

      {/* Add Sale Form */}
      <form onSubmit={handleAddSale} className="product-form">
        <input 
          placeholder="Product Name" 
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input 
          type="number"
          placeholder="Quantity" 
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input 
          type="number"
          placeholder="Price per unit" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Record Sale</button>
      </form>
            <button onClick={() => window.print()} className="delete-btn" style={{ backgroundColor: '#3b82f6' }}>
  🖨️ Print Report
</button>

      {/* Sales Table */}
      <div className="table-container" style={{ marginTop: '25px' }}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.date}</td>
                <td>{sale.product}</td>
                <td>{sale.qty}</td>
                <td>₹{sale.price}</td>
                <td>₹{sale.qty * sale.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Sales;
