import React, { useState } from 'react';

function Customers() {
  // कस्टमर लिस्ट का डेटा (स्टेट)
  const [customers, setCustomers] = useState([
    { name: 'Rahul', phone: '9876543210', email: 'rahul@gmail.com', purchases: '₹45,000' },
    { name: 'Aman', phone: '9876501234', email: 'aman@gmail.com', purchases: '₹3,500' },
    { name: 'Priya', phone: '9876512345', email: 'priya@gmail.com', purchases: '₹1,500' }
  ]);

  // नया कस्टमर जोड़ने के लिए इनपुट स्टेट्स
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // फॉर्म सबमिट होने पर नया कस्टमर ऐड करने का फंक्शन
  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert("Please fill all fields");
      return;
    }

    const newCustomer = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      purchases: '₹0' 
    };

    setCustomers([...customers, newCustomer]);
    
    // फॉर्म खाली करने के लिए
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <>
      <header className="content-header">
        <h1>Customers Management</h1>
        <p>Add, search and manage shop customers.</p>
      </header>

      {/* Add Customer Form */}
      <form onSubmit={handleAddCustomer} className="product-form">
        <input 
          placeholder="Customer Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          placeholder="Phone Number" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add Customer</button>
      </form>

      {/* Customer List Table */}
      <div className="table-container" style={{ marginTop: '25px' }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Total Purchases</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{customer.purchases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Customers;
