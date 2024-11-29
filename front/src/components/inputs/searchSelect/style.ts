// Styled.Content: Container geral
// Styled.InputWrapper: Wrapper do input e label
// Styled.Input: Estilo do input
// Styled.Label: Estilo do label
// Styled.OptionsList: Container para a lista de sugestões
// Styled.Option: Cada item da lista de sugestões
// Styled.NoOptions: Estilo para exibir quando nenhuma sugestão é encontrada

import styled from "styled-components";

export const Content = styled.div`
  position: relative;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input<{ isFocus: boolean }>`
  width: 100%;
  background-color: var(--background-secondary);
  padding: 12px;
  border: 2px solid ${({ isFocus }) => (isFocus ? "var(--primary)" : "#ccc")};
  border-radius: 10px;
  outline: none;
`;

export const Label = styled.label<{ isFocus: boolean }>`
  position: absolute;
  top: ${({ isFocus }) => (isFocus ? "-10px" : "50%")};
  left: 10px;
  font-size: ${({ isFocus }) => (isFocus ? "12px" : "16px")};
  color: #777;
  transition: all 0.2s;
`;

export const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: var(--background-secondary);
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
`;

export const Option = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

export const NoOptions = styled.div`
  padding: 10px;
  color: #999;
  text-align: center;
`;
