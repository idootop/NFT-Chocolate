import { create } from "ipfs-http-client";
import { nftSrc } from "./assets_url";
import { isEmpty } from "./empty";

const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
});

export async function ipfsUpload(file: any) {
  try {
    const added = await client.add(file);
    const src = nftSrc("ipfs://" + added.path);
    return isEmpty(src) ? undefined : src;
  } catch (error) {}
}
