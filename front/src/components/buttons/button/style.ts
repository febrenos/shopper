import styled, { keyframes } from "styled-components"
import { Loading } from "../../../assets/icon"
import { ButtonProps } from "./interfaces"

export const Button = styled.button<ButtonProps>`
  ${({ type }) => {
    switch (type) {
      case "primary":
        return `
          fill: var(--background-primary);
          color: var(--background-primary);
          background-color: var(--primary);
          border-radius: 10px;
          padding: 8px;
          border: 3px solid var(--primary);
          cursor: pointer;
        `
      case "secondary":
        return `
          fill: var(--primary);
          color: var(--primary);
          background-color: transparent;
          padding: 8px;
          border-radius: 10px;
          border: 3px solid var(--primary);
          cursor: pointer;
        `
      case "lite":
        return `
          color: var(--text-primary);
          display: flex;
          height: 100%;
          align-items: center;
          background-color: var(--background-secondary);
          padding: 0 5px 0 5px;
          gap: 20px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
        `
      case "outlined":
        return `
          color: var(--yellow-primary);
          display: flex;
          height: 50%;
          align-items: center;
          background-color: var(--yellow-primary);
          padding: 0 5px 0 5px;
          gap: 10px;
          border-radius: 32px;
          border: 3px solid var(--yellow-primary);
          cursor: pointer;
        `
      case "error":
        return `
          color: var(--background-primary);
          background-color: var(--error-color);
          padding: 8px;
          border-radius: 5px;
          border: 3px solid var(--error-color);
          cursor: pointer;
        `
      case "disabled":
        return `
            color: var(--background-primary);
            background-color: var(--disabled);
            padding: 8px;
            border-radius: 10px;
            border: 3px solid var(--disabled);
            opacity: 0.5;
            cursor: not-allowed;
          `
      default:
        return "none"
    }
  }}
  height:fit-content;
  width: fit-content;
  font-size: 15px;
  font-weight: 600;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.8;
    cursor: default;
  }
`

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const LoadingIcon = styled(Loading)`
  cursor: default;
  font-size: 16px;
  animation: ${spinAnimation} 2s linear infinite;
`

export const ContentIcon = styled.div<ButtonProps>`
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
