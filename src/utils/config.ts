import world from "@/assets/World.json";
import land from "@/assets/Land.json";

export const kIsProd = process.env.PROD;
export const kChainId = 137;

export const kWorldContractAddress = !kIsProd
  ? "0xcDE6Adc3B9E529269b4C73df9602672fF92529D7"
  : "0x9d779B3722e1378E37c472fad28E2ebDf2184ee8";
export const kWorldContractConfig = {
  addressOrName: kWorldContractAddress,
  contractInterface: world,
};
export const kLandContractConfig = (contractAddress: string) => ({
  addressOrName: contractAddress,
  contractInterface: land,
});
export const kOneETH = 10 ** 18;
export const kZeroAddress = "0x0000000000000000000000000000000000000000";
