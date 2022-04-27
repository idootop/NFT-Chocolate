import { ConnectButton, Tabs } from "@/components";
import { Center, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
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
      <Tabs tab={tab} setTab={setTab} />
      <Spacer />
      <ConnectButton />
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
        All NFT
      </Text>
    </Center>
  );
}

function MyNFT() {
  return (
    <Center h="100%">
      <Text p="0 15px 0 0" cursor="pointer" fontSize="16px" fontWeight="bold">
        My NFT
      </Text>
    </Center>
  );
}

function About() {
  return (
    <Center h="100%">
      <Text p="0 15px 0 0" cursor="pointer" fontSize="16px" fontWeight="bold">
        About
      </Text>
    </Center>
  );
}

export default Home;
