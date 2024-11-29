import styled, { css, keyframes } from "styled-components"
import {
  IconContentProps,
  iconMap,
  IconProps,
  IconType,
  Size,
  AnimationType,
  StartAnimation,
} from "./models"

// Define keyframes for animations
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15%);
  }
  60% {
    transform: translateY(5%);
  }
`

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15%);
  }
  100% {
    transform: translateY(0);
  }
`

const slide = keyframes`
  0% {
    transform: translateX(15%);
  }
  20%{
    transform: translateX(10%);
  }
  50% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(-10%);
  }
  100% {
    transform: translateX(-15%);
  }
`

const rotateMiddle = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

// Function to get styled icon component
export function getStyledIcon(iconType: IconType) {
  const IconComponent = iconMap[iconType]

  if (!IconComponent) {
    return null
  }

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

export const ContentIcon = styled.div<IconContentProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  padding: ${({ padding }) => padding || "10px"};
  /* height: fit-content;
  width: fit-content; */
  background-color: ${({ background }) => background || "transparent"};
  border-radius: 100%;

  ${({ startAnimation, animationType, interval }) => {
    const animationDuration = interval ? `${interval}ms` : "1s"

    if (startAnimation === StartAnimation.Click) {
      return css`
        svg {
          animation: ${animationType === AnimationType.Bounce
              ? bounce
              : animationType === AnimationType.Rotate
              ? rotate
              : animationType === AnimationType.Float
              ? float
              : animationType === AnimationType.Slide
              ? slide
              : animationType === AnimationType.RotateMiddle
              ? rotateMiddle
              : "none"}
            ${animationDuration} linear alternate; //linear alternate
          animation-fill-mode: forwards;
        }
      `
    }

    if (startAnimation === StartAnimation.Hover) {
      return css`
        &:hover svg {
          animation: ${animationType === AnimationType.Bounce
              ? bounce
              : animationType === AnimationType.Rotate
              ? rotate
              : animationType === AnimationType.Float
              ? float
              : animationType === AnimationType.Slide
              ? slide
              : animationType === AnimationType.RotateMiddle
              ? rotateMiddle
              : "none"}
            ${animationDuration} ease-in-out;
          animation-fill-mode: forwards;
        }
      `
    }

    if (startAnimation === StartAnimation.HoverInfinite) {
      return css`
        &:hover svg {
          animation: ${animationType === AnimationType.Bounce
              ? bounce
              : animationType === AnimationType.Rotate
              ? rotate
              : animationType === AnimationType.Float
              ? float
              : animationType === AnimationType.Slide
              ? slide
              : animationType === AnimationType.RotateMiddle
              ? rotateMiddle
              : "none"}
            ${animationDuration} infinite;
        }
      `
    }

    if (startAnimation === StartAnimation.Press) {
      return css`
        &:active svg {
          animation: ${animationType === AnimationType.Bounce
              ? bounce
              : animationType === AnimationType.Rotate
              ? rotate
              : animationType === AnimationType.Float
              ? float
              : animationType === AnimationType.Slide
              ? slide
              : animationType === AnimationType.RotateMiddle
              ? rotateMiddle
              : "none"}
            ${animationDuration} infinite;
        }
      `
    }

    if (startAnimation === StartAnimation.Infinite) {
      return css`
        svg {
          animation: ${animationType === AnimationType.Bounce
              ? bounce
              : animationType === AnimationType.Rotate
              ? rotate
              : animationType === AnimationType.Float
              ? float
              : animationType === AnimationType.Slide
              ? slide
              : animationType === AnimationType.RotateMiddle
              ? rotateMiddle
              : "none"}
            ${animationDuration} linear infinite alternate;
        }
      `
    }

    return css`
      svg {
        animation: none;
      }
    `
  }}
`