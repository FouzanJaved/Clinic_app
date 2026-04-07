import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./BusinessType.css";

const businessTypes = [
  {
    id: "clinic",
    icon: "🩺",
    badge: "Patient Care",
    badgeColor: "#0ea5e9",
    overlay: "linear-gradient(135deg, rgba(14, 165, 233, 0.7), rgba(6, 182, 212, 0.7))",
    title: "Clinic",
    description:
      "Manage patient appointments, doctor schedules, medical records, and billing for your clinic.",
    features: [
      "Patient Management",
      "Appointments",
      "Doctor Schedules",
      "Medical Records",
    ],
    dotColor: "#0ea5e9",
  },
  {
    id: "pharmacy",
    icon: "💊",
    badge: "Medicine & Stock",
    badgeColor: "#0ea5e9",
    overlay: "linear-gradient(135deg, rgba(14, 165, 233, 0.7), rgba(6, 182, 212, 0.7))",
    title: "Pharmacy",
    description:
      "Track inventory, manage prescriptions, handle sales, and monitor stock levels for your pharmacy.",
    features: [
      "Inventory Control",
      "Prescriptions",
      "Sales Tracking",
      "Supplier Orders",
    ],
    dotColor: "#0ea5e9",
  },
  {
    id: "laboratory",
    icon: "🔬",
    badge: "Diagnostics",
    badgeColor: "#a855f7",
    overlay: "linear-gradient(135deg, rgba(168, 85, 247, 0.7), rgba(139, 92, 246, 0.7))",
    title: "Laboratory",
    description:
      "Process test requests, manage results, track samples, and monitor lab equipment efficiently.",
    features: [
      "Test Requests",
      "Results Management",
      "Sample Tracking",
      "Equipment Status",
    ],
    dotColor: "#a855f7",
  },
];

function BusinessType({ user, onComplete }) {
  const [loading, setLoading] = useState(false);

  const handleSelect = async (type) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "businesses", user.uid), {
        businessType: type,
        businessTypeSelected: true,
      });
      onComplete(type);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bt-page">
      <div className="bt-content">
        <div className="bt-badge">Welcome to MediCare Pro</div>
        <h1 className="bt-heading">
          What type of <span>business</span> are you?
        </h1>
        <p className="bt-subtitle">
          Select your business type below to access your personalized management
          dashboard, tailored to your specific needs.
        </p>

        <div className="bt-cards">
          {businessTypes.map((biz) => (
            <div className="bt-card" key={biz.id}>
              <div
                className="bt-card-image"
                style={{ background: biz.overlay }}
              >
                <div className="bt-card-icon">{biz.icon}</div>
                <span
                  className="bt-card-badge"
                  style={{ backgroundColor: biz.badgeColor }}
                >
                  {biz.badge}
                </span>
              </div>
              <div className="bt-card-body">
                <h3>{biz.title}</h3>
                <p>{biz.description}</p>
                <ul>
                  {biz.features.map((f, i) => (
                    <li key={i}>
                      <span
                        className="bt-dot"
                        style={{ backgroundColor: biz.dotColor }}
                      ></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="bt-get-started"
                  style={{ color: biz.dotColor }}
                  onClick={() => handleSelect(biz.id)}
                  disabled={loading}
                >
                  Get Started <span className="bt-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bt-footer">
          &copy; 2026 MediCare Pro &middot; All rights reserved
        </div>
      </div>
    </div>
  );
}

export default BusinessType;
