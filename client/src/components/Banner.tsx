import '@styles/components/Banner.scss'

export default function Banner() {
    return (
        <section id='banner'>
            <div className='banner-content'>
                <div className='text'>
                    <h1>Hi, I’m Maher Mahmoud</h1>
                    <p>
                        I’m a full-stack AI developer who builds fast, intelligent, and beautiful web apps.
                        From solo builds to team-driven sprints, I deliver scalable solutions that solve real-world problems.
                    </p>
                    <a href='#featured-projects' className='cta-button'>See My Projects</a>
                </div>
                <div className='image' style={{ width: 100, height: 400, borderRadius: 20, background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#888', fontWeight: 700 }}>
                    MM
                </div>
            </div>
        </section>
    )
}