import { Center, useToast } from "@chakra-ui/react";

export function useErrorToast() {
  const toast = useToast();
  return (text: string) =>
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
          {text}
        </Center>
      ),
    });
}
