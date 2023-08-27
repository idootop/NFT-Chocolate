import ethLogo from "@/assets/eth.svg";
import { Position, ZStack } from "@/components";
import {
  useErrorToast,
  useIsPC,
  useNFT,
  useNFTName,
  useOwnerOf,
  useSuccessToast,
  useSwitchNetwork,
  useTipToast,
  useTokenOfOwnerByIndex,
  useTokenURI,
  useUpdate,
} from "@/hooks";
import {
  ensAvatar,
  ipfsUpload,
  isEmpty,
  nftSrc,
  openseaURL,
  shortenAddress,
} from "@/utils";
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useBoolean,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { nextTick } from "process";
import { useState } from "react";
import ImageUploader from "react-images-upload";
import { useAccount, useEnsName } from "wagmi";

export function OwnedNFT(p: { index: number }) {
  const { address } = useAccount();
  const tokenID = useTokenOfOwnerByIndex(address!, p.index);
  return <NFT tokenID={tokenID} isMine />;
}

export function NFT(p: { tokenID: number; isMine?: boolean }) {
  const { uri, isLoading } = useTokenURI(p.tokenID);
  const nft = JSON.parse(uri ?? "{}");
  nft.tokenID = p.tokenID;
  const isRICH = useNFT() === "rich";
  const { address: my_address } = useAccount();
  const owner_address = useOwnerOf(p.tokenID);
  const address: any = !p.isMine ? owner_address : my_address;
  const { data: ensName } = useEnsName({ address, chainId: 1 });
  return !uri ? (
    <div />
  ) : (
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
        <Flex
          direction="column"
          w="100%"
          h="100%"
          p="16px"
          cursor="pointer"
          onClick={() => {
            if (!p.isMine)
              window.open(openseaURL(p.tokenID, isRICH), "_blank")?.focus();
          }}
        >
          <AspectRatio ratio={1} w="100%" borderRadius="16px" overflow="hidden">
            <Center w="100%" h="100%">
              <ZStack w="100%" h="100%">
                <Center
                  w="100%"
                  h="100%"
                  bgImage={ethLogo}
                  bgRepeat="no-repeat"
                  bgPosition="center"
                  bgSize="50%"
                  color="transparent"
                >
                  <Image
                    w="100%"
                    h="100%"
                    src={nftSrc(nft.image)}
                    alt={nft.name}
                    fit="cover"
                  />
                </Center>
                <Position w="100%" h="100%" align="center">
                  <EditMask nft={nft} isMine={p.isMine ?? false} />
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
                src={ensAvatar(address)}
                alt={address}
              />
              <Text maxWidth="120px" overflow="clip" fontSize="14px">
                {shortenAddress(ensName ?? address)}
              </Text>
            </HStack>
          </VStack>
        </Flex>
      )}
    </AspectRatio>
  );
}

function EditMask(p: {
  nft: { tokenID: string; name: string; desp: string; image: string };
  isMine: boolean;
}) {
  const isPC = useIsPC();
  const toast = useErrorToast();
  const success = useSuccessToast();
  const tip = useTipToast();
  const [uploading, { on: startUpload, off: endUpload }] = useBoolean(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nftName = useNFTName();
  const isRICH = useNFT() === "rich";
  const [nft, setNFT] = useState({
    to: "",
    name: "",
    desp: "",
    image: undefined,
    file: undefined,
    tokenID: p.nft.tokenID,
  });
  const writeUpdate = useUpdate(nft);
  const switchNetwork = useSwitchNetwork();
  const setImg = (file: any) => setNFT({ ...nft, file });
  const setName = (event: any) => setNFT({ ...nft, name: event.target.value });
  const setDesp = (event: any) => setNFT({ ...nft, desp: event.target.value });

  const onDrop = (picture: any) => {
    setImg(picture[0]);
    nextTick(() => {
      const icon = document.getElementsByClassName("deleteImage")[0];
      if (icon) icon!.innerHTML = "✕";
    });
  };

  const edit = () => {
    if (p.isMine) {
      setImg(undefined);
      onOpen();
    }
  };
  const submit = async () => {
    if (!p.isMine) return;
    if (isRICH && isEmpty(nft.name)) {
      toast("Please set your NFT's name first!");
      return;
    }
    if (isEmpty(nft.desp)) {
      toast("Please set your NFT's description first!");
      return;
    }
    if (!nft.file) {
      toast("Please set your NFT image first!");
      return;
    }
    if (!(await switchNetwork())) {
      toast("Please switch your network to Polygon first!");
      return;
    }
    startUpload();
    const uri = await ipfsUpload(nft.file);
    if (!uri) {
      toast(uri ?? "Upload Image to IPFS failure!");
      endUpload();
      return;
    }
    nft.image = uri as any;
    const result = (await writeUpdate()) as any;
    if (result === 404) {
      endUpload();
      return;
    }
    success("Update successful! The page will be reload after 10s.");
    endUpload();
    onClose();
  };
  return (
    <>
      <Center
        onClick={edit}
        w="100%"
        h="100%"
        bg="transparent"
        color="transparent"
        fontSize="16px"
        fontWeight="bold"
        userSelect="none"
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={isPC ? "md" : "xs"}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Metadata</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isRICH && (
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder={nftName}
                  value={nft.name}
                  onChange={setName}
                />
              </FormControl>
            )}
            <FormControl mt={isRICH ? 4 : 0}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="What's it?"
                value={nft.desp}
                onChange={setDesp}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>NFT Image</FormLabel>
              <ImageUploader
                withIcon={!nft.file}
                withPreview={nft.file ? true : false}
                singleImage
                withLabel={false}
                onChange={onDrop}
                buttonText="Choose Image"
                buttonStyles={{
                  display: nft.file ? "none" : undefined,
                }}
                fileContainerStyle={{
                  border: "1px dashed #cccccc",
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submit}>
              Update
              {uploading && <Spinner m="0 0 0 10px" size="sm" />}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
