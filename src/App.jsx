import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Suppliers from './pages/Suppliers';
import Settings from './pages/Settings';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  // 1. ⚡ स्टोर नाम की मास्टर स्टेट (लोकल स्टोरेज लोडर्स के साथ)
  const [storeName, setStoreName] = useState(() => {
    const saved = localStorage.getItem('nexus_store_name');
    return saved || 'NEXUS SHOP';
  });

  // 2. प्रोडक्ट्स मास्टर स्टेट
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('nexus_products');
    return saved ? JSON.parse(saved) : [];
  });

  // 3. कस्टमर्स मास्टर स्टेट
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('nexus_customers');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Rahul', phone: '9876543210', email: 'rahul@gmail.com', purchases: 45000 },
      { id: 2, name: 'Aman', phone: '9876501234', email: 'aman@gmail.com', purchases: 3500 },
      { id: 3, name: 'Priya', phone: '9876512345', email: 'priya@gmail.com', purchases: 1500 }
    ];
  });

  // 4. सेल्स हिस्ट्री मास्टर स्टेट
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('nexus_sales');
    return saved ? JSON.parse(saved) : [];
  });

  // 5. सप्लायर्स मास्टर स्टेट
  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem('nexus_suppliers');
    return saved ? JSON.parse(saved) : [];
  });
  // 💾 जब भी कोई डेटा बदलेगा, ये इफेक्ट्स उसे तुरंत ब्राउज़र मेमोरी में परमानेंट सेव कर देंगे:
  useEffect(() => {
    localStorage.setItem('nexus_store_name', storeName);
  }, [storeName]);

  useEffect(() => {
    localStorage.setItem('nexus_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nexus_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('nexus_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('nexus_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  // सेल्स काउंटर पर बिल कटते ही डैशबोर्ड अर्निंग्स अपडेट करने का लाइव फंक्शन
  const handleNewSale = (amount) => {
    const newSaleRecord = {
      id: Date.now(),
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString()
    };
    setSales([...sales, newSaleRecord]);
  };
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': 
        return <Dashboard products={products} customers={customers} sales={sales} storeName={storeName} />;
      
      case 'customers': 
        return <Customers customers={customers} setCustomers={setCustomers} />;
      
      case 'inventory': 
        return <Inventory products={products} setProducts={setProducts} />;
      
      case 'sales': 
        return <Sales products={products} setProducts={setProducts} onNewSale={handleNewSale} />;
      
      case 'suppliers': 
        return <Suppliers suppliers={suppliers} setSuppliers={setSuppliers} products={products} />;
      
      case 'settings': 
        return <Settings storeName={storeName} setStoreName={setStoreName} />;
      
      default: 
        return <Dashboard products={products} customers={customers} sales={sales} storeName={storeName} />;
    }
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* ⚡ साइडबार को भी मास्टर स्टोर नेम प्रोप दे दिया गया है */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} storeName={storeName} />
      
      {/* मुख्य कंटेंट रेंडरर बॉक्स */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', boxSizing: 'border-box' }}>
        {renderPage()}
      </div>
    </div>
  );
}
