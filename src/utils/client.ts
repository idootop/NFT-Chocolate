import { providers } from "ethers";
import { chain, createClient } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { kChainId } from "./config";

const rpcUrl = chain.polygon.rpcUrls.alchemy;
const alchemyKey = process.env.ALCHEMY_POLYGON_API_KEY;

export const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains: [chain.polygon],
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      chains: [chain.polygon],
      options: {
        qrcode: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains: [chain.polygon],
      options: {
        appName: "IU Chocolate",
        jsonRpcUrl: `${rpcUrl}/${alchemyKey}`,
      },
    }),
  ],
  provider: new providers.AlchemyProvider(kChainId, alchemyKey),
  webSocketProvider: new providers.AlchemyWebSocketProvider(
    kChainId,
    alchemyKey
  ),
});
