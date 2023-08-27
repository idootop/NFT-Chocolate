import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import Home from "./home";
import "./index.css";
import { kWagmiConfig } from "./utils";
import Welcome from "./welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={Welcome()} />
      <Route path="/index.html" element={Home()} />
    </Routes>
  );
}

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <WagmiConfig config={kWagmiConfig}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </WagmiConfig>
  </React.StrictMode>
);
