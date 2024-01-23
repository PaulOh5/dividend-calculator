import { Routes, Route } from "react-router-dom";

import { AppBar } from "@mui/material"

import Home from "./pages/main";
import Result from "./pages/result";

import './App.css';

function App() {
  return (
    <div className='main'>
      <AppBar position="static" sx={{padding: '0px 30px'}}>
        <h2 className='title'>Sample</h2>
      </AppBar>
      <div className='content'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/result" element={<Result/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
