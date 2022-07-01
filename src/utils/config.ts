import world from "@/assets/World.json";
import land from "@/assets/Land.json";

export const kIsProd = process.env.PROD;
export const kChainId = 137;

export const kWorldContractAddress = !kIsProd
  ? "0xAbaB2BFe8Ab241bdBB4c03A5355CD142A5a15e85" //"0x547dd1f48aA2ae60c2f405BE2de0C25Fc631e82d"
  : "0xCD5982A4D04F44D7987c87Dc30eD4856c1A64f14";
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
