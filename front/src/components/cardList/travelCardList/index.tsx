import React from "react"
import * as Styled from "./style"
import { TravelCard } from "../../cards/travelCard"

interface DriverProps {
  id: number
  name: string
}

interface TravelCardListProps {
  list: Array<{
    driver: DriverProps
    date?: Date | string
    origin?: string
    destination?: string
    distance?: number
    duration?: number
    value?: number
  }> | null
}

export function TravelCardList({ list }: TravelCardListProps) {
  return (
    <Styled.Cards>
      {list && list.length > 0 ? (
        list.map((item, index) => (
          <TravelCard
            key={index}
            nomeMotorista={item.driver.name}
            data={item.date}
            origem={item.origin}
            destino={item.destination}
            distancia={item.distance}
            duracao={item.duration}
            valor={item.value}
          />
        ))
      ) : (
        <p>Nenhuma viagem encontrada.</p>
      )}
    </Styled.Cards>
  )
}
