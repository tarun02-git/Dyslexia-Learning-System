import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import ContentDetail from './pages/ContentDetail';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ContentProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-50">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/library" element={<Library />} />
                <Route path="/content/:id" element={<ContentDetail />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ContentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;