import styled from "styled-components"
import { Size } from "../text"
import { IconProps } from "./models"

export function getStyledIcon(
  IconComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
) {
  return styled(IconComponent)<IconProps>`
    ${({ size }) => {
      switch (size) {
        case Size.Xs:
          return "width: 16px; height: 16px;"
        case Size.S:
          return "width: 24px; height: 24px;"
        case Size.M:
          return "width: 32px; height: 32px;"
        case Size.L:
          return "width: 40px; height: 40px;"
        case Size.Xl:
          return "width: 48px; height: 48px;"
        default:
          return "width: 20px; height: 20px;"
      }
    }};

    & * {
      ${({ themeType }) => {
        switch (themeType) {
          case "primary":
            return `fill: var(--text-button);`
          case "secondary":
            return `fill: var(--accent-color);`
          case "lite":
            return `fill: var(--text-solid);`
          case "outlined":
            return `fill: var(--yellow-primary);`
          default:
            return "fill: var(--success-color);"
        }
      }}
    }

    & * {
      fill: ${({ color }) => color || "currentColor"};
    }
  `
}
