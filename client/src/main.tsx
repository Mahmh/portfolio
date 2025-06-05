import '@styles/routes/main.scss'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Banner from './components/Banner'
import Stats from './components/Stats'
import Skills from './components/Skills'
import FeaturedProjects from './components/FeaturedProjects'
import Services from './components/Services'
import Footer from './components/Footer'

const LandingPage = () => <>
    <Header/>
    <Banner/>
    <Stats/>
    <Skills/>
    <FeaturedProjects/>
    <Services/>
    <Footer/>
</>

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <LandingPage/>
    </BrowserRouter>
)