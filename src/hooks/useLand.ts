import { isEmpty } from "@/utils";
import { useSearchParams } from "react-router-dom";

export function useLand() {
  const land = useSearchParams()[0].get("land");
  return isEmpty(land ?? "") ? null : parseInt(land ?? "0");
}

export function useNFTName(full = true) {
  const land = useLand();
  return land == null
    ? full
      ? "Decentralized World"
      : "World"
    : full
    ? `Decentralized Land #${land}` //todo 从world中查询land的信息
    : "Land";
}

export function useNFTColor() {
  return useLand() == null ? "#4776ed" : "#7a4bdd";
}
