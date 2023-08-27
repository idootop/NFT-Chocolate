import { bytesToString } from "viem";

export function decodeTokenURI(jsonStr?: string) {
  if (!jsonStr) return undefined;
  const json = jsonStr.replace("data:application/json;base64,", "");
  return bytesToString(Buffer.from(json, "base64"));
}
