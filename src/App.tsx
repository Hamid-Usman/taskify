import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/home';
import { Register } from './pages/register'
import { Index } from './pages/index';
function App() {

return (
    <Router>
        <Routes>
            <Route path='home' element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='' element={<Index />} />
        </Routes>
    </Router>
)
}

export default App
