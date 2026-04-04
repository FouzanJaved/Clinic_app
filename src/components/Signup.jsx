// useState hook to manage component state (form inputs, errors, success messages)
import { useState } from "react";
// Import the auth instance we configured in firebase.js
import { auth } from "../firebase";
// createUserWithEmailAndPassword = Firebase function to register a new user
// updateProfile = Firebase function to update user's profile info (like displayName)
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// Import social login button logos from assets folder
import applelogo from "../assets/applelogo.png";
import googlelogo from "../assets/googlelogo.png";
import linkedinlogo from "../assets/linkedinlogo.png";

// Signup component - receives onToggle prop from App.jsx to switch to Login page
function Signup({ onToggle }) {
  // State for the name input field - starts as empty string
  const [name, setName] = useState("");
  // State for the email input field
  const [email, setEmail] = useState("");
  // State for the password input field
  const [password, setPassword] = useState("");
  // State to store error messages (e.g. "email already in use")
  const [error, setError] = useState("");
  // State to store success message after account creation
  const [success, setSuccess] = useState("");

  // async function because Firebase calls return Promises (we need to await them)
  // (e) = event object from the form submission
  const handleSignup = async (e) => {
    // Prevent the default form behavior (page reload on submit)
    e.preventDefault();
    // Clear any previous error or success messages
    setError("");
    setSuccess("");

    try {
      // Create a new user in Firebase with email & password
      // Returns a userCredential object containing the user info
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user's profile to add their display name
      // This saves the name to Firebase Auth (accessible via user.displayName)
      await updateProfile(userCredential.user, { displayName: name });
      // Show success message
      setSuccess(`Account created for ${name}`);
      // Clear the form fields after successful signup
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      // If anything fails (weak password, email already in use, etc.)
      // Show the Firebase error message to the user
      setError(err.message);
    }
  };

  // JSX - the UI that gets rendered
  return (
    // Main container div with glassmorphism styling (defined in App.css)
    <div className="auth-container">
      {/* Header section with title and subtitle */}
      <div className="auth-header">
        <h2>Create account</h2>
        <p>Please enter your details to sign up.</p>
      </div>

      {/* Social login buttons - Apple, Google, LinkedIn */}
      <div className="social-buttons">
        <button className="social-btn" title="Apple"><img src={applelogo} alt="Apple" style={{ width: 22, height: 22 }} /></button>
        <button className="social-btn" title="Google"><img src={googlelogo} alt="Google" style={{ width: 22, height: 22 }} /></button>
        <button className="social-btn" title="LinkedIn"><img src={linkedinlogo} alt="LinkedIn" style={{ width: 22, height: 22 }} /></button>
      </div>

      {/* Divider line with "OR" text between social buttons and form */}
      <div className="divider"><span>OR</span></div>

      {/* Form - onSubmit calls handleSignup when user clicks "Sign up" button */}
      <form onSubmit={handleSignup}>
        {/* Name input field */}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name..."
            value={name} // Controlled input - value comes from state
            onChange={(e) => setName(e.target.value)} // Update state on every keystroke
            required // HTML5 validation - field cannot be empty
          />
        </div>
        {/* Email input field */}
        <div className="form-group">
          <label>E-Mail Address</label>
          <input
            type="email" // HTML5 email validation (must contain @)
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password" // Hides the text as dots for security
            placeholder="Min 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit button - triggers form's onSubmit which calls handleSignup */}
        <button type="submit" className="auth-btn">Sign up</button>
      </form>

      {/* Show error message only if error state is not empty */}
      {error && <p className="error-msg">{error}</p>}
      {/* Show success message only if success state is not empty */}
      {success && <p className="success-msg">{success}</p>}

      {/* Toggle link to switch to Login page - calls onToggle from App.jsx */}
      <div className="auth-toggle">
        Already have an account? <button onClick={onToggle}>Sign in</button>
      </div>
    </div>
  );
}

// Export the component so it can be imported in App.jsx
export default Signup;
