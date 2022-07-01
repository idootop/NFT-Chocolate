import { ConnectButton, Mint, NFT, OwnedNFT, Tabs } from "@/components";
import {
  Box,
  Center,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import {
  useBalanceOf,
  useLandID,
  useNFTName,
  useTotalSupply,
  useWorldMetadata,
} from "./hooks";
import { clamp, kZeroAddress, nftSrc, range } from "./utils";

function Home() {
  const [tab, setTab] = useState("All");
  const header = (
    <HStack
      w="100%"
      h="80px"
      p="0 24px"
      bg="#fff"
      justify="center"
      align="center"
      position="fixed"
      zIndex={2}
    >
      <Tabs tab={tab} setTab={setTab} />
      <Spacer />
      <ConnectButton />
    </HStack>
  );
  return (
    <>
      <VStack w="100%" h="100%" bg="#f8f9fd">
        {header}
        <Box w="100%" display={tab === "All" ? undefined : "none"}>
          <AllNFT />
        </Box>
        <Box w="100%" display={tab === "My" ? undefined : "none"}>
          <MyNFT />
        </Box>
        <Box w="100%" display={tab === "About" ? undefined : "none"}>
          <About />
        </Box>
      </VStack>
      <Mint />
    </>
  );
}

function AllNFT() {
  const { data: totalSupply, isLoading } = useTotalSupply();
  return isLoading ? (
    <CenterSpinner />
  ) : (totalSupply as any) > 0 ? (
    <NFTGrid>
      {range(clamp(totalSupply as any, 0, 100)).map((idx) => (
        <Center key={idx}>
          <NFT tokenID={(totalSupply as any) - idx - 1} />
        </Center>
      ))}
      {range(clamp(5 - (totalSupply as any), 0, 5)).map((idx) => (
        <div key={idx} />
      ))}
    </NFTGrid>
  ) : (
    <CenterNothing />
  );
}

function MyNFT() {
  const { data: account } = useAccount();
  const { data: balance, isLoading } = useBalanceOf(
    account?.address ?? kZeroAddress.replace("0x0", "0x1")
  );
  return isLoading ? (
    <CenterSpinner />
  ) : account?.address && (balance as any) > 0 ? (
    <NFTGrid>
      {range(balance as any).map((idx) => (
        <Center key={idx}>
          <OwnedNFT index={idx} />
        </Center>
      ))}
      {range(clamp(5 - (balance as any), 0, 5)).map((idx) => (
        <div key={idx} />
      ))}
    </NFTGrid>
  ) : (
    <CenterNothing isMine />
  );
}

function About() {
  const landID = useLandID();
  const fullName = useNFTName();
  const { metadata: landMetadata, isLoading } = useWorldMetadata(landID ?? 0);
  return isLoading || !landMetadata.image ? (
    <CenterSpinner />
  ) : (
    <VStack
      h="100%"
      justify="space-evenly"
      p="142px 32px 32px 32px"
      textAlign="center"
    >
      <Image
        src={nftSrc(landMetadata.image)}
        h="160px"
        w="160px"
        borderRadius={"16px"}
        fit={"cover"}
      />
      <Text p="16px" fontSize="16px" fontWeight="bold">
        {fullName}
      </Text>
      <Text fontSize="32px" fontWeight="bold">
        {landMetadata.description}
      </Text>
    </VStack>
  );
}

function NFTGrid(p: { children: any }) {
  return (
    <SimpleGrid
      w="100%"
      p="112px 32px 32px 32px"
      minChildWidth="260px"
      gap="32px"
    >
      {p.children}
    </SimpleGrid>
  );
}

function CenterSpinner() {
  return (
    <Center h="calc(100vh - 100px)">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
}

function CenterNothing(p: { isMine?: boolean }) {
  return (
    <Center h="calc(100vh - 100px)">
      <Text p="0 15px 0 0" fontSize="16px" fontWeight="bold">
        Nothing...
      </Text>
    </Center>
  );
}

export default Home;
