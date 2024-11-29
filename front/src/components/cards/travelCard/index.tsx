import React from "react";
import * as Styled from "./style";
import { UserDefault } from "../../../assets/img";
import { Size, Text } from "../../text";

interface TravelCardProps {
  nomeMotorista?: string;
  data?: Date | string;
  origem?: string;
  destino?: string;
  distancia?: number;
  duracao?: number;
  valor?: number;
}

export function TravelCard({
  nomeMotorista = "Sem nome",
  data,
  origem = "indisponível",
  destino = "indisponível",
  distancia = 0,
  duracao = 0,
  valor = 0,
}: TravelCardProps) {
  const formatDate = (date: Date | string) => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return parsedDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Styled.Card>
      <Styled.SpaceBetween>
        <Styled.Gap>
          <Styled.ImgDriver src={UserDefault} />
          <Text text={nomeMotorista ? nomeMotorista : "Sem nome"} size={Size.M} />
        </Styled.Gap>
      </Styled.SpaceBetween>
      <div>
        <Styled.Flex>
          <Styled.Bold>Data:</Styled.Bold>
          <Styled.Text>{(data ? formatDate(data) : "indisponível")}</Styled.Text>
        </Styled.Flex>

        <Styled.Flex>
          <Styled.Bold>Origem:</Styled.Bold>
          <Styled.Text>{(origem ? origem : "indisponível")}</Styled.Text>
        </Styled.Flex>

        <Styled.Flex>
          <Styled.Bold>Destino:</Styled.Bold>
          <Styled.Text>{(destino ? destino : "indisponível")}</Styled.Text>
        </Styled.Flex>

        <Styled.Flex>
          <Styled.Bold>Distância:</Styled.Bold>
          <Styled.Text>
            {distancia !== 0 ? `${distancia} km` : "indisponível"}
          </Styled.Text>
        </Styled.Flex>

        <Styled.Flex>
          <Styled.Bold>Tempo:</Styled.Bold>
          <Styled.Text>
            {(duracao ? duracao : "indisponível")}
          </Styled.Text>
        </Styled.Flex>

        <Styled.Flex>
          <Styled.Bold>Valor:</Styled.Bold>
          <Styled.Text>
            {valor > 0 ? `R$ ${valor.toFixed(2)}` : "indisponível"}
          </Styled.Text>
        </Styled.Flex>
      </div>
    </Styled.Card>
  );
}
