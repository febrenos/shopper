import React from "react"
import * as Styled from "./style"
import { UserDefault } from "../../../assets/img"
import { Size, Text } from "../../text"
import { StarRatting } from "../../starRatting"

interface driverCardProps {
  nome?: string
  descricao?: string
  stars?: number
  veiculo?: string
  valor?: number
  isBorderActive?: boolean
  onClick?: () => void
}

export function DriverCard({
  nome = "sem nome",
  descricao = "sem descrição",
  stars = 0,
  veiculo = "Veículo indisponível",
  valor = 0,
  isBorderActive = false,
  onClick,
}: driverCardProps) {
  return (
    <Styled.Card isBorderActive={isBorderActive} onClick={onClick}>
      <Styled.SpaceBetween>
        <Styled.Gap>
          <Styled.ImgDriver src={UserDefault} />
          <Text text={nome} size={Size.M} />
        </Styled.Gap>

        <StarRatting ratting={stars} />
      </Styled.SpaceBetween>
      <div>
        <Styled.Flex>
          <Styled.Bold>Veiculo:</Styled.Bold>
          <Styled.Text>{veiculo}</Styled.Text>
        </Styled.Flex>

        <Styled.Flex>
          <Styled.Bold>Valor:</Styled.Bold>
          <Styled.Text>R$ {valor}</Styled.Text>
        </Styled.Flex>
      </div>

      <Styled.Description>{descricao}</Styled.Description>
    </Styled.Card>
  )
}
