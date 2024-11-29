import React from "react"
import * as Styled from "./style"
import { HrProps } from "./interfaces"

export function Hr({ bg, width, height, margin }: HrProps) {
  return <Styled.Hr bg={bg} width={width} height={height} margin={margin} />
}
