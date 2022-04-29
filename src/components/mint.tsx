import { useErrorToast, useIsPC, useNFTColor } from "@/hooks";
import { ipfsUpload } from "@/utils";
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
import { useRef, useState } from "react";
import ImageUploader from "react-images-upload";
import { useAccount } from "wagmi";

export function Mint() {
  const isPC = useIsPC();
  const toast = useErrorToast();
  const initialRef = useRef<any>();
  const [img, setImg] = useState();
  const [uploading, { on: startUpload, off: endUpload }] = useBoolean(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: account } = useAccount();
  const nftColor = useNFTColor();

  const onDrop = (picture: any) => {
    setImg(picture[0]);
    nextTick(() => {
      const icon = document.getElementsByClassName("deleteImage")[0];
      if (icon) icon!.innerHTML = "✕";
    });
  };

  const mint = () => {
    if (!account?.address) {
      toast("Please connect wallet first.");
      return;
    }
    onOpen();
  };
  const submit = async () => {
    if (!img) {
      toast("Please set your NFT image first!");
      return;
    }
    startUpload();
    const uri = await ipfsUpload(img);
    if (!uri) {
      toast(uri ?? "Upload Image to IPFS failure!");
      endUpload();
      return;
    }
    toast(uri);
    // todo write contract
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
              <FormLabel>Description</FormLabel>
              <Input ref={initialRef} placeholder="What's it?" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>NFT Image</FormLabel>
              <ImageUploader
                withIcon={!img}
                withPreview={img}
                singleImage
                withLabel={false}
                onChange={onDrop}
                buttonText="Choose Image"
                buttonStyles={{
                  display: img ? "none" : undefined,
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
