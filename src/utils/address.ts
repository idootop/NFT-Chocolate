export function shortenAddress(str = "") {
  if (!str.startsWith("0x")) {
    return str;
  }
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}
