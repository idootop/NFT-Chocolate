import {
  clamp,
  decodeTokenURI,
  kIsProd,
  kIUContractConfig,
  kOneETH,
  kRICHContractConfig,
  range,
} from "@/utils";
import { readContract, writeContract } from "@wagmi/core";
import { useContractEvent, useContractRead, useNetwork } from "wagmi";
import { useErrorToast } from ".";
import { useAsync } from "./useAsync";
import { useLand } from "./useLand";

const noWatch = {
  watch: false,
};

export const useSwitchNetwork = () => {
  const id = kIsProd ? 137 : 1337;
  const { activeChain, switchNetworkAsync } = useNetwork();
  return async (chainId?: any) => {
    if (id === activeChain?.id || chainId === id) return true;
    const chain = await switchNetworkAsync?.(id).catch(() => undefined);
    return chain?.id === id;
  };
};

export function useEventListener(event: string, listener: (e: any) => any) {
  return useContractEvent(useContractConfig(), event, listener);
}

export function useContractConfig() {
  const isWorld = useLand() == null;
  return isWorld ? kRICHContractConfig : kIUContractConfig;
}

export function useMint(nft: any) {
  const isWorld = useLand() == null;
  const config = useContractConfig();
  const toast = useErrorToast();
  return () =>
    writeContract(config, "mint", {
      args: !isWorld
        ? [nft.to, nft.desp, nft.image]
        : [nft.to, nft.name, nft.desp, nft.image],
      overrides: {
        value: isWorld ? kOneETH : 0,
      },
      ...noWatch,
    }).catch((e: any) => {
      if (e) {
        toast(
          e?.data?.message?.includes("revert")
            ? isWorld
              ? "At least 1 MATIC needs to be paid to mint 1 RICH."
              : "Each person can only have 1 IU Chocolate."
            : e?.data?.message
            ? e?.data?.message
            : e.toString()
        );
      }
      return 404;
    });
}

export function useUpdate(nft: any) {
  const isWorld = useLand() == null;
  const config = useContractConfig();
  const toast = useErrorToast();
  return () =>
    writeContract(config, "update", {
      args: !isWorld
        ? [nft.tokenID, nft.desp, nft.image]
        : [nft.tokenID, nft.name, nft.desp, nft.image],
      ...noWatch,
    }).catch((e: any) => {
      if (e) {
        toast(
          e?.data?.message?.includes("revert")
            ? "You're not the owner."
            : e?.data?.message
            ? e?.data?.message
            : e.toString()
        );
      }
      return 404;
    });
}

export function useLast10NFT() {
  const { data: totalSupply } = useTotalSupply();
  const config = useContractConfig();
  const tokenURI = (tokenID: number) =>
    readContract(config, "tokenURI", {
      args: [tokenID],
    });

  const query = () =>
    Promise.all(
      range(clamp(totalSupply as any, 0, 9), (index) =>
        tokenURI((totalSupply as any) - index - 1)
      )
    );
  return useAsync(query);
}

export function useTotalSupply() {
  const config = useContractConfig();
  return useContractRead(config, "totalSupply", {
    ...noWatch,
  });
}

export function useTokenURI(tokenID: number) {
  const config = useContractConfig();
  const { data, isLoading } = useContractRead(config, "tokenURI", {
    args: [tokenID],
    ...noWatch,
  });
  return { uri: decodeTokenURI(data as any), isLoading };
}

export function useOwnerOf(tokenID: number) {
  const config = useContractConfig();
  const contractRead = useContractRead(config, "ownerOf", {
    args: [tokenID],
    ...noWatch,
  });
  return contractRead.data as unknown as string;
}

export function useBalanceOf(owner: string) {
  const config = useContractConfig();
  return useContractRead(config, "balanceOf", {
    args: owner,
    ...noWatch,
  });
}

export function useTokenOfOwnerByIndex(owner: string, index: number) {
  const config = useContractConfig();
  const contractRead = useContractRead(config, "tokenOfOwnerByIndex", {
    args: [owner, index],
    ...noWatch,
  });
  return contractRead.data as unknown as number;
}
