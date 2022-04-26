import { chain } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// API key for Ethereum node
const infuraId = process.env.INFURA_API_KEY;

// Set up connectors
export const connectors = () => {
  const rpcUrl = chain.polygonMainnet.rpcUrls[0];
  return [
    new InjectedConnector({
      chains: [chain.polygonMainnet],
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      chains: [chain.polygonMainnet],
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains: [chain.polygonMainnet],
      options: {
        appName: "IU Chocolate",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};
