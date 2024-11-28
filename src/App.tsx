import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/home'
import { Register } from './pages/register'
import { Main } from './pages/main';
function App() {

return (
    <Router>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='main' element={<Main />} />

        </Routes>

    </Router>
)
}

export default App
