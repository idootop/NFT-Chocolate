import { clamp, decodeTokenURI, kContractConfig, range } from "@/utils";
import { readContract } from "@wagmi/core";
import { useContractRead } from "wagmi";
import { useAsync } from "./useAsync";

const noWatch = {
  watch: false,
};

export function useLast9NFT() {
  const { data: totalSupply } = useTotalSupply();
  const tokenURI = (tokenID: number) =>
    readContract(kContractConfig, "tokenURI", {
      args: [tokenID],
    });

  const query = () =>
    Promise.all(
      range(clamp(totalSupply as any, 0, 9), (_, index) =>
        tokenURI((totalSupply as any) - index)
      )
    );
  return useAsync(query);
}

export function useTotalSupply() {
  return useContractRead(kContractConfig, "totalSupply", {
    ...noWatch,
  });
}

export function useTokenURI(tokenID: number) {
  const { data, isLoading } = useContractRead(kContractConfig, "tokenURI", {
    args: [tokenID],
    ...noWatch,
  });
  return { uri: decodeTokenURI(data as any), isLoading };
}

export function useOwnerOf(tokenID: number) {
  const contractRead = useContractRead(kContractConfig, "ownerOf", {
    args: [tokenID],
    ...noWatch,
  });
  return contractRead.data as unknown as string;
}

export function useBalanceOf(owner: string) {
  return useContractRead(kContractConfig, "balanceOf", {
    args: owner,
    ...noWatch,
  });
}

export function useTokenOfOwnerByIndex(owner: string, index: number) {
  const contractRead = useContractRead(kContractConfig, "tokenOfOwnerByIndex", {
    args: [owner, index],
    ...noWatch,
  });
  return contractRead.data as unknown as number;
}
