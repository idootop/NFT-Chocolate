import { LButton, ZStack } from "@/components";
import { Box, Center, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import bg from "./assets/bg.png";

function Welcome() {
  return (
    <ZStack width="100%" height="100vh">
      <Image
        width="100%"
        height="100%"
        fit="cover"
        position="relative"
        src={bg}
      ></Image>
      <Center width="100%" height="100%">
        <VStack>
          <Text
            fontSize="48px"
            fontWeight="bold"
            textShadow="5px 5px 10px rgba(0,0,0,0.3)"
            color="white"
          >
            Decentralized World
          </Text>
          <Box h="4"></Box>
          <Link to="/index.html">
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
