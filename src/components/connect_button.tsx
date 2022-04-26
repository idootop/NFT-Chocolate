import coinbase from "@/assets/coinbase.svg";
import metamask from "@/assets/metamask.svg";
import walletconnect from "@/assets/walletconnect.svg";
import { shortenAddress } from "@/utils";
import {
  Center,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAccount, useConnect } from "wagmi";

export function ConnectButton() {
  const toast = useToast();
  const [{ data }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  if (accountData) {
    return (
      <Menu>
        <MenuButton
          height="40px"
          padding="0 20px"
          borderRadius="1rem"
          fontSize="16px"
          fontWeight="bold"
          color="#fff"
          bg="#3478f6"
          border="0"
          cursor="pointer"
          transitionDuration=".15s"
          transitionTimingFunction="ease-in-out"
          _hover={{
            shadow: "0 0 0 4px #3478f6",
          }}
        >
          <HStack
            height="40px"
            padding="0"
            borderRadius="1rem"
            fontSize="16px"
            fontWeight="bold"
            color="#fff"
            bg="#3478f6"
            border="0"
            cursor="pointer"
            transitionDuration=".15s"
            transitionTimingFunction="ease-in-out"
            _hover={{
              shadow: "0 0 0 4px #3478f6",
            }}
          >
            <Image
              w="24px"
              borderRadius="50%"
              src={"https://stamp.fyi/avatar/" + accountData.address}
              alt={accountData.address}
            />
            <Text maxWidth="120px" overflow="clip">
              {shortenAddress(accountData.ens?.name ?? accountData.address)}
            </Text>
          </HStack>
        </MenuButton>
        <MenuList
          p="0"
          minWidth="180px"
          borderRadius="8px"
          border="1px solid rgba(0,0,0,0.05)"
          boxShadow="0px 3px 5px rgba(0,0,0,0.04)"
          bg="#fff"
          overflow="hidden"
        >
          <MenuItem
            padding="0 16px"
            fontSize="16px"
            lineHeight="52px"
            fontWeight="bold"
            color="#FF3737"
            border="0 transparent"
            bg="transparent"
            _hover={{
              bg: "#e8e6e9",
            }}
            onClick={disconnect}
          >
            Disconnect
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Menu>
      <MenuButton
        height="40px"
        padding="0 20px"
        borderRadius="1rem"
        fontSize="16px"
        fontWeight="bold"
        color="#fff"
        bg="#3478f6"
        border="0"
        cursor="pointer"
        transitionDuration=".15s"
        transitionTimingFunction="ease-in-out"
        _hover={{
          shadow: "0 0 0 4px #3478f6",
        }}
      >
        Connect Wallet
      </MenuButton>
      <MenuList
        p="0"
        minWidth="0"
        borderRadius="8px"
        border="1px solid rgba(0,0,0,0.05)"
        boxShadow="0px 3px 5px rgba(0,0,0,0.04)"
        bg="#fff"
        overflow="hidden"
      >
        {data.connectors.map((connector) =>
          connector.ready ? (
            <MenuItem
              padding="3px 16px"
              lineHeight="42px"
              fontSize="14px"
              fontWeight="bold"
              color="#6f6d79"
              border="0 transparent"
              bg="transparent"
              _hover={{
                bg: "#e8e6e9",
              }}
              disabled={!connector.ready}
              key={connector.id}
              onClick={() =>
                connect(connector).then(({ error }) => {
                  if (error) {
                    toast({
                      duration: 2000,
                      position: "top",
                      render: () => (
                        <Center
                          m="16px 0"
                          bg="#FF3737"
                          p="6px 17px"
                          borderRadius="100px"
                          fontWeight="500"
                          fontSize="14px"
                          color="#282828"
                          boxShadow="0px 3px 5px rgba(0,0,0,0.04)"
                        >
                          {error?.message ?? "Failed to connect"}
                        </Center>
                      ),
                    });
                  }
                })
              }
            >
              <Image
                src={
                  connector.name.includes("Meta")
                    ? metamask
                    : connector.name.includes("Coin")
                    ? coinbase
                    : walletconnect
                }
                w="24px"
                m="0 10px 0 0"
              />
              {connector.name}
            </MenuItem>
          ) : (
            ""
          )
        )}
      </MenuList>
    </Menu>
  );
}
