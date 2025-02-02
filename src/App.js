import React from 'react';
import Navbar from "./components/Navbar";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard"; // Import FacultyDashboard
import Login from "./pages/Login"; // Import Login
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="p-4 bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/admin" element={
              <ProtectedRoute allowedEmail="jyothi222040@sahrdaya.ac.in">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/faculty" element={<FacultyDashboard />} /> {/* Add route for FacultyDashboard */}
            <Route path="/login" element={<Login />} /> {/* Add route for Login */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
