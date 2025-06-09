import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './routes/LandingPage'
import Projects from './routes/Projects'
import Certificates from './routes/Certificates'
import About from './routes/About'
import Contact from './routes/Contact'
import Blog from './routes/Blog'
import BlogPost from './routes/BlogPost'
import Layout from './Layout'
import NotFound from './routes/NotFound'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<LandingPage/>}/>
                <Route path='about' element={<About/>}/>
                <Route path='projects' element={<Projects/>}/>
                <Route path='certificates' element={<Certificates/>}/>
                <Route path='contact' element={<Contact/>}/>
                <Route path='blog' element={<Blog/>}/>
                <Route path='blog/:slug' element={<BlogPost/>}/>
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
)