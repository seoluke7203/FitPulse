import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from "./LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Register from "./Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<LoginForm />} />
          <Route path='/register' element = {<Register />} />
          <Route path='/main' element = {<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
