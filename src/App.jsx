import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("Dashboard");

  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products") || "[]");
  });

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (e) => {
    e.preventDefault();

    if (!name.trim() || !category.trim() || price === "" || quantity === "") {
      alert("Please fill all fields");
      return;
    }

    setProducts([
      ...products,
      {
        id: Date.now(),
        name: name.trim(),
        category: category.trim(),
        price: Number(price),
        quantity: Number(quantity),
      },
    ]);

    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { title: "Total Customers", value: "0", color: "#3b82f6" },
    { title: "Total Products", value: products.length, color: "#22c55e" },
    {
      title: "Daily Sales",
      value: "₹0",
      color: "#a855f7",
    },
    {
      title: "Out of Stock Items",
      value: products.filter((p) => p.quantity === 0).length,
      color: "#ef4444",
    },
  ];

  const pages = ["Dashboard", "Customers", "Products", "Sales Report", "Inventory"];

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-brand">ShopAdmin</div>

        <nav className="sidebar-nav">
          {pages.map((item) => (
            <button
              key={item}
              className={`nav-item ${page === item ? "active" : ""}`}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        {page === "Dashboard" && (
          <>
            <header className="content-header">
              <h1>Dashboard Overview</h1>
              <p>Welcome back! Here is what's happening in your shop today.</p>
            </header>

            <div className="stats-grid">
              {stats.map((item) => (
                <div key={item.title} className="stat-card">
                  <div className="stat-info">
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

            <div className="chart-box">
              <h2>Inventory Overview</h2>
              <p>Products in stock: {products.filter((p) => p.quantity > 0).length}</p>
              <p>Products out of stock: {products.filter((p) => p.quantity === 0).length}</p>
            </div>
          </>
        )}

        {page === "Products" && (
          <>
            <header className="content-header">
              <h1>Products Management</h1>
              <p>Add, search and manage shop products.</p>
            </header>

            <form onSubmit={addProduct} className="product-form">
              <input
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <input
                type="number"
                min="0"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                min="0"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button type="submit">Add Product</button>
            </form>

            <input
              className="search-input"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>₹{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="5">No products found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {page !== "Dashboard" && page !== "Products" && (
          <div className="content-header">
            <h1>{page}</h1>
            <p>This section will be added next.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;