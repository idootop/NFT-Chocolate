import { isEmpty } from "./empty";
import { Web3Storage } from "web3.storage";

const web3StorageKey = process.env.WEB3_STORAGE_API_KEY!;

const client = new Web3Storage({ token: web3StorageKey });

export async function ipfsUpload(file: any) {
  try {
    const cid = await client.put([file], { wrapWithDirectory: false });
    const src = "ipfs://" + cid; // record ipfs address to smart contract
    return isEmpty(cid) ? undefined : src;
  } catch (error) {
    return undefined;
  }
}
