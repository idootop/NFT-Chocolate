import { kIUContractAddress, kRICHContractAddress } from "./config";

export function ensAvatar(address: string) {
  return "https://stamp.fyi/avatar/" + address;
}

export function nftSrc(src: string) {
  let newSrc = src.replace(
    "https://ipfs.infura.io/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/"
  );
  return newSrc.startsWith("ipfs://")
    ? "https://cloudflare-ipfs.com/ipfs/" + newSrc.substring(7)
    : newSrc;
}

export function openseaURL(tokenID: number, isRICH: boolean) {
  return `https://rarible.com/token/polygon/${
    isRICH ? kRICHContractAddress : kIUContractAddress
  }:${tokenID}`.toLowerCase();
}
