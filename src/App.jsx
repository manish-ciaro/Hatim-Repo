import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Todo from "./pages/Todo";
import AboutUs from "./pages/AboutUs";
// import Todo from "./pages/Todo";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path="/todo" element={ <ProtectedRoute><Todo /></ProtectedRoute>}/>
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
