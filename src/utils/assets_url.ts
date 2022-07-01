export function ensAvatar(address: string) {
  return "https://stamp.fyi/avatar/" + address;
}

export function nftSrc(src: string) {
  return src.startsWith("ipfs://")
    ? "https://ipfs.infura.io/ipfs/" + src.substring(7)
    : src;
}

export function openseaURL(tokenID: number, address: string) {
  return `https://rarible.com/token/polygon/${address}:${tokenID}`.toLowerCase();
}
