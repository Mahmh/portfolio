import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <header id='header'>
            <NavLink to='/' className='logo'>
                Maher Mahmoud
            </NavLink>

            <nav className='nav-links'>
                <NavLink to='/projects' className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
                <NavLink to='/blog' className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
                <NavLink to='/certificates' className={({ isActive }) => isActive ? 'active' : ''}>Certificates</NavLink>
                <NavLink to='/resume' className={({ isActive }) => isActive ? 'active' : ''}>Resume</NavLink>
                <NavLink to='/contact' className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
            </nav>

            <a href='#contact' className='cta-button'>Book a Call</a>
        </header>
    )
}