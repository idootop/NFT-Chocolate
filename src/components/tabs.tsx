import down from "@/assets/down.svg";
import { useIsPC } from "@/hooks";
import {
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

export function Tabs(p: { tab: string; setTab: (tab: string) => void }) {
  const isPC = useIsPC();
  if (!isPC) {
    return (
      <Menu>
        <MenuButton
          height="40px"
          padding="0 20px"
          borderRadius="1rem"
          fontSize="16px"
          fontWeight="bold"
          border="0"
          cursor="pointer"
          transitionDuration=".15s"
          transitionTimingFunction="ease-in-out"
          shadow="0 0 0 2px #e7e7e9"
          _hover={{
            shadow: "0 0 0 4px #d1e3fd",
          }}
        >
          <HStack>
            <Text maxWidth="120px" overflow="clip">
              {p.tab.split(" ")[0]}
            </Text>
            <Image w="24px" src={down} alt="down" />
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
          <TabItem setTab={p.setTab}>IU Chocolate</TabItem>
          <TabItem setTab={p.setTab}>My Chocolate</TabItem>
          <TabItem setTab={p.setTab}>About</TabItem>
        </MenuList>
      </Menu>
    );
  }
  return (
    <>
      <Tab active={p.tab} setTab={p.setTab}>
        IU Chocolate
      </Tab>
      <Tab active={p.tab} setTab={p.setTab}>
        My Chocolate
      </Tab>
      <Tab active={p.tab} setTab={p.setTab}>
        About
      </Tab>
    </>
  );
}

function Tab(p: {
  active: string;
  setTab: (tab: string) => void;
  children: string;
}) {
  return (
    <Text
      p="0 15px 0 0"
      cursor="pointer"
      fontSize="16px"
      fontWeight="bold"
      color={p.active === p.children ? "black" : "#6e6d78"}
      onClick={() => {
        p.setTab(p.children);
      }}
    >
      {p.children}
    </Text>
  );
}

function TabItem(p: { setTab: (tab: string) => void; children: string }) {
  return (
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
      onClick={() => {
        p.setTab(p.children);
      }}
    >
      <Text
        p="0 15px 0 0"
        cursor="pointer"
        fontSize="16px"
        fontWeight="bold"
        color="#6e6d78"
      >
        {p.children}
      </Text>
    </MenuItem>
  );
}
