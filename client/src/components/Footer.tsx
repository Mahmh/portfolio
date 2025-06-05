import '@styles/components/Footer.scss'

export default function Footer() {
    return (
        <footer id='footer'>
            <div className='footer-content'>
                <p>Built with ❤️ using React, Vite, and TypeScript</p>
                <p>&copy; {new Date().getFullYear()} Maximus. All rights reserved.</p>
                <div className='footer-links'>
                    <a href='https://github.com/Mahmh' target='_blank' rel='noopener noreferrer'>GitHub</a>
                </div>
            </div>
        </footer>
    )
}