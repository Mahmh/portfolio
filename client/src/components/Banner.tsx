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
                    <a href='#projects' className='cta-button'>See My Projects</a>
                </div>
                <div className='image'>
                    {/* <img src={avatar} alt='My Picture'/> */}
                </div>
            </div>
        </section>
    )
}