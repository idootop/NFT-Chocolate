import { kIUContractAddress, kRICHContractAddress } from "./config";

export function ensAvatar(address: string) {
  return "https://stamp.fyi/avatar/" + address;
}

const _newIPFSClient = "https://cloudflare-ipfs.com/ipfs/";
const _oldIPFSClient = "https://ipfs.infura.io/ipfs/";
export function nftSrc(src: string) {
  return src.startsWith("ipfs://")
    ? _newIPFSClient + src.substring(7)
    : src.replace(_oldIPFSClient, _newIPFSClient);
}

export function openseaURL(tokenID: number, isRICH: boolean) {
  return `https://rarible.com/token/polygon/${
    isRICH ? kRICHContractAddress : kIUContractAddress
  }:${tokenID}`.toLowerCase();
}
