import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";

// pages & components
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/home" element={user ? <Home /> : <Navigate to="/" /> } />
            <Route path="/" element={!user ? <Landing /> : <Navigate to="/home" /> } />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" /> } />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
