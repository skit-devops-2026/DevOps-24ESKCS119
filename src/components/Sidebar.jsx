function Sidebar({ page, setPage }) {
  const pages = [
    "Dashboard",
    "Products",
    "Customers",
    "Sales",
    "Inventory",
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">ShopAdmin</div>

      <nav className="sidebar-nav">
        {pages.map((name) => (
          <button
            key={name}
            className={`nav-item ${
              page === name ? "active" : ""
            }`}
            onClick={() => setPage(name)}
          >
            {name === "Sales" ? "Sales Report" : name}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;