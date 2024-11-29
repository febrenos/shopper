import styled from "styled-components"
import { Color, Size } from "./index"
import { TextProps } from "./index"

interface TitleProps {
  center?: boolean
  size?: string
  color?: Color
}

export const Title = styled.h3<TitleProps>`
  font-size: 30px;
  margin: 70px 0 70px 0;
  text-align: ${(props) => (props.center ? "center" : "left")};
  color: ${(props) => (props.color ? `${props.color}` : Color.TxtPrimary)};
`

interface AProps {
  size?: string
  color?: Color
}

export const Text = styled.h1<TextProps>`
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  font-size: ${(props) => {
    switch (props.size) {
      case Size.Xs:
        return "12px";
      case Size.S:
        return "14px";
      case Size.M:
        return "16px";
      case Size.L:
        return "35px";
      case Size.Xl:
        return "60px";
      default:
        return "28px"; // Valor padrão
    }
  }};
  font-weight: 600;
  background: linear-gradient(to bottom, ${props => props.color || Color.TxtPrimary} 60%, transparent 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`
