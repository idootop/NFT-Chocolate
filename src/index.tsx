import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./welcome";
import "./index.css";
import Home from "./home";

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
