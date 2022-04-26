import { LButton } from "@/components";
import { Box, Center, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

function Home() {
  const [tab, setTab] = useState("IU Chocolate");
  const header = (
    <HStack
      w="100%"
      h="80px"
      p="0 24px"
      bg="#f5f5f5"
      justify="center"
      align="center"
    >
      <Tab active={tab} setTab={setTab}>
        IU Chocolate
      </Tab>
      <Tab active={tab} setTab={setTab}>
        My Chocolate
      </Tab>
      <Tab active={tab} setTab={setTab}>
        About
      </Tab>
      <Spacer />
      <LButton color="#fff" bg="#3478f6">
        Connect Wallet
      </LButton>
    </HStack>
  );
  const body =
    tab === "IU Chocolate"
      ? AllNFT()
      : tab === "My Chocolate"
      ? MyNFT()
      : About();
  return (
    <VStack w="100%" h="100%">
      {header}
      {body}
    </VStack>
  );
}

function AllNFT() {
  return (
    <Center h="100%">
      <Text p="0 15px 0 0" cursor="pointer" fontSize="16px" fontWeight="bold">
        All NFT {process.env.INFURA_API_KEY} 123
      </Text>
    </Center>
  );
}

function MyNFT() {
  return (
    <Center>
      <Text p="0 15px 0 0" cursor="pointer" fontSize="16px" fontWeight="bold">
        MyNFT
      </Text>
    </Center>
  );
}

function About() {
  return (
    <Center>
      <Text p="0 15px 0 0" cursor="pointer" fontSize="16px" fontWeight="bold">
        About
      </Text>
    </Center>
  );
}

function Tab(p: {
  active: string;
  setTab: (tab: string) => void;
  children: string;
}) {
  return (
    <Text
      p="0 15px 0 0"
      cursor="pointer"
      fontSize="16px"
      fontWeight="bold"
      color={p.active === p.children ? "black" : "#6e6d78"}
      onClick={() => {
        p.setTab(p.children);
      }}
    >
      {p.children}
    </Text>
  );
}

export default Home;
