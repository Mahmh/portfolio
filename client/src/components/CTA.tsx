import '@styles/components/CTA.scss'
import { Link } from 'react-router-dom'

export default function CTA() {
    return (
        <section id='cta-section'>
            <div className='cta-content'>
                <h2>Let's build something amazing together.</h2>
                <p>I'm always open to new opportunities, collaborations, or just chatting about code, design, or life.</p>
                <Link to='/contact' className='cta-button'>Say Hello</Link>
            </div>
        </section>
    );
}