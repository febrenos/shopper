import styled from "styled-components"
import type { HrProps } from "./interfaces"

export const Hr = styled.div<HrProps>`
  opacity: 0.3;
  background: ${(props) => (props.bg ? `${props.width}` : "var(--txt-tertiary-color)")};
  border-radius: 20px;
  height: ${(props) => (props.height ? `${props.height}` : "2px")};
  margin: ${(props) => (props.margin ? `${props.margin}` : "0")};
`
