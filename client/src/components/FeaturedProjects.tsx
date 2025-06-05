import '@styles/components/FeaturedProjects.scss'
import { PROJECTS } from '@const'

export default function FeaturedProjects() {
    return (
        <section id='featured-projects'>
            <h2 className='section-title'>Featured Projects</h2>
            <div className='project-grid'>
                {PROJECTS.map(project => (
                    <a href={project.link} key={project.title} className='project-card'>
                        <img src={project.img} alt={project.title} className='project-image'/>
                        <div className='project-content'>
                            <h3 className='project-title'>{project.title}</h3>
                            <p className='project-description'>{project.description}</p>
                            <div className='tech-stack'>
                                {project.stack.map(tech => (
                                    <span className='tech' key={tech}>{tech}</span>
                                ))}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}