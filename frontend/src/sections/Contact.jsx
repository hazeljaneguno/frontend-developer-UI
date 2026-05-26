export default function Contact() {
  return (
    <section className="contact">
      <div className="container contact-grid">

        {/* LEFT SIDE */}
        <div className="contact-info">
          <h2>Let’s work together</h2>
          <p>
            Send me a message and I’ll reply as soon as possible.
            I’m open for freelance, frontend work, and collaborations.
          </p>

          <div className="info-box">
            <h4>Email</h4>
            <p>gunohazeljane@gmail.com</p>
          </div>

          <div className="info-box">
            <h4>Location</h4>
            <p>Philippines</p>
          </div>

          <div className="info-box">
            <h4>Social</h4>
            <p>GitHub / Facebook / Instagram</p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message" rows="6"></textarea>

          <button type="submit" className="primary-btn">
            Send Message
          </button>
        </form>

      </div>
    </section>
  );
}