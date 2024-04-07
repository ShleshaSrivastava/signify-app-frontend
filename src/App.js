import './App.css';
import Homepage from './components/Homepage';
import Loginpage from './components/Loginpage';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Homepage/> } />
        <Route path="login" element={ <Loginpage/> } />
      </Routes>
    </div>
  );
}

export default App;
