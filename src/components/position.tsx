import { ChakraComponent } from "@chakra-ui/react";

export type AlignTypes =
  | "center"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "centerLeft"
  | "centerRight"
  | "topCenter"
  | "bottomCenter";

export interface PositionProps {
  top: number | string;
  left: number | string;
  right: number | string;
  bottom: number | string;
  align: AlignTypes;
}

export const Position: ChakraComponent<"div", Partial<PositionProps>> = (p) =>
  p.children as any;
