import { Box, ChakraComponent } from "@chakra-ui/react";
import { PositionProps } from "./position";

export const ZStack: ChakraComponent<"div", {}> = (p) => {
  const children = p.children as any;
  if (!Array.isArray(p.children) || p.length < 1) return p.children;
  const target = children![0];
  let items = children.slice(1);
  const content = items.find((e: any) => Array.isArray(e));
  if (content !== undefined) {
    const index = items.indexOf(content);
    items.splice(index, 1);
    items = [...items, ...content];
  }
  const contents = items.map((item: any, index: number) => {
    const p = item.props ?? {};
    const position = generateStackPosition(p);
    const zIndex = p?.zIndex ?? 1;
    return (
      <Box
        key={index}
        {...{ ...p, ...position }}
        position="absolute"
        zIndex={zIndex}
      >
        {item}
      </Box>
    );
  });
  return (
    <Box {...p} position="relative">
      {contents}
      {target}
    </Box>
  ) as any;
};

export function generateStackPosition(p?: Partial<PositionProps>) {
  switch (p?.align) {
    case "topLeft":
      return {
        top: 0,
        left: 0,
      };
    case "topRight":
      return {
        top: 0,
        right: 0,
      };
    case "bottomLeft":
      return {
        bottom: 0,
        left: 0,
      };
    case "bottomRight":
      return {
        bottom: 0,
        right: 0,
      };
    case "center":
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    case "topCenter":
      return {
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
      };
    case "bottomCenter":
      return {
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
      };
    case "centerLeft":
      return {
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
      };
    case "centerRight":
      return {
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
      };
    default:
      return p;
  }
}
