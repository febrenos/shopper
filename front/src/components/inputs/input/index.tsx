import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
} from "react"
import * as Styled from "./style"
import { InputComponentProps, InputProps } from "./interfaces"

export function Input({
  text,
  type = "text", // Default type to 'text'
  size,
  value,
  onChange,
  placeholder,
  onKeyDown,
  name,
  error,
  isFocus = false, // Default to false
  background
}: InputComponentProps) {
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false)

  useEffect(() => {
    if (value || type === "date") {
      setIsInputFocus(true)
    } else {
      setIsInputFocus(false)
    }
  }, [value, type])

  const handleInputBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isInputFocus && event.target.value === "") {
      setIsInputFocus(false)
    }
    if (type === "date" && event.target.value === "") {
      setIsInputFocus(true)
    }
  }

  return (
    <Styled.Content>
      {type === "textarea" ? (
        <>
          <Styled.Textarea
            required
            size={size}
            id={text}
            value={value}
            error={error}
            name={name || text}
            autoComplete="off"
            onFocus={() => setIsInputFocus(true)}
            onBlur={handleInputBlur}
            onChange={onChange}
            isFocus={isInputFocus}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            background={background}
          />
          <Styled.Label htmlFor={text} isFocus={isInputFocus}>
            {text}
          </Styled.Label>
        </>
      ) : (
        <>
          <Styled.Input
            required
            type={type}
            size={size}
            id={text}
            value={value}
            error={error}
            name={name || text}
            autoComplete="off"
            onFocus={() => setIsInputFocus(true)}
            onBlur={handleInputBlur}
            onChange={onChange}
            isFocus={isInputFocus}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            background={background}
          />
          <Styled.Label htmlFor={text} isFocus={isInputFocus}>
            {text}
          </Styled.Label>
        </>
      )}
    </Styled.Content>
  )
}
