import NavBar from "./components/NavBar"
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import React, { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
const App = () => {
  const [currUser, serCurrUser] = useState();
  return (
      <BrowserRouter>
      
      <NavBar />
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

