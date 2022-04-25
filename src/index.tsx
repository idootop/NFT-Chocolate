import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import "./index.css";
import Welcome from "./welcome";

function App() {
  return Home();
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={Welcome()} />
          <Route path="/home" element={Home()} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
