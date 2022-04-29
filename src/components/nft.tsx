import { Position, ZStack } from "@/components";
import {
    useErrorToast,
    useOwnerOf,
    useTokenOfOwnerByIndex,
    useTokenURI
} from "@/hooks";
import { ensAvatar, nftSrc, openseaURL, shortenAddress } from "@/utils";
import {
    AspectRatio,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Image,
    Input,
    LinkOverlay,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { useRef } from "react";
import { useAccount } from "wagmi";

export function OwnedNFT(p: { index: number }) {
    const { data: account } = useAccount();
    const tokenID = useTokenOfOwnerByIndex(account!.address!, p.index);
    return <NFT tokenID={tokenID} isMine />;
  }

export function NFT(p: { tokenID: number; isMine?: boolean }) {
  const toast = useErrorToast();
  const initialRef = useRef<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { uri, isLoading } = useTokenURI(p.tokenID);
  if (!uri) return <div />;
  const nft = JSON.parse(uri);
  const account = !p.isMine
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useOwnerOf(p.tokenID)
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useAccount().data?.address;

  const edit = () => {
    if (p.isMine) onOpen();
  };
  const submit = () => {
    // todo
    if (p.isMine) {
      onClose();
    }
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
                    <>
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
                      <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Create your account</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody pb={6}>
                            <FormControl>
                              <FormLabel>First name</FormLabel>
                              <Input
                                ref={initialRef}
                                placeholder="First name"
                              />
                            </FormControl>

                            <FormControl mt={4}>
                              <FormLabel>Last name</FormLabel>
                              <Input placeholder="Last name" />
                            </FormControl>
                          </ModalBody>

                          <ModalFooter>
                            <Button colorScheme="blue" mr={3}>
                              Save
                            </Button>
                            <Button onClick={submit}>Cancel</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </>
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
