import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./LaboratoryDashboard.css";

const navItems = [
  { icon: "📊", label: "Dashboard" },
  { icon: "🧪", label: "Test Requests" },
  { icon: "📄", label: "Results" },
  { icon: "👤", label: "Patients" },
  { icon: "🔬", label: "Equipment" },
  { icon: "📈", label: "Reports" },
  { icon: "⚙️", label: "Settings" },
];

const statsData = [
  { icon: "🧪", value: "184", label: "Tests Today", change: "+22", changeColor: "#10b981", bg: "#f0fdf4" },
  { icon: "⏳", value: "47", label: "Pending Results", change: "8 urgent", changeColor: "#f59e0b", bg: "#fffbeb" },
  { icon: "✅", value: "137", label: "Completed", change: "74%", changeColor: "#10b981", bg: "#f0fdf4" },
  { icon: "⚠️", value: "6", label: "Critical Alerts", change: "Needs review", changeColor: "#ef4444", bg: "#fef2f2", highlight: true },
];

const equipment = [
  { name: "Hematology Analyzer", model: "Sysmex XN-1000", status: "Operational", statusColor: "#8b5cf6", percent: 98 },
  { name: "Chemistry Analyzer", model: "Roche Cobas 501", status: "Operational", statusColor: "#8b5cf6", percent: 95 },
  { name: "PCR Machine", model: "Bio-Rad CFX96", status: "Maintenance", statusColor: "#ef4444", percent: 72 },
  { name: "Centrifuge", model: "Eppendorf 5810R", status: "Operational", statusColor: "#8b5cf6", percent: 99 },
];

const testRequests = [
  { id: "T001", patient: "Oliver Scott", test: "Complete Blood Count", referredBy: "Dr. Chen", received: "07:30 AM", priority: "Routine", status: "Completed", statusColor: "#10b981" },
  { id: "T002", patient: "Mia Johnson", test: "Lipid Panel", referredBy: "Dr. Patel", received: "08:15 AM", priority: "Routine", status: "In Progress", statusColor: "#3b82f6" },
  { id: "T003", patient: "Ethan Clark", test: "Thyroid Function", referredBy: "Dr. Wilson", received: "08:45 AM", priority: "Stat", status: "Pending", statusColor: "#f59e0b" },
  { id: "T004", patient: "Ava Martinez", test: "Urinalysis", referredBy: "Dr. Moore", received: "09:00 AM", priority: "Urgent", status: "Completed", statusColor: "#10b981" },
  { id: "T005", patient: "Noah Davis", test: "Blood Glucose", referredBy: "Dr. Chen", received: "09:30 AM", priority: "Stat", status: "Pending", statusColor: "#f59e0b" },
];

const chartPoints = [
  { x: 0, y: 10 }, { x: 1, y: 18 }, { x: 2, y: 25 },
  { x: 3, y: 35 }, { x: 4, y: 38 }, { x: 5, y: 32 },
  { x: 6, y: 30 }, { x: 7, y: 42 }, { x: 8, y: 38 },
  { x: 9, y: 30 }, { x: 10, y: 32 }, { x: 11, y: 28 },
  { x: 12, y: 22 },
];

