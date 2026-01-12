import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Header from './components/Header/header'
import Footer from './components/Footer/footer'

import Home from './pages/home'
import AboutMe from './pages/about-me'
import Contact from './pages/contact'

import Admin from './components/admin/adminDashboard/adminDashboard'

function App() {

  return (
    <BrowserRouter>
      <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="content-container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<AboutMe />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
    </BrowserRouter >
  )
}

export default App;
