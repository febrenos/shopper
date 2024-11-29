import React from "react"
import { BodyProps } from "./interfaces"
import * as Styled from "./style"

export function Body({ children }: BodyProps) {
  return <Styled.Body>{children}</Styled.Body>
}
