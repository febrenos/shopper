import styled from "styled-components"
import { IconProps } from "../interfaces"

export const ContentIcon = styled.div<IconProps>`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  & * {
    ${({ type }) => {
      switch (type) {
        case "primary":
          return `
            fill: var(--text-button);
          `
        case "secondary":
          return `
            fill: var(--accent-color);
          `
        case "lite":
          return `
            fill: var(--text-solid);
          `
        case "outlined":
          return `
            fill: var(--yellow-primary);
          `
        default:
          return "fill: var(--success-color)"
      }
    }}
  }
`
