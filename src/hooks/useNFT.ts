import { useSearchParams } from "react-router-dom";

export function useNFT(): "iu" | "rich" {
  return useSearchParams()[0].get("nft") ?? ("iu" as any);
}

export function useNFTName(full = true) {
  const nft = useNFT();
  return nft === "iu"
    ? full
      ? "IU Chocolate"
      : "IU"
    : full
    ? "Pretend I'M RICH"
    : "RICH";
}

export function useNFTColor() {
  return useNFT() === "iu" ? "#4776ed" : "#7a4bdd";
}
