import "@styles/components/Banner.scss";

export default function Banner() {
  return (
    <section id="banner">
      <div className="banner-content">
        <div className="text">
          <h1>Hi, I'm Maher Mahmoud</h1>
          <p>
            I'm a full-stack AI developer who builds fast, intelligent, and
            beautiful web apps. From solo builds to team-driven sprints, I
            deliver scalable solutions that solve real-world problems.
          </p>
          <a href="#featured-projects" className="cta-button">
            See My Projects
          </a>
        </div>
        <img
          className="profile-img"
          rel="preload"
          fetchPriority="high"
          width={568}
          height={500}
          alt="My Profile Picture"
          src="/img/profile.webp"
        />
      </div>
    </section>
  );
}
