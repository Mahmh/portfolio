import '@styles/routes/NotFound.scss'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return <>
        <title>Page Not Found | Maher Mahmoud</title>
        <section id='not-found'>
            <div className='container'>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you’re looking for doesn’t exist or has been moved.</p>
                <Link to='/' className='back-home'>← Back to Home</Link>
            </div>
        </section>
    </>
}