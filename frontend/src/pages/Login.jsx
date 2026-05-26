import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= REDIRECT SUPPORT ================= */
  const redirectPath = location.state?.from || "/";
  const pendingAction = location.state?.action;

  /* ================= STATES ================= */
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= REDIRECT AFTER LOGIN ================= */
  const handleSuccessLogin = () => {
    navigate(redirectPath, {
      replace: true,
      state: pendingAction
        ? {
            action: pendingAction,
          }
        : null,
    });
  };

  /* ================= EMAIL LOGIN ================= */
  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      handleSuccessLogin();
    } catch (err) {
      console.error("Login Error:", err);

      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found.");
          break;

        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/invalid-email":
          setError("Invalid email format.");
          break;

        case "auth/too-many-requests":
          setError(
            "Too many attempts. Try again later."
          );
          break;

        default:
          setError("Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= SOCIAL LOGIN ================= */
  const socialLogin = async (provider) => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(
        auth,
        provider
      );

      console.log(
        "✅ LOGIN USER:",
        result.user
      );

      handleSuccessLogin();
    } catch (err) {
      console.error("Social Login Error:", err);

      switch (err.code) {
        case "auth/popup-closed-by-user":
          setError("Login popup closed.");
          break;

        case "auth/cancelled-popup-request":
          setError(
            "Login already in progress."
          );
          break;

        default:
          setError("Social login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    socialLogin(new GoogleAuthProvider());
  };

  const handleGithub = () => {
    socialLogin(new GithubAuthProvider());
  };

  const handleFacebook = () => {
    socialLogin(new FacebookAuthProvider());
  };

  /* ================= UI ================= */
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-top">
          <h1>HazelUI</h1>
          <p>
            Login to continue to your dashboard
          </p>
        </div>

        {/* EMAIL LOGIN FORM */}
        <form
          onSubmit={handleEmailLogin}
          className="login-form"
        >
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
              />

              <button
                type="button"
                className="toggle-btn"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="divider">OR</div>

        {/* SOCIAL LOGIN */}
        <div className="social-login">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
          >
            Continue with Google
          </button>

          <button
            type="button"
            onClick={handleGithub}
            disabled={loading}
          >
            Continue with GitHub
          </button>

          <button
            type="button"
            onClick={handleFacebook}
            disabled={loading}
          >
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}