function LaboratoryDashboard({ user }) {
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

  // SVG chart
  const chartWidth = 700;
  const chartHeight = 200;
  const maxY = 60;
  const toSvg = (pt) => ({
    x: (pt.x / 12) * chartWidth,
    y: chartHeight - (pt.y / maxY) * chartHeight,
  });
  const pathD = chartPoints
    .map((pt, i) => {
      const { x, y } = toSvg(pt);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");
  const areaD = pathD + ` L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  // Dot positions
  const dots = chartPoints.map((pt) => toSvg(pt));

  return (
    <div className="ld-layout">
      {/* Sidebar */}
      <aside className="ld-sidebar">
        <div className="ld-sidebar-top">
          <div className="ld-brand">
            <div className="ld-brand-icon">💜</div>
            <div>
              <span className="ld-brand-name">MediCare <span>Pro</span></span>
              <span className="ld-brand-sub">Lab Management</span>
            </div>
          </div>
          <div className="ld-nav">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`ld-nav-item ${activeNav === item.label ? "active" : ""}`}
                onClick={() => setActiveNav(item.label)}
              >
                <span className="ld-nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="ld-sidebar-bottom">
          <div
            className="ld-user-profile"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="ld-user-avatar">{initials}</div>
            <div className="ld-user-info">
              <span className="ld-user-name">{userName}</span>
              <span className="ld-user-role">Administrator</span>
            </div>
            <span className="ld-user-chevron">⌄</span>
          </div>
          {showProfile && (
            <div className="ld-profile-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="ld-main">
        {/* Page Header */}
        <div className="ld-page-header">
          <div>
            <h2>Laboratory Dashboard</h2>
            <p>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="ld-notification">
            🔔
            <span className="ld-notif-badge"></span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="ld-stats">
          {statsData.map((stat) => (
            <div
              className={`ld-stat-card ${stat.highlight ? "ld-stat-highlight" : ""}`}
              key={stat.label}
            >
              <div className="ld-stat-top">
                <div className="ld-stat-icon" style={{ background: stat.bg }}>
                  {stat.icon}
                </div>
                <span className="ld-stat-change" style={{ color: stat.changeColor }}>
                  {stat.change}
                </span>
              </div>
              <div className="ld-stat-value">{stat.value}</div>
              <div className="ld-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Chart + Equipment Row */}
        <div className="ld-middle-row">
          {/* Line Chart */}
          <div className="ld-chart-card">
            <div className="ld-chart-header">
              <div>
                <h3>Tests Processed Today</h3>
                <p>Hourly throughput</p>
              </div>
              <span className="ld-chart-icon">📈</span>
            </div>
            <div className="ld-chart-area">
              <div className="ld-chart-y-labels">
                <span>60</span>
                <span>45</span>
                <span>30</span>
                <span>15</span>
                <span>0</span>
              </div>
              <div className="ld-chart-svg-wrap">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  preserveAspectRatio="none"
                  className="ld-chart-svg"
                >
                  <defs>
                    <linearGradient id="labChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={areaD} fill="url(#labChartGrad)" />
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {dots.map((dot, i) => (
                    <circle
                      key={i}
                      cx={dot.x}
                      cy={dot.y}
                      r="5"
                      fill="#8b5cf6"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                  ))}
                </svg>
                <div className="ld-chart-x-labels">
                  <span>7AM</span>
                  <span>8AM</span>
                  <span>9AM</span>
                  <span>10AM</span>
                  <span>11AM</span>
                  <span>12PM</span>
                  <span>1PM</span>
                  <span>2PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Status */}
          <div className="ld-equipment-card">
            <h3>⚙️ Equipment Status</h3>
            <div className="ld-equipment-list">
              {equipment.map((eq, i) => (
                <div className="ld-equipment-item" key={i}>
                  <div className="ld-equipment-top">
                    <div className="ld-equipment-info">
                      <span className="ld-equipment-name">{eq.name}</span>
                      <span className="ld-equipment-model">{eq.model}</span>
                    </div>
                    <span
                      className="ld-equipment-status"
                      style={{
                        color: eq.statusColor,
                        background: eq.statusColor + "15",
                        border: `1px solid ${eq.statusColor}30`,
                      }}
                    >
                      {eq.status}
                    </span>
                  </div>
                  <div className="ld-equipment-bar-row">
                    <div className="ld-equipment-bar-track">
                      <div
                        className="ld-equipment-bar-fill"
                        style={{
                          width: `${eq.percent}%`,
                          background: eq.status === "Maintenance" ? "#ef4444" : "#8b5cf6",
                        }}
                      ></div>
                    </div>
                    <span className="ld-equipment-percent">{eq.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Requests Table */}
        <div className="ld-requests-card">
          <div className="ld-requests-header">
            <div>
              <h3>Today's Test Requests</h3>
              <p>6 requests received</p>
            </div>
            <div className="ld-status-legend">
              <span className="ld-legend-item">
                <span className="ld-legend-dot" style={{ background: "#ef4444" }}></span>
                Stat
              </span>
              <span className="ld-legend-item">
                <span className="ld-legend-dot" style={{ background: "#f59e0b" }}></span>
                Urgent
              </span>
            </div>
          </div>
          <table className="ld-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Test</th>
                <th>Referred By</th>
                <th>Received</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {testRequests.map((req) => (
                <tr key={req.id}>
                  <td className="ld-cell-id">{req.id}</td>
                  <td className="ld-cell-patient">{req.patient}</td>
                  <td>{req.test}</td>
                  <td>{req.referredBy}</td>
                  <td>{req.received}</td>
                  <td>
                    <span className={`ld-priority ${req.priority.toLowerCase()}`}>
                      {req.priority}
                    </span>
                  </td>
                  <td>
                    <span
                      className="ld-status-badge"
                      style={{
                        color: req.statusColor,
                        background: req.statusColor + "15",
                        border: `1px solid ${req.statusColor}30`,
                      }}
                    >
                      {req.status}
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

export default LaboratoryDashboard;
