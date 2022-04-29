import { create } from "ipfs-http-client";
import { nftSrc } from "./assets_url";

const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
});

export async function ipfsUpload(file: any) {
  try {
    const added = await client.add(file);
    return nftSrc('ipfs://'+added.path);
  } catch (error) {}
}
