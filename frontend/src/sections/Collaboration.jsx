export default function Collaboration() {
  return (
    <section className="collaboration">
      <div className="container">

        <div className="section-title">
          <span>WORKFLOW</span>
          <h2>Collaboration Process</h2>

          <p>
            From design to development, I create modern
            React interfaces with clean structure and responsive UI.
          </p>
        </div>

        <div className="collab-grid">

          {/* CARD 1 */}
          <div className="collab-card">
            <div className="collab-icon">🎨</div>

            <h3>Figma to Code</h3>

            <p>
              Convert Figma layouts into responsive
              React UI with animations and reusable components.
            </p>

            <button className="collab-btn">
              Explore
            </button>
          </div>

          {/* CARD 2 */}
          <div className="collab-card">
            <div className="collab-icon">💻</div>

            <h3>Code to Figma</h3>

            <p>
              Redesign existing projects into modern
              UI/UX systems with improved spacing and layout.
            </p>

            <button className="collab-btn">
              Explore
            </button>
          </div>

          {/* CARD 3 */}
          <div className="collab-card">
            <div className="collab-icon">🚀</div>

            <h3>Project Upgrade</h3>

            <p>
              Upgrade old projects into modern SaaS-style
              systems with responsive and scalable structure.
            </p>

            <button className="collab-btn">
              Explore
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}