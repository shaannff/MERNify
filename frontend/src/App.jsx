import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Home from "./components/Home";
import Regester from "./components/Regester";
import Login from "./components/Login";


const App = () => {
  return (
    <>

    <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/regester" element={<Regester/>}/>
      <Route path="/login" element={<Login/>}/>

    </Routes>

    </Router>
    </>
    // <div className="bg-green-200 s text-blue-800 p-4 text-xl font-bold">
    //   ✅ Tailwind is now working!
    // </div>
  );
}
 export default App