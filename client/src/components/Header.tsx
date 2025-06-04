import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <header>
            <NavLink to='/' className='logo'>
                Maher Mahmoud
            </NavLink>
            <nav>
                <NavLink to='/projects' className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
                <NavLink to='/blog' className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
                <NavLink to='/certificates' className={({ isActive }) => isActive ? 'active' : ''}>Certificates</NavLink>
                <NavLink to='/resume' className={({ isActive }) => isActive ? 'active' : ''}>Resume</NavLink>
                <NavLink to='/contact' className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
            </nav>
        </header>
    )
}