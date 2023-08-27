import { isEmpty } from "./empty";
import { Web3Storage } from "web3.storage";

const web3StorageKey = process.env.WEB3_STORAGE_API_KEY!;

const client = new Web3Storage({ token: web3StorageKey });

const uploadFileCaches: Record<string, string | undefined> = {};
const getFileIdentity = (file: any) => {
  return JSON.stringify({
    name: file.name,
    lastModified: file.lastModified,
    size: file.size,
  });
};

export async function ipfsUpload(file: any) {
  const file_identity = getFileIdentity(file);
  if (uploadFileCaches[file_identity]) {
    return uploadFileCaches[file_identity];
  }
  try {
    const cid = await client.put([file], { wrapWithDirectory: false });
    const src = "ipfs://" + cid;
    const result = isEmpty(cid) ? undefined : src;
    uploadFileCaches[file_identity] = result;
    return result;
  } catch (error) {
    return undefined;
  }
}
