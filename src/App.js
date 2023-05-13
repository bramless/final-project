import Register from './components/Register';
import LoginPage from './components/Login';
import Logout from './components/Logout';
import GetAllUser from './components/GetAllUser';
import Content from "./components/Content";
import Navigationbar from './components/Navigationbar';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/All-Users" element={<GetAllUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App
