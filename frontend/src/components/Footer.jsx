export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>HazelUI</h2>

          <p>
            Building modern, scalable, and interactive
            React applications with clean UI/UX.
          </p>

          <span className="footer-tag">
            Frontend Developer • React Enthusiast
          </span>
        </div>

        {/* CONNECT */}
        <div className="footer-column">
          <h4>Connect</h4>

          <a
            href="https://github.com/hazeljaneguno"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/your-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a
            href="mailto:hazel@example.com"
          >
            Email
          </a>
        </div>

        {/* RESOURCES */}
        <div className="footer-column">
          <h4>Resources</h4>

          <a
            href="/Resume.pdf"
            download
          >
            📄 Resume PDF
          </a>

          <a
            href="/Resume.png"
            download
          >
            🖼 Resume Preview
          </a>

          <a href="#">
            Case Studies
          </a>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-column">
          <h4>Stay Updated</h4>

          <p>
            Get notified about new projects,
            UI experiments, and updates.
          </p>

          <form
            className="footer-input"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
            />

            <button type="submit">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">

        <p>
          © {year} HazelUI — Designed & Built with React.
        </p>

      </div>
    </footer>
  );
}