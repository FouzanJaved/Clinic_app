import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import applelogo from "../assets/applelogo.png";
import googlelogo from "../assets/googlelogo.png";
import linkedinlogo from "../assets/linkedinlogo.png";

function Login({ onToggle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setSuccess(`Welcome back, ${userCredential.user.displayName || userCredential.user.email}`);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Welcome back</h2>
        <p>Please enter your details to sign in.</p>
      </div>

      <div className="social-buttons">
        <button className="social-btn" title="Apple"><img src={applelogo} alt="Apple" style={{ width: 22, height: 22 }} /></button>
        <button className="social-btn" title="Google"><img src={googlelogo} alt="Google" style={{ width: 22, height: 22 }} /></button>
        <button className="social-btn" title="LinkedIn"><img src={linkedinlogo} alt="LinkedIn" style={{ width: 22, height: 22 }} /></button>
      </div>

      <div className="divider"><span>OR</span></div>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>E-Mail Address</label>
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password@123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" /> Remember me
          </label>
          <button type="button" className="forgot-link">Forgot password?</button>
        </div>

        <button type="submit" className="auth-btn">Sign in</button>
      </form>

      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <div className="auth-toggle">
        Don't have an account yet? <button onClick={onToggle}>Sign up</button>
      </div>
    </div>
  );
}

export default Login;
