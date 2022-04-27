import { useBreakpointValue } from "@chakra-ui/react";

export function useIsPC() {
  return useBreakpointValue({ base: false, md: true });
}

export function useIsMobile() {
  return useBreakpointValue({ base: true, sm: false });
}
