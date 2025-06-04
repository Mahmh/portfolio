import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'

const App = () => {
  return (
    <></>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)