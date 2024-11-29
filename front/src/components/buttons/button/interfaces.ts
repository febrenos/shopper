import { ReactNode } from "react"

export interface ButtonProps {
  background?: string
  text?: string
  borderColor?: string
  size?: string
  onClick?: any
  secondary?: boolean
  icon?: React.ReactNode
  type?: ButtonType
  color?: string
  response?: number
  htmlFor?: string
}

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Lite = "lite",
  Outlined = "outlined",
  Error = "error",
  Disabled = "disabled",
}

export interface IconProps {
  type?: ButtonType
  children?: ReactNode
}
