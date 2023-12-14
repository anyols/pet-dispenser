import Login from "./components/login";
import logo from "./logo.svg";
import { BrowserRouter } from "react-router-dom";
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-white">
        <Login />
      </div>
    </BrowserRouter>
  );
}

export default App;
