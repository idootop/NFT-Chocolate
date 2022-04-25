import { Box, Text, HStack, Spacer } from "@chakra-ui/react";
import { LButton } from "@/components";
import { useState } from "react";

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

function Home() {
  const [tab, setTab] = useState("IU Chocolate");
  return (
    <Box w="100%" h="100%">
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
    </Box>
  );
}

export default Home;
