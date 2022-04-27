import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "wagmi";
import Home from "./home";
import "./index.css";
import { client } from "./utils";
import Welcome from "./welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Welcome()} />
        <Route path="/home" element={Home()} />
      </Routes>
    </BrowserRouter>
  );
}

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider client={client}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
