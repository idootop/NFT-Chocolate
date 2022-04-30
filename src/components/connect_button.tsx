import coinbase from "@/assets/coinbase.svg";
import metamask from "@/assets/metamask.svg";
import walletconnect from "@/assets/walletconnect.svg";
import { useErrorToast, useNFTColor, useSwitchNetwork } from "@/hooks";
import { shortenAddress } from "@/utils";
import { ensAvatar } from "@/utils/assets_url";
import {
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";

export function ConnectButton() {
  const toast = useErrorToast();
  const { data: account } = useAccount();
  const { data: ensName } = useEnsName();
  const { disconnect } = useDisconnect();
  const nftColor = useNFTColor();
  const switchNetwork = useSwitchNetwork();
  const { connectors, connectAsync } = useConnect({
    onError(error) {
      toast(error?.message ?? "Failed to connect");
    },
  });
  const onClickConnect = (connector: any) =>
    connectAsync(connector)
      .catch(() => undefined)
      .then(async (e) => {
        if (!(await switchNetwork(e?.chain.id))) {
          toast("Please switch your network to Polygon first!");
          return;
        }
      });

  if (account) {
    return (
      <Menu>
        <MenuButton
          height="40px"
          padding="0 20px"
          borderRadius="1rem"
          fontSize="16px"
          fontWeight="bold"
          color="#fff"
          bg={nftColor}
          border="0"
          cursor="pointer"
          transitionDuration=".15s"
          transitionTimingFunction="ease-in-out"
          _hover={{
            shadow: "0 0 0 4px " + nftColor,
          }}
        >
          <HStack>
            <Image
              w="24px"
              borderRadius="50%"
              src={ensAvatar(account.address ?? "")}
              alt={account.address}
            />
            <Text maxWidth="120px" overflow="clip">
              {shortenAddress(ensName ?? account.address)}
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
            _focus={{
              bg: "transparent",
            }}
            onClick={() => disconnect()}
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
        bg={nftColor}
        border="0"
        cursor="pointer"
        transitionDuration=".15s"
        transitionTimingFunction="ease-in-out"
        _hover={{
          shadow: "0 0 0 4px " + nftColor,
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
        {connectors.map((connector) =>
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
              _focus={{
                bg: "transparent",
              }}
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => onClickConnect(connector)}
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
