import { Button } from "@chakra-ui/react";

export const LButton = (p: {
  bg?: string;
  color?: string;
  onClick: () => any;
  children: string;
}) => (
  <Button
    borderRadius="15"
    color={p.color ?? "white"}
    bg={p.bg ?? "black"}
    _hover={{ border: "2px solid " + (p.color ?? "white") }}
    onClick={() => p.onClick()}
  >
    Mint now
  </Button>
);
