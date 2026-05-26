import { ArrowRight, Globe, Sparkles } from "lucide-react";

export default function Hero({ scrollTo, refs }) {
  return (
    <section className="hero">

      {/* background glow */}
      <div className="hero-bg" />

      <div className="container hero-content">

        {/* LEFT SIDE */}
        <div className="left">

          <div className="badge">
            <Sparkles size={16} />
            Modern React UI System
          </div>

          <h1>
            Build <span>beautiful</span>, fast & modern websites
          </h1>

          <p>
            Production-ready SaaS landing system inspired by Stripe & Apple design systems.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => scrollTo(refs.featuresRef)}
            >
              Get Started <ArrowRight size={18} />
            </button>

            <button
              className="secondary-btn"
              onClick={() => scrollTo(refs.pricingRef)}
            >
              View Pricing
            </button>

          </div>

        </div>
<div className="right">

  <div className="glass-card hero-card">

    <div className="hero-icon">
      <Globe size={32} />
    </div>

    <div className="hero-card-content">

      <h3>Global UI System</h3>

      <p>
        Modern responsive SaaS interface with scalable
        React architecture.
      </p>

      <div className="hero-stats">

        <div className="stat-box">
          <h4>+50</h4>
          <span>Components</span>
        </div>

        <div className="stat-box">
          <h4>100%</h4>
          <span>Responsive</span>
        </div>

        <div className="stat-box">
          <h4>Fast</h4>
          <span>Performance</span>
        </div>

      </div>

    </div>

  </div>

</div>

      </div>
    </section>
  );
}