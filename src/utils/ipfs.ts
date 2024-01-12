import { isEmpty } from "./empty";

const pinataJWT = process.env.PINATA_JWT!;

const pinFileToIPFS = async (file: any) => {
  const formData = new FormData();
  formData.append("pinataMetadata", JSON.stringify({ name: file.name }));
  formData.append("file", file);
  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: { Authorization: "Bearer " + pinataJWT },
      body: formData,
    });
    const data = (await res.json()).data;
    return data?.IpfsHash;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

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
    const cid = await pinFileToIPFS(file);
    const src = "ipfs://" + cid;
    const result = isEmpty(cid) ? undefined : src;
    uploadFileCaches[file_identity] = result;
    return result;
  } catch (error) {
    return undefined;
  }
}
