import '@styles/routes/About.scss'

export default function About() {
    return (
        <section id='about'>
            <h2 className='section-title'>About Me</h2>
            <div className='about-wrapper'>
                <div className='about-content'>
                    <p>
                        I'm Maher Mahmoud — a full-stack engineer and AI tinkerer passionate about building intelligent, elegant, and performant digital products. My journey into computer science has been largely self-driven, built through <b>rigorous self-study</b> and <b>reputable online platforms</b>. Starting with Python, I later branched into web development, databases, cybersecurity, blockchain, and AI — giving me a broad, interconnected view of the field.
                    </p>

                    <p>
                        Over the years, I've built projects spanning from <b>AI-powered web apps and semantic search engines to hospital-grade shift schedulers and NLP tools</b>. I’m particularly drawn to challenges at the intersection of ML and product design — where user experience meets algorithmic complexity.
                    </p>

                    <p>
                        I’ve been an engaged member of the Association for the Advancement of Artificial Intelligence (AAAI) since 2024. While I’ve only participated in one of their annual hackathons so far, I regularly follow their publications to stay current with emerging trends in the field.
                    </p>

                    <p>
                        Beyond the screen, I’ve joined national AI programs like the Qatar Innovation Program — where my team earned 1st place — and participated in school STEM clubs for robotics, drones, and electric vehicles. These experiences not only sharpened my skills but also <b>helped grow my network</b> and <b>open doors to meaningful opportunities</b>.
                    </p>

                    <p>
                        Whether you're a startup founder, recruiter, client, or fellow builder — I'm always open to collaborating on bold ideas that deserve to exist.
                    </p>
                </div>

                <div className='image' style={{ minWidth: 400, minHeight: 400, borderRadius: 20, background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#888', fontWeight: 700 }}>
                    MM
                </div>
            </div>
        </section>
    )
}