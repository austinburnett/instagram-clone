import "./App.css";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";

function App() {
  return (
      <div>
      <Login />
      <Profile />
      <Home />
      </div>
  );
}

// App entrypoint
export default App;
