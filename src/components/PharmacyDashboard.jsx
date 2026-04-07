import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./PharmacyDashboard.css";

const navItems = [
  { icon: "📊", label: "Dashboard" },
  { icon: "📦", label: "Inventory" },
  { icon: "💊", label: "Prescriptions" },
  { icon: "💰", label: "Sales" },
  { icon: "🚚", label: "Suppliers" },
  { icon: "📈", label: "Reports" },
  { icon: "⚙️", label: "Settings" },
];

const statsData = [
  { icon: "💊", value: "2,341", label: "Total Products", change: "+18", changeColor: "#10b981", bg: "#f0fdf4" },
  { icon: "⚠️", value: "27", label: "Low Stock Alerts", change: "Needs reorder", changeColor: "#f59e0b", bg: "#fffbeb" },
  { icon: "🛒", value: "$3,820", label: "Today's Sales", change: "+14%", changeColor: "#10b981", bg: "#f0fdf4" },
  { icon: "📋", value: "53", label: "Pending Rx", change: "12 urgent", changeColor: "#ef4444", bg: "#fef2f2", highlight: true },
];

const prescriptions = [
  { name: "Emma Harris", doctor: "Dr. Chen", items: 3, time: "Today 08:45", status: "Filled", statusColor: "#10b981" },
  { name: "Carlos Rivera", doctor: "Dr. Patel", items: 2, time: "Today 09:10", status: "Pending", statusColor: "#f59e0b" },
  { name: "Sophia Lee", doctor: "Dr. Wilson", items: 5, time: "Today 09:30", status: "Pending", statusColor: "#f59e0b" },
  { name: "Henry Brown", doctor: "Dr. Moore", items: 1, time: "Today 10:00", status: "Filled", statusColor: "#10b981" },
];

const inventory = [
  { id: "M001", medicine: "Amoxicillin 500mg", category: "Antibiotic", stock: 240, maxStock: 300, price: "$12.50", expiry: "Dec 2026", status: "In Stock", statusColor: "#10b981" },
  { id: "M002", medicine: "Metformin 850mg", category: "Diabetes", stock: 18, maxStock: 300, price: "$8.20", expiry: "Aug 2026", status: "Low Stock", statusColor: "#f59e0b" },
  { id: "M003", medicine: "Lisinopril 10mg", category: "Hypertension", stock: 312, maxStock: 400, price: "$5.80", expiry: "Mar 2027", status: "In Stock", statusColor: "#10b981" },
];

const chartData = [
  { month: "Oct", value: 8000 },
  { month: "Nov", value: 9500 },
  { month: "Dec", value: 14000 },
  { month: "Jan", value: 10000 },
  { month: "Feb", value: 12500 },
  { month: "Mar", value: 13000 },
];

function PharmacyDashboard({ user }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const userName = user.displayName || user.email;
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const maxChartVal = 16000;
  const barHeight = 220;

  return (
    <div className="pd-layout">
      {/* Sidebar */}
      <aside className="pd-sidebar">
        <div className="pd-sidebar-top">
          <div className="pd-brand">
            <div className="pd-brand-icon">💚</div>
            <div>
              <span className="pd-brand-name">MediCare <span>Pro</span></span>
              <span className="pd-brand-sub">Pharmacy Management</span>
            </div>
          </div>
          <div className="pd-nav">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`pd-nav-item ${activeNav === item.label ? "active" : ""}`}
                onClick={() => setActiveNav(item.label)}
              >
                <span className="pd-nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="pd-sidebar-bottom">
          <div
            className="pd-user-profile"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="pd-user-avatar">{initials}</div>
            <div className="pd-user-info">
              <span className="pd-user-name">{userName}</span>
              <span className="pd-user-role">Administrator</span>
            </div>
            <span className="pd-user-chevron">⌄</span>
          </div>
          {showProfile && (
            <div className="pd-profile-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="pd-main">
        {/* Page Header */}
        <div className="pd-page-header">
          <div>
            <h2>Pharmacy Dashboard</h2>
            <p>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="pd-notification">
            🔔
            <span className="pd-notif-badge"></span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="pd-stats">
          {statsData.map((stat) => (
            <div
              className={`pd-stat-card ${stat.highlight ? "pd-stat-highlight" : ""}`}
              key={stat.label}
            >
              <div className="pd-stat-top">
                <div className="pd-stat-icon" style={{ background: stat.bg }}>
                  {stat.icon}
                </div>
                <span className="pd-stat-change" style={{ color: stat.changeColor }}>
                  {stat.change}
                </span>
              </div>
              <div className="pd-stat-value">{stat.value}</div>
              <div className="pd-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Chart + Prescriptions Row */}
        <div className="pd-middle-row">
          {/* Bar Chart */}
          <div className="pd-chart-card">
            <div className="pd-chart-header">
              <div>
                <h3>Monthly Sales Revenue</h3>
                <p>Last 6 months</p>
              </div>
              <span className="pd-chart-icon">📈</span>
            </div>
            <div className="pd-chart-area">
              <div className="pd-chart-y-labels">
                <span>16000</span>
                <span>12000</span>
                <span>8000</span>
                <span>4000</span>
                <span>0</span>
              </div>
              <div className="pd-bars-container">
                {chartData.map((d) => (
                  <div className="pd-bar-group" key={d.month}>
                    <div className="pd-bar-track">
                      <div
                        className="pd-bar"
                        style={{ height: `${(d.value / maxChartVal) * barHeight}px` }}
                      ></div>
                    </div>
                    <span className="pd-bar-label">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Prescriptions */}
          <div className="pd-rx-card">
            <h3>Recent Prescriptions</h3>
            <div className="pd-rx-list">
              {prescriptions.map((rx, i) => (
                <div className="pd-rx-item" key={i}>
                  <div className="pd-rx-info">
                    <span className="pd-rx-name">{rx.name}</span>
                    <span className="pd-rx-details">
                      {rx.doctor} · {rx.items} Items · {rx.time}
                    </span>
                  </div>
                  <span
                    className="pd-rx-status"
                    style={{
                      color: rx.statusColor,
                      background: rx.statusColor + "15",
                      border: `1px solid ${rx.statusColor}30`,
                    }}
                  >
                    {rx.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medicine Inventory Table */}
        <div className="pd-inventory-card">
          <div className="pd-inventory-header">
            <div>
              <h3>Medicine Inventory</h3>
              <p>Stock levels overview</p>
            </div>
            <div className="pd-status-legend">
              <span className="pd-legend-item">
                <span className="pd-legend-dot" style={{ background: "#10b981" }}></span>
                In Stock
              </span>
              <span className="pd-legend-item">
                <span className="pd-legend-dot" style={{ background: "#f59e0b" }}></span>
                Low Stock
              </span>
            </div>
          </div>
          <table className="pd-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Medicine</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Expiry</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td className="pd-cell-id">{item.id}</td>
                  <td className="pd-cell-medicine">{item.medicine}</td>
                  <td>{item.category}</td>
                  <td>
                    <div className="pd-stock-cell">
                      <div className="pd-stock-bar-track">
                        <div
                          className="pd-stock-bar-fill"
                          style={{
                            width: `${(item.stock / item.maxStock) * 100}%`,
                            background: item.statusColor,
                          }}
                        ></div>
                      </div>
                      <span>{item.stock}</span>
                    </div>
                  </td>
                  <td>{item.price}</td>
                  <td>{item.expiry}</td>
                  <td>
                    <span
                      className="pd-status-badge"
                      style={{
                        color: item.statusColor,
                        background: item.statusColor + "15",
                        border: `1px solid ${item.statusColor}30`,
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default PharmacyDashboard;
