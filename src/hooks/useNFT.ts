import { useSearchParams } from "react-router-dom";

export function useNFT(): "iu" | "rich" {
  return useSearchParams()[0].get("nft") ?? ("iu" as any);
}
