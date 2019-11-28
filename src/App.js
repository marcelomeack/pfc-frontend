import React from "react";
import "./App.css";
import logo from "./assets/Robo.svg";
import Routes from "./routes";
import "./pages/Cliente/styles.css";

function App() {
  return (
    <>
      <div className="teste">
        <div className="container">
          <img src={logo} alt="GundamStore" />
          <div className="content">
            <Routes />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
