import {
  clamp,
  decodeTokenURI,
  kChainId,
  kIUContractConfig,
  kRICHContractConfig,
  range,
} from "@/utils";
import { readContract, writeContract } from "@wagmi/core";
import {
  useContractEvent,
  useContractRead as _useContractRead,
  useNetwork,
  useSwitchNetwork as _useSwitchNetwork,
} from "wagmi";
import { useErrorToast } from ".";
import { useAsync } from "./useAsync";
import { useNFT } from "./useNFT";
import { parseEther } from "viem";

export const useSwitchNetwork = () => {
  const id = 137;
  const { chain } = useNetwork();
  const { switchNetworkAsync } = _useSwitchNetwork();
  return async (chainId?: any) => {
    if (chain?.id === id || chainId === id) {
      return true;
    }
    const new_chain = await switchNetworkAsync?.(id).catch(() => undefined);
    return new_chain?.id === id;
  };
};

export function useContractConfig() {
  const isRICH = useNFT() === "rich";
  return isRICH ? kRICHContractConfig : (kIUContractConfig as any);
}

function useWriteContract() {
  const { address, abi } = useContractConfig();
  return (p: { functionName: any; args: any; value?: any }) => {
    const { functionName, args, value } = p;
    return writeContract({
      chainId: kChainId,
      address,
      abi,
      functionName,
      args,
      value,
    });
  };
}

function useReadContract() {
  const { address, abi } = useContractConfig();
  return (p: { functionName: any; args?: any }) => {
    const { functionName, args } = p;
    return readContract({
      chainId: kChainId,
      address,
      abi,
      functionName,
      args,
    });
  };
}

function useContractRead(p: { functionName: any; args?: any }) {
  const { functionName, args } = p;
  const { address, abi } = useContractConfig();
  return _useContractRead({
    chainId: kChainId,
    address,
    abi,
    functionName,
    args,
  });
}

export function useEventListener(event: string, listener: (e: any) => any) {
  const { address, abi } = useContractConfig();
  return useContractEvent({ address, abi, eventName: event, listener });
}

export function useMint(nft: any) {
  const isRICH = useNFT() === "rich";
  const toast = useErrorToast();
  const _writeContract = useWriteContract();
  return () =>
    _writeContract({
      functionName: "mint",
      args: !isRICH
        ? [nft.to, nft.desp, nft.image]
        : [nft.to, nft.name, nft.desp, nft.image],
      value: parseEther(isRICH ? "1" : "0"),
    }).catch((e: any) => {
      if (e) {
        toast(
          e.data?.message.includes("revert")
            ? isRICH
              ? "At least 1 MATIC needs to be paid to mint 1 RICH."
              : "Each person can only have 1 IU Chocolate."
            : e.message.includes("User denied transaction signature")
            ? "User denied transaction signature"
            : e.message
            ? e.message
            : e.data?.message
            ? e.data.message
            : e.toString()
        );
      }
      return 404;
    });
}

export function useUpdate(nft: any) {
  const isRICH = useNFT() === "rich";
  const toast = useErrorToast();
  const _writeContract = useWriteContract();
  return () =>
    _writeContract({
      functionName: "update",
      args: !isRICH
        ? [nft.tokenID, nft.desp, nft.image]
        : [nft.tokenID, nft.name, nft.desp, nft.image],
    }).catch((e: any) => {
      if (e) {
        toast(
          e.data?.message.includes("revert")
            ? "You're not the owner."
            : e.message
            ? e.message
            : e.data?.message
            ? e.data?.message
            : e.toString()
        );
      }
      return 404;
    });
}

export function useLast10NFT() {
  const { data: _totalSupply } = useTotalSupply();
  const totalSupply = Number(_totalSupply ?? 0);
  const _readContract = useReadContract();
  const tokenURI = (tokenID: number) =>
    _readContract({ functionName: "tokenURI", args: [tokenID] });
  const query = () =>
    Promise.all(
      range(clamp(totalSupply as any, 0, 9), (index) =>
        tokenURI((totalSupply as any) - index - 1)
      )
    );
  return useAsync(query);
}

export function useTotalSupply() {
  return useContractRead({
    functionName: "totalSupply",
  });
}

export function useTokenURI(tokenID: number) {
  const { data, isLoading } = useContractRead({
    functionName: "tokenURI",
    args: [tokenID],
  });
  return { uri: decodeTokenURI(data as any), isLoading };
}

export function useOwnerOf(tokenID: number) {
  const contractRead = useContractRead({
    functionName: "ownerOf",
    args: [tokenID],
  });
  return contractRead.data as unknown as string;
}

export function useBalanceOf(owner: string) {
  return useContractRead({
    functionName: "balanceOf",
    args: [owner],
  });
}

export function useTokenOfOwnerByIndex(owner: string, index: number) {
  const contractRead = useContractRead({
    functionName: "tokenOfOwnerByIndex",
    args: [owner, index],
  });
  return contractRead.data as unknown as number;
}
