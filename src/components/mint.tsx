import {
  useErrorToast,
  useIsPC,
  useMint,
  useNFT,
  useNFTColor,
  useNFTName,
  useSuccessToast,
  useSwitchNetwork,
} from "@/hooks";
import { ipfsUpload, isEmpty } from "@/utils";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { nextTick } from "process";
import { useState } from "react";
import ImageUploader from "react-images-upload";
import { useAccount } from "wagmi";

export function Mint() {
  const isPC = useIsPC();
  const toast = useErrorToast();
  const success = useSuccessToast();
  const [uploading, { on: startUpload, off: endUpload }] = useBoolean(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount();
  const nftColor = useNFTColor();
  const nftName = useNFTName();
  const switchNetwork = useSwitchNetwork();
  const isRICH = useNFT() === "rich";
  const [nft, setNFT] = useState({
    to: address,
    name: "",
    desp: "",
    image: undefined,
    file: undefined,
  });
  const writeMint = useMint(nft);
  const setImg = (file: any) => setNFT({ ...nft, file });
  const setTo = (event: any) =>
    setNFT({
      ...nft,
      to: isEmpty(event.target.value) ? address : event.target.value,
    });
  const setName = (event: any) => setNFT({ ...nft, name: event.target.value });
  const setDesp = (event: any) => setNFT({ ...nft, desp: event.target.value });

  const onDrop = (picture: any) => {
    setImg(picture[0]);
    nextTick(() => {
      const icon = document.getElementsByClassName("deleteImage")[0];
      if (icon) icon!.innerHTML = "✕";
    });
  };

  const mint = (e: any) => {
    if (!address) {
      toast("Please connect wallet first.");
      return;
    }
    onOpen();
  };
  const submit = async () => {
    if (isEmpty(nft.to)) {
      toast("Please set your NFT's owner address first!");
      return;
    }
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
    const result = (await writeMint()) as any;
    if (result === 404) {
      endUpload();
      return;
    }
    success("Minting successful! The page will be reload after 10s.");
    endUpload();
    onClose();
  };
  return (
    <>
      <Box
        position="fixed"
        bottom="0"
        right="0"
        bg={nftColor}
        p="12px"
        m="32px"
        borderRadius="50%"
        cursor="pointer"
        boxShadow="0px 10px 68px rgba(0,0,0,0.36)"
        _hover={{
          boxShadow: "0px 10px 68px rgba(0,0,0,0.66)",
        }}
        zIndex={3}
        onClick={mint}
      >
        <AddIcon w={6} h={6} color="white" />
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={isPC ? "md" : "xs"}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mint</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="Mint to whom?"
                value={nft.to}
                onChange={setTo}
              />
            </FormControl>
            {isRICH && (
              <FormControl mt={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder={nftName}
                  value={nft.name}
                  onChange={setName}
                />
              </FormControl>
            )}
            <FormControl mt={4}>
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
              Mint
              {uploading && <Spinner m="0 0 0 10px" size="sm" />}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
