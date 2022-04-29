import ethLogo from "@/assets/eth.svg";
import polygonLogo from "@/assets/polygon.svg";
import { ConnectButton, NFT, OwnedNFT, Tabs } from "@/components";
import {
  Box,
  Center,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useBalanceOf, useTotalSupply } from "./hooks";
import { clamp, kZeroAddress, range } from "./utils";

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
  );
}

function AllNFT() {
  const { data: totalSupply, isLoading } = useTotalSupply();
  return isLoading ? (
    <CenterSpinner />
  ) : totalSupply ? (
    <NFTGrid>
      {range(clamp(totalSupply as any, 0, 10)).map((idx) => (
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
  ) : account?.address && balance ? (
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
  return (
    <Center h="calc(100vh - 100px)" p="142px 32px 32px 32px" textAlign="center">
      <VStack h="100%" justify="space-evenly">
        <Image src={ethLogo} h="160px" />
        <Text p="16px" fontSize="16px" fontWeight="bold">
          You can mint one{" "}
          {
            <Link href="/home?nft=iu" color="#3173e0">
              IU Chocolate
            </Link>
          }{" "}
          for FREE or{" "}
          {
            <Link href="/home?nft=rich" color="#7b4add">
              1 RICH for 1 MATIC
            </Link>
          }
          .
        </Text>
        <Image src={polygonLogo} w="120px" />
        <Text p="16px" fontSize="16px" fontWeight="bold">
          Once you have an{" "}
          {
            <Link href="/home?nft=iu" color="#3173e0">
              IU
            </Link>
          }{" "}
          or{" "}
          {
            <Link href="/home?nft=rich" color="#7b4add">
              RICH
            </Link>
          }
          , you can update their metadata at any time for free.
        </Text>
        <Text p="16px" fontSize="12px" color="#8c939a">
          *You only need to pay the GAS fee.
        </Text>
      </VStack>
    </Center>
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
