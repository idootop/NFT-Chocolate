import ethLogo from "@/assets/eth.svg";
import polygonLogo from "@/assets/polygon.svg";
import { ConnectButton, Position, Tabs, ZStack } from "@/components";
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Link,
  LinkOverlay,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAccount } from "wagmi";
import {
  useBalanceOf,
  useErrorToast,
  useOwnerOf,
  useTokenOfOwnerByIndex,
  useTokenURI,
  useTotalSupply,
} from "./hooks";
import { clamp, kZeroAddress, range, shortenAddress } from "./utils";
import { ensAvatar, nftSrc, openseaURL } from "./utils/assets_url";

function Home() {
  const nft = useSearchParams()[0].get("nft");
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
    <Center h="calc(100vh - 100px)" p="32px" textAlign="center">
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

function NFT(p: { tokenID: number; isMine?: boolean }) {
  const toast = useErrorToast();
  const { uri, isLoading } = useTokenURI(p.tokenID);
  if (!uri) return <div />;
  const nft = JSON.parse(uri);
  const account = !p.isMine
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useOwnerOf(p.tokenID)
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useAccount().data?.address;

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
              <Center w="100%" h="100%">
                <ZStack w="100%" h="100%">
                  <Image
                    w="100%"
                    h="100%"
                    src={nftSrc(nft.image)}
                    alt={nft.name}
                    fit="cover"
                  />
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
                  src={ensAvatar(account ?? "")}
                  alt={account}
                />
                <Text maxWidth="120px" overflow="clip" fontSize="14px">
                  {shortenAddress(account ?? "")}
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
  const { data: account } = useAccount();
  const tokenID = useTokenOfOwnerByIndex(account!.address!, p.index);
  return <NFT tokenID={tokenID} isMine />;
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

function CenterNothing(p: { isMine?: boolean }) {
  return (
    <Center h="calc(100vh - 100px)">
      {p.isMine ? (
        <VStack>
          <Text p="0 15px 0 0" fontSize="16px" fontWeight="bold">
            You don't have an IU Chocolate yet.
          </Text>
        </VStack>
      ) : (
        <Text p="0 15px 0 0" fontSize="16px" fontWeight="bold">
          Nothing...
        </Text>
      )}
    </Center>
  );
}

export default Home;
