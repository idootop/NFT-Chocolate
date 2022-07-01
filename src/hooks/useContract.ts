import {
  decodeTokenURI,
  kIsProd,
  kWorldContractConfig,
  kLandContractConfig,
} from "@/utils";
import { writeContract } from "@wagmi/core";
import { useContractEvent, useContractRead, useNetwork } from "wagmi";
import { useErrorToast } from ".";
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
  const land = useLand();
  const isWorld = land == null;
  return isWorld ? kWorldContractConfig : kLandContractConfig(land!);
}

export function useMint(nft: any) {
  const config = useContractConfig();
  const toast = useErrorToast();
  return () =>
    writeContract(config, "mint", {
      args: [nft.to, nft.desp, nft.image],
      ...noWatch,
    }).catch((e: any) => {
      if (e) {
        toast(
          e?.data?.message?.includes("revert")
            ? "Something went wrong!"
            : e?.data?.message
            ? e?.data?.message
            : e.toString()
        );
      }
      return 404;
    });
}

export function useUpdate(nft: any) {
  const config = useContractConfig();
  const toast = useErrorToast();
  return () =>
    writeContract(config, "update", {
      args: [nft.tokenID, nft.desp, nft.image],
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

export function useWorldMetadata(tokenID: number) {
  const { data, isLoading } = useContractRead(
    kWorldContractConfig,
    "tokenURI",
    {
      args: [tokenID],
      ...noWatch,
    }
  );
  const metadata = JSON.parse(decodeTokenURI(data as any) ?? "{}");
  return { metadata, isLoading };
}
