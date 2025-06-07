import '@styles/components/FeaturedProjects.scss'
import { PROJECTS } from '@const'

export default function FeaturedProjects() {
    return (
        <section id='featured-projects'>
            <h2 className='section-title'>Featured Projects</h2>
            <div className='projects-grid'>
                {PROJECTS.slice(0, 3).map(project => (
                    <a
                        href={project.url}
                        key={project.title}
                        className='project-card'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img src={project.img} alt={project.title} className='project-image' />
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