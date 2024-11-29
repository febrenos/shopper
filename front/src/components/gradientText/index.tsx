import React from "react"
import * as Styled from "./style"

export enum Size {
  Xs = "xs",
  S = "sm",
  M = "md",
  L = "lg",
  Xl = "xl",
}

export enum Color {
  TxtPrimary = "var(--text-primary)",
  TxtSecondary = "var(--text-secondary-color)",
  TxtTertiary = "var(--txt-tertiary-color)",
  Primary = "var(--primary)",
  TxtTitle = "var(--txt-title-color)",
  Green = "var(--green-color)",
  Red = "var(--red-color)",
  Blue = "var(--blue-color)",
  DarkGreen = "var(--dark-green-color)",
  Purple = "var(--purple-color)",
  Yellow = "var(--yellow-color)",
  Pink = "var(--pink-color)",
  Orange = "var(--orange-color)",
}

export interface TextProps {
  id?: string
  text?: { text: string; color: Color }[]
  size?: Size
  color?: Color
}

// const ExampleText = [
//   { text: "Desenvolvedor", color: Color.TxtPrimary },
//   { text: "FullStack", color: Color.Primary },
// ]

export function GradientText({
  id,
  size = Size.Xl,
  color = Color.TxtPrimary,
  text = [],
}: TextProps) {
  return (
    <Styled.TextContent id={id}>
      {text.map((item, index) => (
        <Styled.Text key={index} size={size} color={item.color}>
          {item.text}
          {/* {index < text.length - 1} */}
        </Styled.Text>
      ))}
    </Styled.TextContent>
  )
}
