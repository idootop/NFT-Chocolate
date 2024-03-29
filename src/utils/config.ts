import iu from "@/assets/IUChocolate.json";
import rich from "@/assets/RICH.json";

export const kIsProd = process.env.PROD;
export const kChainId = 137;

export const kIUContractAddress = "0xCD5982A4D04F44D7987c87Dc30eD4856c1A64f14";
export const kRICHContractAddress =
  "0xE4D6858BcC2C90116CDC3cB7B75304eAe1627065";
export const kIUContractConfig = { abi: iu, address: kIUContractAddress };
export const kRICHContractConfig = { abi: rich, address: kRICHContractAddress };
export const kZeroAddress = "0x0000000000000000000000000000000000000000";
