import React from "react"
import { Icon } from "../icon"
import { Color, IconType, Size } from "../icon/models"
import * as Styled from "./style"

interface StarRattingProps {
  quantityOfStars?: number
  ratting?: number
}

export function StarRatting({
  quantityOfStars = 5,
  ratting = 0,
}: StarRattingProps) {
  // Cria um array de 0 a quantityOfStars para gerar o loop
  const starsArray = new Array(quantityOfStars).fill(0)

  return (
    <Styled.StartsContent>
      {starsArray.map((_, index) => {
        let color = Color.Disabled
        if (index < ratting) {
          color = Color.Yellow
        }
        if (ratting >= quantityOfStars) {
          color = Color.Yellow
        }

        return (
          <Icon
            key={index}
            iconType={IconType.Star}
            color={color}
            size={Size.S}
            padding="0"
          />
        )
      })}
    </Styled.StartsContent>
  )
}
