import './App.css'

function App() {
  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <span>🛒</span>
          <h2>Smart Shop</h2>
        </div>

        <nav>
          <a href="#" className="nav-item active">
            <span>📊</span>
            Dashboard
          </a>

          <a href="#" className="nav-item">
            <span>📦</span>
            Products
          </a>

          <a href="#" className="nav-item">
            <span>🛍️</span>
            Sales
          </a>

          <a href="#" className="nav-item">
            <span>📋</span>
            Inventory
          </a>

          <a href="#" className="nav-item">
            <span>👥</span>
            Customers
          </a>

          <a href="#" className="nav-item">
            <span>🚚</span>
            Suppliers
          </a>

          <a href="#" className="nav-item">
            <span>📈</span>
            Reports
          </a>

          <a href="#" className="nav-item">
            <span>⚙️</span>
            Settings
          </a>
        </nav>

        <div className="logout">
          <a href="#" className="nav-item">
            <span>🚪</span>
            Logout
          </a>
        </div>
      </aside>


      {/* Main Content */}
      <main className="main-content">

        {/* Top Navbar */}
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Admin 👋</p>
          </div>

          <div className="admin-profile">
            <div className="notification">🔔</div>

            <div className="avatar">
              A
            </div>

            <div className="admin-info">
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>


        {/* Stats Cards */}
        <section className="stats-grid">

          <div className="stat-card blue">
            <div className="stat-icon">💰</div>
            <div>
              <p>Total Sales</p>
              <h2>₹85,420</h2>
              <span className="growth">↑ 12.5% this month</span>
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-icon">📦</div>
            <div>
              <p>Total Products</p>
              <h2>1,245</h2>
              <span className="growth">↑ 8 new products</span>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon">👥</div>
            <div>
              <p>Total Customers</p>
              <h2>856</h2>
              <span className="growth">↑ 24 new customers</span>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">📈</div>
            <div>
              <p>Total Profit</p>
              <h2>₹32,650</h2>
              <span className="growth">↑ 9.8% this month</span>
            </div>
          </div>

        </section>


        {/* Dashboard Grid */}
        <section className="dashboard-grid">

          {/* Sales Overview */}
          <div className="dashboard-card sales-card">

            <div className="card-header">
              <div>
                <h3>Sales Overview</h3>
                <p>Monthly sales performance</p>
              </div>

              <select>
                <option>Last 7 Months</option>
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>

            <div className="chart">

              <div className="chart-y">
                <span>50k</span>
                <span>40k</span>
                <span>30k</span>
                <span>20k</span>
                <span>10k</span>
                <span>0</span>
              </div>

              <div className="chart-area">

                <div className="grid-line line1"></div>
                <div className="grid-line line2"></div>
                <div className="grid-line line3"></div>
                <div className="grid-line line4"></div>
                <div className="grid-line line5"></div>

                <div className="bars">
                  <div className="bar-wrap">
                    <div className="bar" style={{height: '45%'}}></div>
                    <span>Jan</span>
                  </div>

                  <div className="bar-wrap">
                    <div className="bar" style={{height: '60%'}}></div>
                    <span>Feb</span>
                  </div>

                  <div className="bar-wrap">
                    <div className="bar" style={{height: '52%'}}></div>
                    <span>Mar</span>
                  </div>

                  <div className="bar-wrap">
                    <div className="bar" style={{height: '72%'}}></div>
                    <span>Apr</span>
                  </div>

                  <div className="bar-wrap">
                    <div className="bar" style={{height: '65%'}}></div>
                    <span>May</span>
                  </div>

                  <div className="bar-wrap">
                    <div className="bar" style={{height: '82%'}}></div>
                    <span>Jun</span>
                  </div>

                  <div className="bar-wrap">
                    <div className="bar highlight" style={{height: '92%'}}></div>
                    <span>Jul</span>
                  </div>
                </div>

              </div>

            </div>

          </div>


          {/* Low Stock */}
          <div className="dashboard-card">

            <div className="card-header">
              <div>
                <h3>Low Stock</h3>
                <p>Products running low</p>
              </div>

              <a href="#" className="view-all">View All</a>
            </div>

            <div className="stock-list">

              <div className="stock-item">
                <div className="product-icon">🍚</div>
                <div className="product-info">
                  <strong>Rice 5kg</strong>
                  <span>Grocery</span>
                </div>
                <b className="danger">5 left</b>
              </div>

              <div className="stock-item">
                <div className="product-icon">🛢️</div>
                <div className="product-info">
                  <strong>Cooking Oil</strong>
                  <span>Grocery</span>
                </div>
                <b className="danger">7 left</b>
              </div>

              <div className="stock-item">
                <div className="product-icon">🥛</div>
                <div className="product-info">
                  <strong>Milk 1L</strong>
                  <span>Dairy</span>
                </div>
                <b className="danger">4 left</b>
              </div>

              <div className="stock-item">
                <div className="product-icon">☕</div>
                <div className="product-info">
                  <strong>Tea 250g</strong>
                  <span>Beverages</span>
                </div>
                <b className="danger">3 left</b>
              </div>

            </div>

          </div>

        </section>


        {/* Recent Sales */}
        <section className="dashboard-card recent-sales">

          <div className="card-header">
            <div>
              <h3>Recent Sales</h3>
              <p>Latest transactions from your shop</p>
            </div>

            <a href="#" className="view-all">View All Sales</a>
          </div>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td><strong>#INV001</strong></td>
                  <td>Rahul Sharma</td>
                  <td>10 Aug 2026</td>
                  <td><strong>₹2,450</strong></td>
                  <td>
                    <span className="status paid">Paid</span>
                  </td>
                </tr>

                <tr>
                  <td><strong>#INV002</strong></td>
                  <td>Priya Singh</td>
                  <td>10 Aug 2026</td>
                  <td><strong>₹1,850</strong></td>
                  <td>
                    <span className="status paid">Paid</span>
                  </td>
                </tr>

                <tr>
                  <td><strong>#INV003</strong></td>
                  <td>Amit Kumar</td>
                  <td>09 Aug 2026</td>
                  <td><strong>₹3,200</strong></td>
                  <td>
                    <span className="status pending">Pending</span>
                  </td>
                </tr>

                <tr>
                  <td><strong>#INV004</strong></td>
                  <td>Neha Verma</td>
                  <td>09 Aug 2026</td>
                  <td><strong>₹1,250</strong></td>
                  <td>
                    <span className="status paid">Paid</span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  )
}

export default App