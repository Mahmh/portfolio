import '@styles/components/Skills.scss'
import { SKILLS } from '@const'

export default function Skills() {
    return (
        <section id='skills'>
            <h2 className='section-title'>Skills & Tools</h2>
            <div className='skill-grid'>
                {Object.entries(SKILLS).map(([category, tools]) => (
                    <div className='skill-category' key={category}>
                        <h3 className='category-title'>{category}</h3>
                        <ul className='tool-list'>
                            {tools.map(tool => (
                                <li className='tool' key={tool.name}>
                                    <SkillIcon icon={tool.icon} name={tool.name}/>
                                    <span className='tool-name'>{tool.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}

const SkillIcon = ({ icon, name }: { icon: { path: string, hex: string }, name: string }) => (
    <svg
        role='img'
        viewBox='0 0 24 24'
        fill={`#${icon.hex}`}
        width={24}
        height={24}
        xmlns='http://www.w3.org/2000/svg'
        className='tool-icon'
    >
        <title>{name}</title>
        <path d={icon.path} />
    </svg>
)