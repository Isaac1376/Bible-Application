import { lazy, Suspense, useState } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { AuthProvider, useAuth } from './context/AuthContext'
import { BooksProvider } from './context/BooksContext'
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const Books = lazy(() => import('./pages/Books'))
const BookDetail = lazy(() => import('./pages/BookDetail'))
const Timeline = lazy(() => import('./pages/Timeline'))
const About = lazy(() => import('./pages/About'))
const Help = lazy(() => import('./pages/Help'))
const BibleApp = lazy(() => import('./pages/BibleApp'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-[#f0c66d]">
      Loading...
    </div>
  )
}

function AppRoutes() {
  const [language, setLanguage] = useState('en')
  const { isAdmin } = useAuth()

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout language={language} onLanguageChange={setLanguage} />}>
          <Route path="/" element={<Suspense fallback={<PageLoader />}><Home language={language} /></Suspense>} />
          <Route path="/books" element={<Suspense fallback={<PageLoader />}><Books language={language} /></Suspense>} />
          <Route path="/books/:id" element={<Suspense fallback={<PageLoader />}><BookDetail language={language} /></Suspense>} />
          <Route path="/timeline" element={<Suspense fallback={<PageLoader />}><Timeline language={language} /></Suspense>} />
          <Route path="/help" element={<Suspense fallback={<PageLoader />}><Help language={language} /></Suspense>} />
          <Route path="/bible-app" element={<Suspense fallback={<PageLoader />}><BibleApp language={language} /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<PageLoader />}><About language={language} /></Suspense>} />
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<PageLoader />}>
                {isAdmin ? <Navigate to="/admin" replace /> : <AdminLogin language={language} />}
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<PageLoader />}>
                {isAdmin ? <AdminDashboard language={language} /> : <Navigate to="/admin/login" replace />}
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  )
}

function App() {
  return (
    <AuthProvider>
      <BooksProvider>
        <AppRoutes />
      </BooksProvider>
    </AuthProvider>
  )
}

export default App
