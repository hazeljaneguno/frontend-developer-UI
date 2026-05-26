export default function LiveCards() {
  const cards = [
    {
      title: "UI Design",
      text: "Smooth modern interface with glass effects",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      title: "React System",
      text: "Reusable scalable components architecture",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    },
    {
      title: "Responsive UI",
      text: "Works perfectly on all devices",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
    },
    {
      title: "Glass Morphism",
      text: "Modern blurred UI aesthetic system",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    },
  ];

  return (
    <section className="live-section">
      <div className="container">

        <div className="section-title">
          <span>SHOWCASE</span>
          <h2>Live Cards</h2>
        </div>

        <div className="live-grid">

          {cards.map((c, i) => (
            <div className="live-card" key={i}>

              <div
                className="live-image"
                style={{ backgroundImage: `url(${c.image})` }}
              />

              <div className="live-overlay" />

              <div className="live-content">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <button className="live-btn">Explore</button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}