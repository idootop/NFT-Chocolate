import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import "./index.css";
import Welcome from "./welcome";

// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
// const infuraId = process.env.INFURA_ID;

// // Chains for connectors to support
// const chains = defaultChains;

// // Set up connectors
// const connectors = ({ chainId }) => {
//   const rpcUrl =
//     chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
//     chain.mainnet.rpcUrls[0];
//   return [
//     new InjectedConnector({
//       chains,
//       options: { shimDisconnect: true },
//     }),
//     new WalletConnectConnector({
//       options: {
//         infuraId,
//         qrcode: true,
//       },
//     }),
//     new CoinbaseWalletConnector({
//       options: {
//         appName: "My wagmi app",
//         jsonRpcUrl: `${rpcUrl}/${infuraId}`,
//       },
//     }),
//   ];
// };

// const App = () => (
//   <Provider autoConnect connectors={connectors}>
//     <Example />
//   </Provider>
// );

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
