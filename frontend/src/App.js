import logo from "./logo.svg";
import "./App.css";
import { Routes } from "./routes/AppRoute";
import Navbar from "./components/layouts/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
