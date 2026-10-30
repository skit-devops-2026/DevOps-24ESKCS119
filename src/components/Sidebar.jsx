import React from 'react';

const sidebarStyles = {
  sidebar: { width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', height: '100vh', boxSizing: 'border-box' },
  logoArea: { fontSize: '20px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', textTransform: 'uppercase' },
  navLink: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#64748b', fontSize: '14px', fontWeight: '600', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s' },
  activeNavLink: { backgroundColor: '#eff6ff', color: '#2563eb' }
};

export default function Sidebar({ activePage, setActivePage }) {
  // Purane prop ko bypass karke direct 'Retail Manager' set kar diya hai
  const displayName = 'Retail Manager';

  return (
    <aside style={sidebarStyles.sidebar}>
      
      {/* Fixed Logo Area */}
      <div style={sidebarStyles.logoArea}>
        🛍️ {displayName}
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div 
          style={{ ...sidebarStyles.navLink, ...(activePage === 'dashboard' ? sidebarStyles.activeNavLink : {}) }}
          onClick={() => setActivePage('dashboard')}
        >
          📊 Dashboard
        </div>
        <div 
          style={{ ...sidebarStyles.navLink, ...(activePage === 'customers' ? sidebarStyles.activeNavLink : {}) }}
          onClick={() => setActivePage('customers')}
        >
          👥 Customers
        </div>
        <div 
          style={{ ...sidebarStyles.navLink, ...(activePage === 'inventory' ? sidebarStyles.activeNavLink : {}) }}
          onClick={() => setActivePage('inventory')}
        >
          📦 Inventory
        </div>
        <div 
          style={{ ...sidebarStyles.navLink, ...(activePage === 'sales' ? sidebarStyles.activeNavLink : {}) }}
          onClick={() => setActivePage('sales')}
        >
          🛒 Sales Counter
        </div>
        <div 
          style={{ ...sidebarStyles.navLink, ...(activePage === 'suppliers' ? sidebarStyles.activeNavLink : {}) }}
          onClick={() => setActivePage('suppliers')}
        >
          🏢 Suppliers
        </div>
        <div 
          style={{ ...sidebarStyles.navLink, ...(activePage === 'settings' ? sidebarStyles.activeNavLink : {}) }}
          onClick={() => setActivePage('settings')}
        >
          ⚙️ Settings
        </div>
      </nav>
    </aside>
  );
}