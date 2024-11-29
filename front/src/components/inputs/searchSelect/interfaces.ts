import { Size } from "./enums"
import { ChangeEvent, KeyboardEvent } from "react"

export interface InputComponentProps {
  text?: string
  type?: string // Optional, defaults to 'text'
  size?: Size
  value?: string
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  placeholder?: string
  // name?:string
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  error?: boolean
  name?: string
  isFocus?: boolean // Optional
  background?: Background
}

export enum Color {
  Primary = "var(--primary)",
  Green = "var(--green-color)",
  Red = "var(--red-color)",
  Blue = "var(--blue-color)",
  DarkGreen = "var(--dark-green-color)",
  Purple = "var(--purple-color)",
  Yellow = "var(--yellow-color)",
  Pink = "var(--pink-color)",
  Orange = "var(--orange-color)",
}

export enum Background {
  Primary = "var(--background-primary)",
  Secondary = "var(--background-secondary)",
  Tertiary = "var(--bg-tertiary-color)",
}

export interface InputProps {
  size?: Size
  error?: boolean
  isFocus?: boolean
  background?: Background
}

export interface LabelProps {
  isFocus: boolean
}
