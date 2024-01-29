import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SineUp from "./pages/SineUp";
import Dashboard from "./pages/Dashboard"
import "./App.css"

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer/>
      <Router basename = "/personal-finance-tracker">
        <Routes>
          <Route path="/" element = {<SineUp/>}/>
          <Route path="/dashboard" element = {<Dashboard/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

//basename = "/personal-finance-tracker"