import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/home';
import { Register } from './pages/register'
import { Index } from './pages/index';
import React from 'react';
import { CustomKanban } from './pages/board';
import { Profile } from './pages/profile';
const App: React.FC = () => {

return (
    <Router>
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/board' element={<CustomKanban />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    </Router>
)
}

export default App
