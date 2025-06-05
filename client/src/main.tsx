import '@styles/routes/main.scss'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './routes/LandingPage'
import Projects from './routes/Projects'
import Certificates from './routes/Certificates'
import Resume from './routes/Resume'
import Contact from './routes/Contact'

const Layout = () => <>
    <Header/>
    <main>
        <Outlet/>
    </main>
    <Footer/>
</>

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<LandingPage/>}/>
                <Route path='projects' element={<Projects/>}/>
                <Route path='certificates' element={<Certificates/>}/>
                <Route path='resume' element={<Resume/>}/>
                <Route path='contact' element={<Contact/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
)