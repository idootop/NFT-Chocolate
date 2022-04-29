import iu from "@/assets/IUChocolate.json";
import rich from "@/assets/IUChocolate.json";

export const kIsProd = process.env.PROD;
export const kChainId = 137;

export const kIUContractAddress = !kIsProd
  ? "0xCECCC5FA9212Cf3e492cf8e3cd143E3A63D7ce19"
  : "0xe98d9f7b48a5c6d31fbe8a5f343cd3e96357f6ea";
export const kRICHContractAddress = !kIsProd
  ? "0xcd1A67f12e13e89cfE9391C22DCBB8c2988a15b3"
  : "0xe98d9f7b48a5c6d31fbe8a5f343cd3e96357f6ea";
export const kIUContractConfig = {
  addressOrName: kIUContractAddress,
  contractInterface: iu,
};
export const kRICHContractConfig = {
  addressOrName: kRICHContractAddress,
  contractInterface: rich,
};
export const kOneETH = 10n ** 18n;
export const kZeroAddress = "0x0000000000000000000000000000000000000000";
