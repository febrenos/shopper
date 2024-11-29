import { ReactNode } from "react"
import * as Icons from "../../assets/icon"

export interface IconContentProps {
  themeType?: ThemeType
  children?: ReactNode
  iconType?: IconType
  size?: Size
  startAnimation?: StartAnimation
  animationType?: AnimationType
  interval?: number
  background?: Color
  color?: Color
  padding?: string
  onClick?: any
}

export interface IconProps {
  themeType?: ThemeType
  children?: ReactNode
  iconType?: IconType
  size?: Size
  color?: Color
}

export enum Color {
  Primary = "var(--primary)",
  TextPrimary = "var(--text-primary)",
  Green = "var(--green-primary)",
  Red = "var(--red-primary)",
  Blue = "var(--blue-primary)",
  DarkGreen = "var(--green-tertiary)",
  Yellow = "var(--yellow-primary)",
  Disabled = "var(--disabled)"
}

export enum ThemeType {
  Primary = "primary",
  Secondary = "secondary",
  Lite = "lite",
  Outlined = "outlined",
}

export enum Size {
  Xs = "xs",
  S = "sm",
  M = "md",
  L = "lg",
  Xl = "xl",
}

export enum StartAnimation {
  Hover = "hover",
  HoverInfinite = "hover_infinite",
  Click = "click",
  Press = "press",
  Infinite = "infinite",
}
export enum AnimationType {
  Bounce = "bounce",
  Float = "float",
  Slide = "slide",
  RotateMiddle = "rotate_middle",
  Rotate = "rotate",
}

export enum IconType {
  Admin = "admin",
  Airplane = "air_plane",
  ArrowDown = "arrow_down",
  ArrowLeft = "arrow_left",
  ArrowRight = "arrow_right",
  ArrowUp = "arrow_up",
  Bookmark = "bookmark",
  Bookmarks = "bookmarks",
  Check = "check",
  Circles = "circles",
  ClockLoading = "clock_loading",
  Clock = "clock",
  Code = "code",
  Formation = "formation",
  Lamp = "lamp",
  LineChart = "line_chart",
  Medal = "medal",
  LogOut = "log_out",
  Loading = "loading",
  Menu = "menu",
  Mouse = "mouse",
  Save = "save",
  Star = "star",
  Thunder = "thunder",
  UserInsideShield = "user_inside_shield",
  Linkedin = "linkedin",
  Whatsapp = "whatsapp",
  Email = "email",
  Github = "github",
}

export const iconMap = {
  [IconType.Admin]: Icons.Admin,
  [IconType.Airplane]: Icons.Airplane,
  [IconType.ArrowDown]: Icons.ArrowDown,
  [IconType.ArrowLeft]: Icons.ArrowLeft,
  [IconType.ArrowRight]: Icons.ArrowRight,
  [IconType.ArrowUp]: Icons.ArrowUp,
  [IconType.Bookmark]: Icons.Bookmark,
  [IconType.Bookmarks]: Icons.Bookmarks,
  [IconType.Check]: Icons.Check,
  [IconType.Circles]: Icons.Circles,
  [IconType.ClockLoading]: Icons.ClockLoading,
  [IconType.Clock]: Icons.Clock,
  [IconType.Code]: Icons.Code,
  [IconType.Formation]: Icons.Formation,
  [IconType.Lamp]: Icons.Lamp,
  [IconType.LineChart]: Icons.LineChart,
  [IconType.Medal]: Icons.Medal,
  [IconType.LogOut]: Icons.LogOut,
  [IconType.Loading]: Icons.Loading,
  [IconType.Menu]: Icons.Menu,
  [IconType.Mouse]: Icons.Mouse,
  [IconType.Save]: Icons.Save,
  [IconType.Star]: Icons.Star,
  [IconType.Thunder]: Icons.Thunder,
  [IconType.UserInsideShield]: Icons.UserInsideShield,
  [IconType.Linkedin]: Icons.Linkedin,
  [IconType.Whatsapp]: Icons.Whatsapp,
  [IconType.Email]: Icons.Email,
  [IconType.Github]: Icons.Github,
}
