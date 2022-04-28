import { base64, toUtf8String } from "ethers/lib/utils";

export function decodeTokenURI(jsonStr?: string) {
  if (!jsonStr) return undefined;
  const json = jsonStr.replace("data:application/json;base64,", "");
  return toUtf8String(base64.decode(json));
}
