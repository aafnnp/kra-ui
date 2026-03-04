import { Children, Fragment } from "react"
import Box from "../Box"
import type { BoxProps } from "../Box"
import type { Theme } from "../../theme"

export interface StackProps extends BoxProps {
  /** 子元素间距，对应 theme.spacing 的键 */
  space?: keyof Theme["spacing"]
  /** 排列方向 */
  direction?: "row" | "column"
}

/**
 * 堆叠布局，子元素之间自动添加间距
 */
function Stack({ space = "s", direction = "column", children, ...rest }: StackProps) {
  const isRow = direction === "row"
  const validChildren = Children.toArray(children).filter(Boolean)

  return (
    <Box
      flexDirection={direction}
      {...rest}
    >
      {validChildren.map((child, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <Box
              width={isRow ? undefined : undefined}
              height={isRow ? undefined : undefined}
              marginLeft={isRow ? space : undefined}
              marginTop={!isRow ? space : undefined}
            />
          )}
          {child}
        </Fragment>
      ))}
    </Box>
  )
}

/**
 * 水平堆叠布局
 */
function HStack(props: Omit<StackProps, "direction">) {
  return (
    <Stack
      direction="row"
      {...props}
    />
  )
}

/**
 * 垂直堆叠布局
 */
function VStack(props: Omit<StackProps, "direction">) {
  return (
    <Stack
      direction="column"
      {...props}
    />
  )
}

export { HStack, VStack }
export default Stack
