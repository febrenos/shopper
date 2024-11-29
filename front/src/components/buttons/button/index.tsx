import React, { useState } from "react"
import * as Styles from "./style"
import { Align } from "../../index"
import { ButtonProps, ButtonType } from "./interfaces"
import { Icon } from "./icon"
import { JustifyType } from "../../align/interfaces"

export function Button({
  background,
  text,
  borderColor,
  size,
  onClick,
  secondary = false,
  icon,
  type,
  color,
  response,
  htmlFor,
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [buttonType, setButtonType] = useState<ButtonType>(ButtonType.Secondary)
  const [, setError] = useState<string | null>(null)

  const handleClick = async () => {
    if (!onClick) return

    setIsLoading(true)
    setError(null)
    let timer: NodeJS.Timeout | undefined

    try {
      const result = onClick()
      if (result instanceof Promise) {
        await result
      }
    } catch (err) {
      setButtonType(ButtonType.Error)
      timer = setTimeout(() => {
        setButtonType(ButtonType.Error)
      }, 2000)
    } finally {
      setIsLoading(false)
      if (response && (response < 200 || response >= 300)) {
        setButtonType(ButtonType.Error)
        timer = setTimeout(() => {
          setButtonType(ButtonType.Error)
        }, 2000)
      }
    }

    if (timer) {
      clearTimeout(timer)
    }
  }

  return (
    <Styles.Button
      secondary={secondary}
      background={background}
      borderColor={borderColor}
      size={size}
      onClick={isLoading ? () => {} : handleClick}
      disabled={isLoading}
      type={type}
      color={color}
      htmlFor={htmlFor}
    >
      {isLoading ? (
        <Icon type={buttonType}>
          <Styles.LoadingIcon type={buttonType} />
        </Icon>
      ) : (
        <Align gap="4px" alignCenter justify={JustifyType.Center}>
          {icon && <Icon type={buttonType}>{icon}</Icon>}
          {text && <span>{text}</span>}
        </Align>
      )}
    </Styles.Button>
  )
}
