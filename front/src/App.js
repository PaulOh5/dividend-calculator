import { AppBar } from "@mui/material"

import Home from "./pages/main";

import './App.css';

function App() {
  return (
    <div className='main'>
      <AppBar position="static" sx={{padding: '0px 30px'}}>
        <h2 className='title'>Sample</h2>
      </AppBar>
      <div className='content'>
        <Home/>
      </div>
    </div>
  );
}

export default App;
