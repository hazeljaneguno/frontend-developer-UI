import featuresData from "../data/features";

export default function Features() {
  return (
    <section className="features">
      <div className="container">

        <div className="section-title">
          <span>WHY US</span>
          <h2>Animated Features</h2>
        </div>

        {/* EDGE FADE WRAPPER */}
        <div className="feature-mask">

          <div className="feature-track">
            {[...featuresData, ...featuresData].map((item, i) => (
              <div className="feature-card" key={i}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}