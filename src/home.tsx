import ethLogo from "@/assets/eth.svg";
import polygonLogo from "@/assets/polygon.svg";
import { ConnectButton, Mint, NFT, OwnedNFT, Tabs } from "@/components";
import {
  Box,
  Center,
  HStack,
  Image,
  Kbd,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useBalanceOf, useNFT, useTotalSupply } from "./hooks";
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
  const { data: _totalSupply, isLoading } = useTotalSupply();
  const totalSupply = Number(_totalSupply ?? 0);
  return isLoading ? (
    <CenterSpinner />
  ) : (totalSupply as any) > 0 ? (
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
  const { address } = useAccount();
  const { data: _balance, isLoading } = useBalanceOf(
    address ?? kZeroAddress.replace("0x0", "0x1")
  );
  const balance = Number(_balance ?? 0);
  return isLoading ? (
    <CenterSpinner />
  ) : address && (balance as any) > 0 ? (
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

function ALink(p: { to: "iu" | "rich"; text: string }) {
  const nft = useNFT();
  return (
    <Kbd
      cursor="pointer"
      color={p.to === "iu" ? "#3173e0" : "#7b4add"}
      onClick={() => {
        if (nft === p.to) return;
        window.open("/index.html?nft=" + p.to)?.focus();
      }}
    >
      {p.text}
    </Kbd>
  );
}

function About() {
  return (
    <VStack
      h="100%"
      justify="space-evenly"
      p="142px 32px 32px 32px"
      textAlign="center"
    >
      <Image src={ethLogo} h="160px" />
      <Text p="16px" fontSize="16px" fontWeight="bold">
        You can mint one <ALink to="iu" text="IU Chocolate for FREE" /> or{" "}
        <ALink to="rich" text="1 RICH for 1 MATIC" />.
      </Text>
      <Box h="32px" />
      <Image src={polygonLogo} w="120px" />
      <Text p="16px" fontSize="16px" fontWeight="bold">
        Once you have an <ALink to="iu" text="IU" /> or{" "}
        <ALink to="rich" text="RICH" />, you can update their metadata at any
        time for free.
      </Text>
      <Text p="16px" fontSize="12px" color="#8c939a">
        *You only need to pay the GAS fee.
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
