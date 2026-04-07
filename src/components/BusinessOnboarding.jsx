import { useState } from "react";
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./BusinessOnboarding.css";

function BusinessOnboarding({ user, onComplete }) {
  const [formData, setFormData] = useState({
    fullName: user.displayName || "",
    email: user.email || "",
    phone: "",
    mailingAddress: "",
    businessName: "",
    businessAddress: "",
    businessPhone: "",
    businessMailingAddress: "",
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let fileURLs = [];

      if (files.length > 0) {
        for (const file of files) {
          const storageRef = ref(storage, `onboarding/${user.uid}/${file.name}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          fileURLs.push({ name: file.name, url });
        }
      }

      await setDoc(doc(db, "businesses", user.uid), {
        personalInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          mailingAddress: formData.mailingAddress,
        },
        businessInfo: {
          businessName: formData.businessName,
          businessAddress: formData.businessAddress,
          businessPhone: formData.businessPhone,
          businessMailingAddress: formData.businessMailingAddress,
        },
        files: fileURLs,
        onboardingCompleted: true,
        createdAt: new Date().toISOString(),
        uid: user.uid,
      });

      onComplete();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-wrapper">
      <div className="onboarding-container">
        <div className="onboarding-header">
          <h1 className="onboarding-logo">ola<span>doc</span></h1>
          <h2>Business Onboarding</h2>
          <p>Complete your profile to get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="onboarding-section">
            <h3>Personal Information</h3>
            <div className="onboarding-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mailing Address</label>
                <input
                  type="text"
                  name="mailingAddress"
                  placeholder="Enter your mailing address"
                  value={formData.mailingAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="onboarding-section">
            <h3>Business Information</h3>
            <div className="onboarding-grid">
              <div className="form-group">
                <label>Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Business Address</label>
                <input
                  type="text"
                  name="businessAddress"
                  placeholder="Enter business address"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Business Phone Number</label>
                <input
                  type="tel"
                  name="businessPhone"
                  placeholder="Enter business phone number"
                  value={formData.businessPhone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Business Mailing Address</label>
                <input
                  type="text"
                  name="businessMailingAddress"
                  placeholder="Enter business mailing address"
                  value={formData.businessMailingAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="onboarding-section">
            <h3>Attachments <span className="optional-tag">Optional</span></h3>
            <div className="file-upload-area">
              <label className="file-upload-label" htmlFor="file-input">
                <div className="file-upload-icon">📎</div>
                <p>Click to upload files</p>
                <span>PDF, DOC, JPG, PNG (Max 10MB each)</span>
              </label>
              <input
                id="file-input"
                type="file"
                multiple
                onChange={handleFileChange}
                className="file-input-hidden"
              />
              {files.length > 0 && (
                <div className="file-list">
                  {files.map((file, index) => (
                    <div key={index} className="file-item">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="onboarding-btn" disabled={loading}>
            {loading ? "Saving..." : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BusinessOnboarding;
