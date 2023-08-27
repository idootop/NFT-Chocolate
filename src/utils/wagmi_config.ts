import { polygon, mainnet } from "viem/chains";
import { createConfig, configureChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const alchemyKey = process.env.ALCHEMY_POLYGON_API_KEY;

const { publicClient, webSocketPublicClient } = configureChains(
  [polygon, mainnet],
  [publicProvider(), alchemyProvider({ apiKey: alchemyKey! })]
);

export const kWagmiConfig: any = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      chains: [polygon],
    }),
    new WalletConnectConnector({
      chains: [polygon],
      options: {
        projectId: process.env.WC_PROJECT_ID as any,
      },
    }),
  ],
});
