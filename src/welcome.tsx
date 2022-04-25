import { Box, Center, Image, Text, VStack } from "@chakra-ui/react";
import { LButton, ZStack } from "@/components";
import { Link } from "react-router-dom";

function Welcome() {
  return (
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
            fontSize="48px"
            fontWeight="bold"
            textShadow="5px 5px 10px rgba(0,0,0,0.3)"
            color="white"
          >
            NFT Chocolate
          </Text>
          <Box h="4"></Box>
          <Link to="/home">
            <LButton color="#3478f6" bg="#dceafd">
              Mint now
            </LButton>
          </Link>
        </VStack>
      </Center>
    </ZStack>
  );
}

export default Welcome;
