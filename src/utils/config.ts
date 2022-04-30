import iu from "@/assets/IUChocolate.json";
import rich from "@/assets/RICH.json";

export const kIsProd = process.env.PROD;
console.log("kIsProd", kIsProd);
export const kChainId = 137;

export const kIUContractAddress = !kIsProd
  ? "0xCECCC5FA9212Cf3e492cf8e3cd143E3A63D7ce19"
  : "0xCD5982A4D04F44D7987c87Dc30eD4856c1A64f14";
export const kRICHContractAddress = !kIsProd
  ? "0xaA7efe504FeeD06A3E583328B64b0055876Ec93b"
  : "0xE4D6858BcC2C90116CDC3cB7B75304eAe1627065";
export const kIUContractConfig = {
  addressOrName: kIUContractAddress,
  contractInterface: iu,
};
export const kRICHContractConfig = {
  addressOrName: kRICHContractAddress,
  contractInterface: rich,
};
export const kOneETH = 10 ** 18;
export const kZeroAddress = "0x0000000000000000000000000000000000000000";
