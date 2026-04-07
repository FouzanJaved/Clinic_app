import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./ClinicDashboard.css";

const navItems = [
  { icon: "📊", label: "Dashboard" },
  { icon: "👥", label: "Patients" },
  { icon: "📅", label: "Appointments" },
  { icon: "🩺", label: "Doctors" },
  { icon: "📋", label: "Medical Records" },
  { icon: "💳", label: "Billing" },
  { icon: "⚙️", label: "Settings" },
];

const statsData = [
  { icon: "👥", value: "1,284", label: "Total Patients", change: "+12%", changeColor: "#10b981", bg: "#f0fdf4" },
  { icon: "📅", value: "38", label: "Today's Appointments", change: "+5", changeColor: "#0ea5e9", bg: "#f0f9ff" },
  { icon: "🩺", value: "14", label: "Active Doctors", change: "2 on leave", changeColor: "#f59e0b", bg: "#fffbeb" },
  { icon: "💰", value: "$24,850", label: "Monthly Revenue", change: "+8.2%", changeColor: "#10b981", bg: "#f0fdf4", highlight: true },
];

const doctors = [
  { initials: "MC", name: "Dr. Michael Chen", specialty: "General Medicine", status: "Available", statusColor: "#10b981", bg: "#3b82f6" },
  { initials: "AP", name: "Dr. Aisha Patel", specialty: "Cardiology", status: "In Surgery", statusColor: "#ef4444", bg: "#10b981" },
  { initials: "JW", name: "Dr. James Wilson", specialty: "Pediatrics", status: "Available", statusColor: "#10b981", bg: "#8b5cf6" },
  { initials: "LM", name: "Dr. Linda Moore", specialty: "Dentistry", status: "On Break", statusColor: "#f59e0b", bg: "#f59e0b" },
];

const appointments = [
  { id: "A001", patient: "Sarah Johnson", doctor: "Dr. Michael Chen", time: "09:00 AM", type: "General Checkup", status: "Confirmed", statusColor: "#10b981" },
  { id: "A002", patient: "Robert Williams", doctor: "Dr. Aisha Patel", time: "09:30 AM", type: "Follow-up", status: "In Progress", statusColor: "#3b82f6" },
  { id: "A003", patient: "Emily Davis", doctor: "Dr. James Wilson", time: "10:00 AM", type: "Consultation", status: "Confirmed", statusColor: "#10b981" },
  { id: "A004", patient: "David Martinez", doctor: "Dr. Linda Moore", time: "10:30 AM", type: "Dental", status: "Pending", statusColor: "#f59e0b" },
  { id: "A005", patient: "Lisa Anderson", doctor: "Dr. Michael Chen", time: "11:00 AM", type: "Pediatrics", status: "Cancelled", statusColor: "#ef4444" },
];

const chartPoints = [
  { x: 0, y: 30 }, { x: 1, y: 33 }, { x: 2, y: 40 }, { x: 3, y: 38 },
  { x: 4, y: 42 }, { x: 5, y: 40 }, { x: 6, y: 45 }, { x: 7, y: 43 },
  { x: 8, y: 42 }, { x: 9, y: 50 }, { x: 10, y: 55 }, { x: 11, y: 52 },
  { x: 12, y: 48 }, { x: 13, y: 35 }, { x: 14, y: 20 },
];

