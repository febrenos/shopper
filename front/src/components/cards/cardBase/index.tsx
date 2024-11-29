import React, { ReactNode } from "react"
import * as Styled from "./style"

interface CardBaseProps {
  children: ReactNode
}

export function CardBase({ children }: CardBaseProps) {
  return (
    <Styled.Content>
      <Styled.CardBase>{children}</Styled.CardBase>
    </Styled.Content>
  )
}
