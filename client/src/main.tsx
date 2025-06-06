import '@styles/routes/main.scss'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './routes/LandingPage'
import Projects from './routes/Projects'
import Certificates from './routes/Certificates'
import About from './routes/About'
import Contact from './routes/Contact'

const Layout = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [pathname])

    return <>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path='about' element={<About />} />
                <Route path='projects' element={<Projects />} />
                <Route path='certificates' element={<Certificates />} />
                <Route path='contact' element={<Contact />} />
            </Route>
        </Routes>
    </BrowserRouter>
)