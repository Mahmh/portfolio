import '@styles/components/Footer.scss'
import { CONTACT_EMAIL } from '@const'

export default function Footer() {
    return (
        <footer id='footer'>
            <div className='footer-content'>
                <p>Built with ❤️ using React, Vite, and TypeScript</p>
                <p>&copy; {new Date().getFullYear()} Maher Mahmoud. All rights reserved.</p>
                <div className='footer-links'>
                    <a href='https://github.com/Mahmh' target='_blank' rel='noopener noreferrer'>GitHub</a>
                    <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
                </div>
            </div>
        </footer>
    )
}