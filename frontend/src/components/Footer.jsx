export default function Footer({ scrollTo, refs }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* BRAND */}
        <div className="footer-brand">
          <h3>HazelUI</h3>
          <p>
            Modern React UI kit built for fast,
            scalable, and beautiful web apps.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="footer-column">
          <h4>Navigation</h4>

          <button className="footer-link" onClick={() => scrollTo(refs.heroRef)}>
            Home
          </button>

          <button className="footer-link" onClick={() => scrollTo(refs.featuresRef)}>
            Features
          </button>

          <button className="footer-link" onClick={() => scrollTo(refs.pricingRef)}>
            Pricing
          </button>

          <button className="footer-link" onClick={() => scrollTo(refs.contactRef)}>
            Contact
          </button>
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
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a href="#">
            Portfolio
          </a>
        </div>

        {/* RESUME (NEW CLEAN SECTION) */}
        <div className="footer-column">
          <h4>Resume</h4>

          <a
            href="/Resume.pdf"
            download
            className="footer-link"
          >
            📄 Download PDF
          </a>

          <a
            href="/Resume.png"
            download
            className="footer-link"
          >
            🖼 Download PNG
          </a>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-column">
          <h4>Stay Updated</h4>

          <p>Get updates about new projects and features.</p>

          <form
            className="footer-input"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {year} HazelUI. All rights reserved.</p>
      </div>
    </footer>
  );
}