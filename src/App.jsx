import React from 'react';
import './App.css';

function App() {
  // डैशबोर्ड के स्टेट्स (Metrics) का डेटा
  const stats = [
    { title: 'Total Customers', value: '1,245', color: '#3b82f6' },
    { title: 'Total Products', value: '482', color: '#22c55e' },
    { title: 'Daily Sales', value: '₹45,230', color: '#a855f7' },
    { title: 'Out of Stock Items', value: '14', color: '#ef4444' },
  ];

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">ShopAdmin</div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">Dashboard</a>
          <a href="#" className="nav-item">Customers</a>
          <a href="#" className="nav-item">Products</a>
          <a href="#" className="nav-item">Sales Report</a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="content-header">
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here is what's happening in your shop today.</p>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((item, index) => (
            <div key={index} className="stat-card">
              <div className="stat-info">
                <p className="stat-title">{item.title}</p>
                <p className="stat-value">{item.value}</p>
              </div>
              <div className="stat-badge" style={{ backgroundColor: item.color }}></div>
            </div>
          ))}
        </div>

        {/* Chart Section Container */}
        <div className="chart-box">
          <p>In-Stock vs Out-Stock Analysis Chart (Coming Soon...)</p>
        </div>
      </main>
    </div>
  );
}

export default App;
