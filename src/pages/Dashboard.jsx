function Dashboard({ products, customers, sales }) {
  const totalSales = sales.reduce(
    (sum, sale) => sum + sale.amount,
    0
  );

  const outOfStock = products.filter(
    (product) => product.quantity === 0
  ).length;

  const stats = [
    {
      title: "Total Customers",
      value: customers.length,
      color: "#3b82f6",
    },
    {
      title: "Total Products",
      value: products.length,
      color: "#22c55e",
    },
    {
      title: "Total Sales",
      value: `₹${totalSales.toLocaleString("en-IN")}`,
      color: "#a855f7",
    },
    {
      title: "Out of Stock Items",
      value: outOfStock,
      color: "#ef4444",
    },
  ];

  return (
    <>
      <header className="content-header">
        <h1>Dashboard Overview</h1>
        <p>
          Welcome back! Here is what's happening in your shop today.
        </p>
      </header>

      <div className="stats-grid">
        {stats.map((item) => (
          <div className="stat-card" key={item.title}>
            <div>
              <p className="stat-title">{item.title}</p>
              <p className="stat-value">{item.value}</p>
            </div>

            <div
              className="stat-badge"
              style={{ backgroundColor: item.color }}
            />
          </div>
        ))}
      </div>

      <section className="chart-box">
        <h2>Inventory Overview</h2>
        <p>Products currently in stock: {products.filter(p => p.quantity > 0).length}</p>
        <p>Products out of stock: {outOfStock}</p>
      </section>
    </>
  );
}

export default Dashboard;