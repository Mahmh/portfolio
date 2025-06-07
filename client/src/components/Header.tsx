import '@styles/components/Header.scss'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <header id='header'>
            <NavLink to='/' className='logo'>Maher Mahmoud</NavLink>

            <nav className='nav-links'>
                <NavLink to='/about' className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
                <NavLink to='/certificates' className={({ isActive }) => isActive ? 'active' : ''}>Certificates</NavLink>
                <NavLink to='/projects' className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
                <NavLink to='/contact' className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
                <NavLink to='/blog' className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
            </nav>

            <Link to='/contact' className='cta-button'>Book a Call</Link>
        </header>
    )
}