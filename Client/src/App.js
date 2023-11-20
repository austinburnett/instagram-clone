import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login.js";
import Home from "./pages/home/Home.js";
import Profile from "./pages/profile/Profile.js";
import Register from "./pages/register/Register.js";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

// App entrypoint
export default App;
