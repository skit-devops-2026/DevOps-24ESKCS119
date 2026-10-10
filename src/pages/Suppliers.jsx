import React, { useState } from 'react';

function Suppliers({ suppliers, setSuppliers }) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddSupplier = (e) => {
    e.preventDefault();
    if (!name.trim() || !company.trim() || !phone.trim()) {
      alert("Please fill all fields");
      return;
    }
    setSuppliers([...suppliers, { id: Date.now(), name: name.trim(), company: company.trim(), phone: phone.trim() }]);
    setName(''); setCompany(''); setPhone('');
  };

  return (
    <>
      <header className="content-header">
        <h1>Suppliers Management</h1>
        <p>Manage your wholesale dealers and vendors.</p>
      </header>

      <form onSubmit={handleAddSupplier} className="product-form">
        <input placeholder="Supplier Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} />
        <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button type="submit">Add Supplier</button>
      </form>

      <div className="table-container" style={{ marginTop: '25px' }}>
        <table>
          <thead>
            <tr><th>Name</th><th>Company/Brand</th><th>Phone</th></tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s.id}><td>{s.name}</td><td>{s.company}</td><td>{s.phone}</td></tr>
            ))}
            {suppliers.length === 0 && <tr><td colSpan="3">No suppliers added yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Suppliers;
