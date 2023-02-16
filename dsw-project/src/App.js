import Login from "./components/Login/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<NavigationBar content={<Home/>}/>}/>
          <Route path="/home" element={<NavigationBar content={<Home/>} />}/>
          <Route path="/login" element={<NavigationBar content={<Login/>} />}/>
          <Route path="/about" component={<NavigationBar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
