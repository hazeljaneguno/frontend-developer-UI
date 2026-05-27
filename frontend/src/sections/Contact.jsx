export default function Contact() {
  return (
    <section className="contact">
      <div className="container contact-grid">

        {/* LEFT SIDE */}
        <div className="contact-info">

          <span className="contact-badge">
            CONTACT
          </span>

          <h2>
            Let’s Build Something Amazing Together
          </h2>

          <p>
            I create modern React interfaces,
            responsive web experiences, and scalable
            frontend systems for startups,
            businesses, and creative projects.
          </p>

          {/* INFO CARDS */}
          <div className="info-box">
            <h4>Email</h4>

            <a href="mailto:gunohazeljane@gmail.com">
              gunohazeljane@gmail.com
            </a>
          </div>

          <div className="info-box">
            <h4>Location</h4>

            <p>Philippines</p>
          </div>

          <div className="info-box">
            <h4>Availability</h4>

            <p>
              Open for freelance,
              frontend work, and collaborations
            </p>
          </div>

          {/* SOCIALS */}
          <div className="social-links">

            <a
              href="https://github.com/hazeljaneguno"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
  href="https://facebook.com/hazeljaneguno"
  target="_blank"
  rel="noopener noreferrer"
>
  Facebook
</a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <form className="contact-form">

          <div className="input-group">
            <input
              type="text"
              placeholder="Your Name"
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Your Email"
            />
          </div>

          <div className="input-group">
            <textarea
              placeholder="Tell me about your project..."
              rows="6"
            />
          </div>

          <button
            type="submit"
            className="primary-btn"
          >
            Send Message
          </button>

        </form>

      </div>
    </section>
  );
}