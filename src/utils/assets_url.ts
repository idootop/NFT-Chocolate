export function ensAvatar(address: string) {
  return "https://stamp.fyi/avatar/" + address;
}

const _newIPFSClient = "https://snapshot.mypinata.cloud/ipfs/";
const _oldIPFSClient = "https://ipfs.infura.io/ipfs/";
export function nftSrc(src: string) {
  return src.startsWith("ipfs://")
    ? _newIPFSClient + src.substring(7)
    : src.replace(_oldIPFSClient, _newIPFSClient);
}

export function openseaURL(tokenID: number, address: string) {
  return `https://rarible.com/token/polygon/${address}:${tokenID}`.toLowerCase();
}
