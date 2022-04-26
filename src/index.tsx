import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "wagmi";
import Home from "./home";
import "./index.css";
import { connectors } from "./utils";
import Welcome from "./welcome";

function App() {
  return (
    <Provider autoConnect connectors={connectors}>
      {Home()}
    </Provider>
  );
  return (
    <Provider autoConnect connectors={connectors}>
      <BrowserRouter>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={Welcome()} />
            <Route path="/home" element={Home()} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  );
}

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
