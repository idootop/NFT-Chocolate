import {
  clamp,
  decodeTokenURI,
  kIUContractConfig,
  kRICHContractConfig,
  range
} from "@/utils";
import { readContract, writeContract } from "@wagmi/core";
import { useContractRead } from "wagmi";
import { useAsync } from "./useAsync";
import { useNFT } from "./useNFT";

const noWatch = {
  watch: false,
};

export function useContractConfig() {
  const isRICH = useNFT() === "rich";
  return isRICH ? kRICHContractConfig : kIUContractConfig;
}

export function useMint(nft: any) {
  const isRICH = useNFT() === "rich";
  const config = useContractConfig();
  return () =>
    writeContract(config, "mint", {
      args: !isRICH
        ? [nft.to, nft.desp, nft.image]
        : [nft.to, nft.name, nft.desp, nft.image],
      ...noWatch,
    });
}

export function useUpdate(nft: any) {
  const isRICH = useNFT() === "rich";
  const config = useContractConfig();
  return () =>
    writeContract(config, "update", {
      args: !isRICH
        ? [nft.tokenID, nft.desp, nft.image]
        : [nft.tokenID, nft.name, nft.desp, nft.image],
      ...noWatch,
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
