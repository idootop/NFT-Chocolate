import { providers } from "ethers";
import { chain, createClient } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { kChainId, kIsProd } from "./config";

const rpcUrl = chain.polygon.rpcUrls.alchemy;
const alchemyKey = process.env.ALCHEMY_POLYGON_API_KEY;

export const client: any = kIsProd
  ? createClient({
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
    })
  : createClient({
      autoConnect: true,
      connectors: [
        new InjectedConnector({
          chains: [
            {
              id: 1337,
              name: "ganache",
              rpcUrls: { default: "HTTP://127.0.0.1:7545" },
            },
          ],
          options: { shimDisconnect: true },
        }),
      ],
      provider: new providers.JsonRpcProvider("HTTP://127.0.0.1:7545", {
        chainId: 1337,
        name: "ganache",
      }),
    });
