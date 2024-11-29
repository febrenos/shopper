import React, { useEffect, useState } from "react"
import * as Styled from "./style"
import { DriverCard } from "../../cards/driverCard"

interface DriverCardListProps {
  list: Array<{
    nome?: string
    descricao?: string
    stars?: number
    veiculo?: string
    valor?: number
  }>
  onSelect?: (driver: any) => void
  type?: string
}

export function DriverCardList({ list, onSelect }: DriverCardListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Recupera o índice selecionado do localStorage ao montar o componente
  useEffect(() => {
    const storedIndex = localStorage.getItem("selectedDriverIndex")
    if (storedIndex !== null) {
      const index = parseInt(storedIndex, 10)
      if (index >= 0 && index < list.length) {
        setActiveIndex(index) // Restaura o índice selecionado
        if (onSelect) {
          onSelect(list[index]) // Notifica o driver selecionado
        }
      }
    }
  }, [list, onSelect])

  const handleCardClick = (index: number, driver: any) => {
    const isActive = activeIndex === index
    const newIndex = isActive ? null : index // Desmarca se for o mesmo card
    setActiveIndex(newIndex)

    // Salva ou remove o índice do motorista selecionado no localStorage
    if (!isActive) {
      localStorage.setItem("selectedDriverIndex", index.toString())
    } else {
      localStorage.removeItem("selectedDriverIndex")
    }

    if (onSelect) {
      onSelect(isActive ? null : driver) // Passa null se desmarcado
    }
  }

  return (
    <Styled.Cards>
      {list.map((item, index) => (
        <DriverCard
          key={index}
          nome={item.nome}
          descricao={item.descricao}
          stars={item.stars}
          veiculo={item.veiculo}
          valor={item.valor}
          isBorderActive={activeIndex === index}
          onClick={() => handleCardClick(index, item)}
        />
      ))}
      {list.length === 0 && (
        <p
          style={{
            textAlign: "center",
          }}
        >
          Nenhum motorista encontrado.
        </p>
      )}
    </Styled.Cards>
  )
}
