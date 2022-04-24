import { Box, Center, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { LButton, ZStack } from "@/components";
import Home from "./home";

function Welcome() {
  const [showHome, setHome] = useState(false);
  return showHome ? (
    Home()
  ) : (
    <ZStack width="100%" height="100%">
      <Image
        width="100%"
        height="100%"
        fit="cover"
        position="relative"
        src="https://cdn.dribbble.com/users/5930377/screenshots/14190248/media/be259cb4bce1adb47ccb5c2c7c2b49c6.png"
      ></Image>
      <Center width="100%" height="100%">
        <VStack>
          <Text
            fontSize="48"
            fontWeight="bold"
            textShadow="dark-lg"
            color="white"
          >
            NFT Chocolate
          </Text>
          <Box h="4"></Box>
          <LButton color="white" bg="black" onClick={() => setHome(true)}>
            Mint now
          </LButton>
        </VStack>
      </Center>
    </ZStack>
  );
}

export default Welcome;
