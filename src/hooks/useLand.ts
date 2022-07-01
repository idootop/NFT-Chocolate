import { isEmpty } from "@/utils";
import { useSearchParams } from "react-router-dom";

export function useLand() {
  const land = useSearchParams()[0].get("land");
  return isEmpty(land ?? "") ? null : land;
}

export function useLandID() {
  const id = useSearchParams()[0].get("id");
  return isEmpty(id ?? "") ? null : parseInt(id ?? "0");
}

export function useNFTName(full = true) {
  const id = useLandID();
  return id == null
    ? full
      ? "Decentralized World"
      : "World"
    : full
    ? `Decentralized Land #${id}`
    : "Land";
}

export function useNFTColor() {
  return useLand() == null ? "#4776ed" : "#7a4bdd";
}
