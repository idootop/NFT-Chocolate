import { Button } from "@chakra-ui/react";

export const LButton = (p: {
  bg?: string;
  color?: string;
  onClick?: () => any;
  disabled?: boolean;
  children: string;
}) => {
  const { disabled = false, bg = "balck", color = "white" } = p;
  return (
    <Button
      disabled={disabled}
      height="40px"
      padding="0 20px"
      borderRadius="1rem"
      fontSize="16px"
      fontWeight="bold"
      color={color}
      border="0"
      bg={bg}
      cursor="pointer"
      transitionDuration=".15s"
      transitionTimingFunction="ease-in-out"
      _hover={{
        shadow: "0 0 0 4px " + bg,
      }}
      onClick={() => p.onClick?.()}
    >
      {p.children}
    </Button>
  );
};
