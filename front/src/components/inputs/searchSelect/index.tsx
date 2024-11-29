import React, { useState, useEffect, ChangeEvent, FocusEvent } from "react"
import * as Styled from "./style"
import { InputComponentProps } from "./interfaces"
import { getDrivers } from "../../../service/api/shopper/rideService"

interface Option {
  label: string // id do motorista
  value: string // nome do motorista
}

const data = [
  { label: "text1", value: "text1" },
  { label: "text2", value: "text2" },
  { label: "text3", value: "text3" },
  { label: "text4", value: "text4" },
]

interface SearchSelectProps extends InputComponentProps {
  options?: Option[] // Lista de opções para exibir
}

export function SearchSelect({
  text,
  value: propValue,
  onChange,
  placeholder = "Buscar",
  name = "Select",
  options = data,
}: SearchSelectProps) {
  const [value, setValue] = useState<string>(propValue || "") // Estado interno para o valor
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false)
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([])
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [drivers, setDrivers] = useState<Option[]>([]) // Alterado para armazenar motoristas como opções

  useEffect(() => {
    // Sincroniza o estado interno com o valor da `prop`
    setValue(propValue || "")
  }, [propValue])

  useEffect(() => {
    // Chama a função handleDrivers assim que o componente for montado
    handleDrivers("") // Passando uma string vazia para carregar todos os motoristas ao iniciar
  }, []) // O array vazio faz com que este efeito só seja chamado uma vez, quando o componente for montado

  useEffect(() => {
    setIsInputFocus(!!value)
  }, [value])

  const handleInputFocus = () => {
    setIsInputFocus(true)
    setShowOptions(true) // Exibe as opções ao focar no campo
  }

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    // Aguarda para permitir a seleção de uma opção antes de ocultar
    setTimeout(() => {
      setShowOptions(false)
      if (!value) setIsInputFocus(false) // Baixa o rótulo se o valor estiver vazio
    }, 200)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue(inputValue) // Atualiza o estado interno
    onChange?.(event) // Notifica o componente pai

    // Filtra as opções com base no texto digitado
    if (inputValue) {
      handleDrivers(inputValue)
    } else {
      setFilteredOptions([]) // Limpa as opções quando não há valor
      setShowOptions(false)
    }
  }

  const handleOptionSelect = (option: Option) => {
    setValue(option.value) // Atualiza o valor com o nome do motorista (valor)
    onChange?.({
      target: { value: option.label },
    } as ChangeEvent<HTMLInputElement>) // Passa apenas o 'label' (id do motorista) para o onChange
    setShowOptions(false) // Oculta as opções após selecionar
  }

  const handleDrivers = async (inputValue: string) => {
    try {
      const response = await getDrivers(inputValue) // Chama o serviço para buscar motoristas
      const options = response.map((driver: any) => ({
        label: driver.id.toString(), // 'id' como label
        value: driver.nome, // 'nome' como value
      }))
      setDrivers(options) // Atualiza os motoristas
      setFilteredOptions(options) // Atualiza as opções filtradas
      setShowOptions(true) // Exibe as opções filtradas
    } catch (error: any) {
      // Handle error if needed
    }
  }

  return (
    <Styled.Content>
      <Styled.InputWrapper>
        <Styled.Input
          required
          id={text}
          value={value} // Vincula o valor ao estado interno
          name={name || text}
          autoComplete="off"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          isFocus={isInputFocus}
          placeholder={placeholder}
        />
        <Styled.Label htmlFor={text} isFocus={isInputFocus}>
          {text}
        </Styled.Label>
      </Styled.InputWrapper>
      {showOptions && (
        <Styled.OptionsList>
          {filteredOptions.map((option) => (
            <Styled.Option
              key={option.label} // Usando 'label' como chave
              onClick={() => handleOptionSelect(option)}
            >
              {option.value} {/* Exibe o nome do motorista */}
            </Styled.Option>
          ))}
          {filteredOptions.length === 0 && (
            <Styled.NoOptions>Nenhuma opção encontrada</Styled.NoOptions>
          )}
        </Styled.OptionsList>
      )}
    </Styled.Content>
  )
}
