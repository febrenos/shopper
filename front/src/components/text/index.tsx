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
  text?: string
  size?: Size
  title?: boolean
  space?: number
  bold?: boolean
  link?: boolean
  href?: string
  center?: boolean
  color?: Color
  maxW?: string
  responsive?: boolean
  responsiveW?: string
  textLimit?: number
  coloredParts?: { text: string; color: Color }[]
}

export function Text({
  id,
  text = "text",
  size,
  title = false,
  bold,
  link = false,
  href,
  center = false,
  color,
  maxW,
  responsive,
  textLimit,
  coloredParts = [], // Recebe as partes coloridas
}: TextProps) {
  const truncateText = (text: string, limit: number | undefined) => {
    if (limit && text.length > limit) {
      return `${text.substring(0, limit)}...`
    }
    return text
  }

  const displayText = truncateText(text, textLimit)

  const renderTextWithColors = () => {
    let lastIndex = 0
    return (
      <>
        {coloredParts.map(({ text, color }, index) => {
          const startIndex = displayText.indexOf(text, lastIndex)
          if (startIndex !== -1) {
            const beforeText = displayText.slice(lastIndex, startIndex)
            lastIndex = startIndex + text.length
            return (
              <>
                <span>{beforeText}</span>
                <span style={{ color }}>{text}</span>
              </>
            )
          }
          return null
        })}
        <span>{displayText.slice(lastIndex)}</span>
      </>
    )
  }

  if (title) {
    return (
      <Styled.Title id={id} size={size} center={center} color={color}>
        {renderTextWithColors()}
      </Styled.Title>
    )
  }

  if (link) {
    return (
      <Styled.A
        id={id}
        size={size}
        href={href}
        color={color}
        target="_blank"
        rel="noopener noreferrer"
      >
        {renderTextWithColors()}
      </Styled.A>
    )
  }

  return (
    <Styled.Text
      id={id}
      size={size}
      bold={bold}
      center={center}
      color={color}
      maxW={maxW}
      responsive={responsive}
    >
      {renderTextWithColors()}
    </Styled.Text>
  )
}
