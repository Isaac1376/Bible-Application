import { useState } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Books from './pages/Books'
import BookDetail from './pages/BookDetail'
import Timeline from './pages/Timeline'
import About from './pages/About'
import Help from './pages/Help'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function App() {
  const [language, setLanguage] = useState('en')
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout language={language} onLanguageChange={setLanguage} />}>
          <Route path="/" element={<Home language={language} />} />
          <Route path="/books" element={<Books language={language} />} />
          <Route path="/books/:id" element={<BookDetail language={language} />} />
          <Route path="/timeline" element={<Timeline language={language} />} />
          <Route path="/help" element={<Help language={language} />} />
          <Route path="/about" element={<About language={language} />} />
          <Route path="/admin/login" element={isAdmin ? <Navigate to="/admin" replace /> : <AdminLogin language={language} onAdminLogin={setIsAdmin} />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard language={language} /> : <Navigate to="/admin/login" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
