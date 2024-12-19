import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import AboutUs from './pages/AboutUs';
import Programs from './pages/Programs';
import GetInvolved from './pages/GetInvolved';
import News from './pages/News';
import Advocacy from './pages/Advocacy';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ManageEvents from './pages/Admin/ManageEvents';
import ManageNews from './pages/Admin/ManageNews';
import ManagePrograms from './pages/Admin/ManagePrograms';

const theme = createTheme({
  palette: {
    background: {
      default: '#2C2C2C', // Charcoal grey
    },
    text: {
      primary: '#ffffff', // White text for better contrast
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/news" element={<News />} />
            <Route path="/advocacy" element={<Advocacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/events" element={<ManageEvents />} />
                    <Route path="/news" element={<ManageNews />} />
                    <Route path="/programs" element={<ManagePrograms />} />
                  </Routes>
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
