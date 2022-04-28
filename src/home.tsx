import { ConnectButton, Tabs, ZStack, Position } from "@/components";
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
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
  useErrorToast,
  useOwnerOf,
  useTokenOfOwnerByIndex,
  useTokenURI,
  useTotalSupply,
} from "./hooks";
import { kZeroAddress, range, shortenAddress } from "./utils";
import { ensAvatar, nftSrc, openseaURL } from "./utils/assets_url";

function Home() {
  const [tab, setTab] = useState("IU Chocolate");
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
  const body =
    tab === "IU Chocolate" ? (
      <AllNFT />
    ) : tab === "My Chocolate" ? (
      <MyNFT />
    ) : (
      <About />
    );
  return (
    <VStack w="100%" h="100%" bg="#f8f9fd">
      {header}
      <Box p="80px 0 0 0" w="100%">
        {body}
      </Box>
    </VStack>
  );
}

function AllNFT() {
  const isLoading = false,
    totalSupply = 10;
  // const { data: totalSupply, isLoading } = useTotalSupply();
  return isLoading ? (
    <CenterSpinner />
  ) : totalSupply ? (
    <NFTGrid>
      {range(totalSupply as any).map((idx) => (
        <Center>
          <NFT key={idx} tokenID={idx} />
        </Center>
      ))}
    </NFTGrid>
  ) : (
    <CenterNothing />
  );
}

function MyNFT() {
  const isLoading = false,
    balance = 10;
  // const { data: account } = useAccount();
  // const { data: balance, isLoading } = useBalanceOf(
  //   account?.address ?? kZeroAddress
  // );
  return isLoading ? (
    <CenterSpinner />
  ) : balance ? (
    <NFTGrid>
      {range(balance as any).map((idx) => (
        <Center>
          <OwnedNFT key={idx} index={idx} />
        </Center>
      ))}
    </NFTGrid>
  ) : (
    <CenterNothing />
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

function NFT(p: { tokenID: number; isMine?: boolean }) {
  const isLoading = false,
    nft = {
      name: "IU Chocolate #2",
      image:
        "https://ipfs.infura.io/ipfs/QmXVd7tMEa3oNQsrRncTDQe1V9JftAmuHqtFxUeqH7rukc",
    };
  // const { uri, isLoading } = useTokenURI(p.tokenID);
  const { data: account } = useAccount();
  // if (!uri) return <div />;
  // const nft = JSON.parse(uri);
  const toast = useErrorToast();
  const edit = () => {
    // todo
    if (p.isMine) toast(p.tokenID.toString());
  };
  return (
    <AspectRatio
      ratio={3 / 4}
      w="100%"
      bg="#fff"
      borderRadius="16px"
      overflow="hidden"
      _hover={{
        boxShadow: "0px 24px 74px rgba(0,0,0,0.1)",
      }}
    >
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <LinkOverlay
          isExternal
          href={p.isMine ? undefined : openseaURL(p.tokenID)}
        >
          <Flex direction="column" w="100%" h="100%" p="16px">
            <AspectRatio
              ratio={1}
              w="100%"
              borderRadius="16px"
              overflow="hidden"
            >
              <Center>
                <ZStack>
                  <Image src={nftSrc(nft.image)} alt={nft.name} fit="cover" />
                  <Position w="100%" h="100%" align="center">
                    <Center
                      onClick={edit}
                      w="100%"
                      h="100%"
                      bg="transparent"
                      color="transparent"
                      fontSize="16px"
                      fontWeight="bold"
                      _hover={
                        p.isMine
                          ? {
                              bg: "rgba(0,0,0,0.2)",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      Edit
                    </Center>
                  </Position>
                </ZStack>
              </Center>
            </AspectRatio>
            <VStack flex={1} w="100%" align="start" justify="space-evenly">
              <Text p="16px 0 0 0" fontSize="16px" fontWeight="bold">
                {nft.name}
              </Text>
              <HStack>
                <Image
                  w="24px"
                  borderRadius="50%"
                  src={ensAvatar(account?.address ?? "")}
                  alt={account?.address}
                />
                <Text maxWidth="120px" overflow="clip" fontSize="14px">
                  {shortenAddress(account?.address ?? "")}
                </Text>
              </HStack>
            </VStack>
          </Flex>
        </LinkOverlay>
      )}
    </AspectRatio>
  );
}

function OwnedNFT(p: { index: number }) {
  const isLoading = false,
    tokenID = 0;
  // const { data: account } = useAccount();
  // const tokenID = useTokenOfOwnerByIndex(account!.address!, p.index);
  return isLoading ? (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  ) : (
    <NFT tokenID={tokenID} isMine />
  );
}

function NFTGrid(p: { children: any }) {
  return (
    <SimpleGrid w="100%" p="32px" minChildWidth="260px" gap="32px">
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

function CenterNothing() {
  return (
    <Center h="calc(100vh - 100px)">
      <Text p="0 15px 0 0" cursor="pointer" fontSize="16px" fontWeight="bold">
        Nothing...
      </Text>
    </Center>
  );
}

export default Home;
