import { Box, ChakraComponent } from "@chakra-ui/react";
import { Fragment } from "react";
import { PositionProps } from "./position";

export const ZStack: ChakraComponent<"div", {}> = (props) => {
  const children = ((props.children as any[]) ?? []).filter((e) => e);
  if (!Array.isArray(children) || children.length < 1) return children;
  const target = children![0];
  let items = children.slice(1);
  items = _flattenChildren(items);
  const contents = items.map((item: any, index: number) => {
    const p = item.props ?? {};
    const position = _getStackPosition(p);
    const zIndex = p?.zIndex ?? 1;
    const props = { ...p, ...position, zIndex, position: "absolute" };

    return (
      <Box key={index} {...props}>
        {item}
      </Box>
    );
  });

  return (
    <Box {...{ ...props, position: "relative" }}>
      {contents}
      {target}
    </Box>
  ) as any;
};

const _flattenChildren = (children: any): any => {
  return Array.isArray(children)
    ? [].concat(
        ...children.map((c) =>
          c?.type === Fragment
            ? _flattenChildren(c.props.children)
            : _flattenChildren(c)
        )
      )
    : [children];
};

function _getStackPosition(p?: Partial<PositionProps>) {
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
