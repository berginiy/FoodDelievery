// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PersonalInfo from "./pages/PersonalInfo";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order/:dishId" element={<OrderPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;