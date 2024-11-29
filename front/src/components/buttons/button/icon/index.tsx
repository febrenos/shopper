import React from "react"
import { IconProps, ButtonType } from "../interfaces"
import * as Styled from "./style"

export function Icon({ type = ButtonType.Primary, children }: IconProps) {
  return <Styled.ContentIcon type={type}>{children}</Styled.ContentIcon>
}
