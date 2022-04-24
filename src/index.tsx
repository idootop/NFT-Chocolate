import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import Welcome from "./welcome";
import "./index.css";

function App() {
  return (
    <ChakraProvider>
      <Welcome />
    </ChakraProvider>
  );
}

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
