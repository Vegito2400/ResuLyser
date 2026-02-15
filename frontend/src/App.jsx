// import { useState } from 'react'
import "./App.css";
import Registration from "./registration";
import Signin from "./signin";
import Navbar from './navbar';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import FileUpload from "./upload";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <FileUpload />
      <Routes>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
