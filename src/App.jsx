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

  //  MASTER STATES (शुरुआत में खाली एरे रहेंगे, डेटाबेस से लोड होंगे)
  const [storeName, setStoreName] = useState('NEXUS SHOP');
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const API_BASE_URL = 'http://localhost:5000/api';

  // ⚡ ऐप लोड होते ही सारा डेटा MongoDB डेटाबेस से खींच कर लाने के लिए सिंगल इफेक्ट
  useEffect(() => {
    // 1. लोड प्रोडक्ट्स
    fetch(`${API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error loading products:", err));

    // 2. लोड कस्टमर्स
    fetch(`${API_BASE_URL}/customers`)
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error("Error loading customers:", err));

    // 3. लोड सेल्स हिस्ट्री
    fetch(`${API_BASE_URL}/sales`)
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(err => console.error("Error loading sales:", err));

    // 4. लोड सप्लायर्स
    fetch(`${API_BASE_URL}/suppliers`)
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(err => console.error("Error loading suppliers:", err));

    // स्टोर नाम लोकलस्टोरेज में ही छोड़ देते हैं क्योंकि यह छोटा मेटाडेटा है
    const savedStoreName = localStorage.getItem('Retail_Manager_name');
    if (savedStoreName) setStoreName(savedStoreName);
  }, []);

  // स्टोर नाम जब भी बदलेगा लोकलस्टोरेज में रहेगा (सेटिंग्स के लिए आसान रहेगा)
  useEffect(() => {
    localStorage.setItem('Retail_Manager_name', storeName);
  }, [storeName]);


  // 💳 सेल्स काउंटर पर बिल कटते ही डेटाबेस में एंट्री करने का लाइव फंक्शन
  const handleNewSale = async (amount) => {
    const newSaleRecord = {
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString()
    };

    try {
      const response = await fetch(`${API_BASE_URL}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSaleRecord)
      });
      const savedSale = await response.json();
      
      // लाइव स्क्रीन अपडेट
      setSales([...sales, savedSale]);
    } catch (err) {
      console.error("Sale save karne me error aya:", err);
    }
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
      <Sidebar activePage={activePage} setActivePage={setActivePage} storeName={storeName} />
      
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', boxSizing: 'border-box' }}>
        {renderPage()}
      </div>
    </div>
  );
}
