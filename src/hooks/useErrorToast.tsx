import { Center, useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useState } from "react";

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

function CountDown(p: { text: string }) {
  const n = useRef(0);
  const [count, setCount] = useState(10);
  n.current = count;
  useEffect(() => {
    const timer = setInterval(() => {
      if (n.current > 0) {
        setCount(n.current - 1);
      } else {
        window.location.reload();
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <Center
      m="16px 0"
      bg="#23d18b"
      p="6px 17px"
      borderRadius="100px"
      fontWeight="500"
      fontSize="14px"
      color="#282828"
      boxShadow="0px 3px 5px rgba(0,0,0,0.04)"
    >
      {p.text.replace("10s", `${count}s`)}
    </Center>
  );
}

export function useSuccessToast() {
  const toast = useToast();
  return (text: string) =>
    toast({
      duration: 12000,
      position: "top",
      render: () => <CountDown text={text} />,
    });
}