function ClinicDashboard({ user }) {
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

  // Build SVG path
  const chartWidth = 700;
  const chartHeight = 200;
  const maxY = 60;
  const toSvg = (pt) => {
    const x = (pt.x / 14) * chartWidth;
    const y = chartHeight - (pt.y / maxY) * chartHeight;
    return { x, y };
  };
  const pathD = chartPoints
    .map((pt, i) => {
      const { x, y } = toSvg(pt);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");
  const areaD =
    pathD +
    ` L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <div className="cd-layout">
      {/* Sidebar */}
      <aside className="cd-sidebar">
        <div className="cd-sidebar-top">
          <div className="cd-nav">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`cd-nav-item ${activeNav === item.label ? "active" : ""}`}
                onClick={() => setActiveNav(item.label)}
              >
                <span className="cd-nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="cd-sidebar-bottom">
          <div
            className="cd-user-profile"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="cd-user-avatar">{initials}</div>
            <div className="cd-user-info">
              <span className="cd-user-name">{userName}</span>
              <span className="cd-user-role">Administrator</span>
            </div>
            <span className="cd-user-chevron">⌄</span>
          </div>
          {showProfile && (
            <div className="cd-profile-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="cd-main">
        {/* Stats Cards */}
        <div className="cd-stats">
          {statsData.map((stat) => (
            <div
              className={`cd-stat-card ${stat.highlight ? "cd-stat-highlight" : ""}`}
              key={stat.label}
            >
              <div className="cd-stat-top">
                <div className="cd-stat-icon" style={{ background: stat.bg }}>
                  {stat.icon}
                </div>
                <span
                  className="cd-stat-change"
                  style={{ color: stat.changeColor }}
                >
                  {stat.change}
                </span>
              </div>
              <div className="cd-stat-value">{stat.value}</div>
              <div className="cd-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Chart + Doctors Row */}
        <div className="cd-middle-row">
          {/* Chart */}
          <div className="cd-chart-card">
            <div className="cd-chart-header">
              <div>
                <h3>Weekly Patient Visits</h3>
                <p>This week overview</p>
              </div>
              <span className="cd-chart-icon">📈</span>
            </div>
            <div className="cd-chart-area">
              <div className="cd-chart-y-labels">
                <span>60</span>
                <span>45</span>
                <span>30</span>
                <span>15</span>
                <span>0</span>
              </div>
              <div className="cd-chart-svg-wrap">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  preserveAspectRatio="none"
                  className="cd-chart-svg"
                >
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={areaD} fill="url(#chartGrad)" />
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="cd-chart-x-labels">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Doctors on Duty */}
          <div className="cd-doctors-card">
            <h3>Doctors on Duty</h3>
            <div className="cd-doctors-list">
              {doctors.map((doc) => (
                <div className="cd-doctor-item" key={doc.initials}>
                  <div
                    className="cd-doctor-avatar"
                    style={{ background: doc.bg }}
                  >
                    {doc.initials}
                  </div>
                  <div className="cd-doctor-info">
                    <span className="cd-doctor-name">{doc.name}</span>
                    <span className="cd-doctor-specialty">{doc.specialty}</span>
                  </div>
                  <span
                    className="cd-doctor-status"
                    style={{ color: doc.statusColor }}
                  >
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="cd-appointments-card">
          <div className="cd-appointments-header">
            <div>
              <h3>Today's Appointments</h3>
              <p>6 scheduled</p>
            </div>
            <div className="cd-status-legend">
              <span className="cd-legend-item">
                <span className="cd-legend-dot" style={{ background: "#10b981" }}></span>
                Confirmed
              </span>
              <span className="cd-legend-item">
                <span className="cd-legend-dot" style={{ background: "#f59e0b" }}></span>
                Pending
              </span>
              <span className="cd-legend-item">
                <span className="cd-legend-dot" style={{ background: "#ef4444" }}></span>
                Cancelled
              </span>
            </div>
          </div>
          <table className="cd-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Time</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt.id}>
                  <td className="cd-cell-id">{apt.id}</td>
                  <td className="cd-cell-patient">{apt.patient}</td>
                  <td>{apt.doctor}</td>
                  <td>{apt.time}</td>
                  <td>{apt.type}</td>
                  <td>
                    <span
                      className="cd-status-badge"
                      style={{
                        color: apt.statusColor,
                        background: apt.statusColor + "15",
                        border: `1px solid ${apt.statusColor}30`,
                      }}
                    >
                      {apt.status}
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

export default ClinicDashboard;
