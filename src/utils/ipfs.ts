import { create } from "ipfs-http-client";
import { isEmpty } from "./empty";

const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
});

export async function ipfsUpload(file: any) {
  try {
    const added = await client.add(file);
    const src = "ipfs://" + added.path;
    return isEmpty(added.path) ? undefined : src;
  } catch (error) {}
}
