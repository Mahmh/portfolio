import '@styles/components/Header.scss'
import { signal } from '@preact/signals-react'
import { useSignals } from '@preact/signals-react/runtime'
import { Link, NavLink } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { useEffect, useRef } from 'react'

const menuOpen = signal(false)
const isDesktop = signal(window.innerWidth > 968)

const closeMenu = () => (menuOpen.value = false)

export default function Header() {
    useSignals()
    const backdropRef = useRef<HTMLDivElement>(null)

    // Track screen size
    useEffect(() => {
        const handleResize = () => {
            isDesktop.value = window.innerWidth > 968
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Adjust backdrop on menu open
    useEffect(() => {
        const header = document.getElementById('header')
        if (header && backdropRef.current) {
            const height = header.offsetHeight
            backdropRef.current.style.top = `${height}px`
        }
    }, [menuOpen.value])

    const navLinks = <>
        <NavLink to='/about' onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
        <NavLink to='/certificates' onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Certificates</NavLink>
        <NavLink to='/projects' onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
        <NavLink to='/contact' onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
        <NavLink to='/blog' onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
    </>

    return (
        <>
            <header id='header'>
                <NavLink to='/' onClick={closeMenu} className='logo'>Maher Mahmoud</NavLink>

                {!isDesktop.value && (
                    <button className='menu-toggle' onClick={() => (menuOpen.value = !menuOpen.value)}>
                        {menuOpen.value ? <HiX /> : <HiMenu />}
                    </button>
                )}

                {isDesktop.value && <>
                    <nav className='nav-links desktop-nav'>
                        {navLinks}
                    </nav>
                    <Link to='/contact' className='header-cta-button desktop-cta'>Book a Call</Link>
                </>}
            </header>

            {!isDesktop.value && <>
                <div
                    ref={backdropRef}
                    className={`menu-backdrop ${menuOpen.value ? 'visible' : ''}`}
                    onClick={closeMenu}
                />
                <nav className={`nav-links ${menuOpen.value ? 'open' : ''}`}>
                    {navLinks}
                    <Link to='/contact' onClick={closeMenu} className='header-cta-button mobile-cta'>Book a Call</Link>
                </nav>
            </>}
        </>
    )
}