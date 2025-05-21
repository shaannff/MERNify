import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Home from "./components/Home";
import Regester from "./components/Regester";
import Login from "./components/Login";
import Jokes from "./components/Jokes";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>

    <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/regester" element={<Regester/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/jokes" element={<PrivateRoute><Jokes/></PrivateRoute>}/>


    </Routes>

    </Router>
    </>
   
  );
}
 export default App