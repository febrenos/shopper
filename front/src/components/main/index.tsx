import React from "react"
import { BodyProps } from "./interfaces"
import * as Styled from "./style"

export function Main({ children }: BodyProps) {
  return <Styled.Main>{children}</Styled.Main>
}
