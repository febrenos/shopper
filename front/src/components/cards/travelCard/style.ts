import styled from "styled-components"

export const Card = styled.div<{ isBorderActive?: boolean }>`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  height: fit-content;
  padding: 10px;
  gap: 5px;
  background-color: var(--background-primary);
  box-shadow: var(--shadow-card);
  border-radius: 10px;
  border: ${(props) =>
    props.isBorderActive
      ? "2px solid var(--primary)"
      : "2px solid var(--background-primary)"};
`

export const Gap = styled.div`
  display: flex;
  gap: 10px;
`

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ImgDriver = styled.img`
  max-width: 50px;
  max-height: 50px;
  width: 100%;
  height: auto;
  border-radius: 50%;
`

export const Flex = styled.div`
  display: flex;
  gap: 5px;
  align-items: baseline;
`

export const Bold = styled.p`
  font-weight: 700;
  color: var(--text-primary);
  font-size: 15px;
`

export const Text = styled.p`
  font-weight: 500;
  color: var(--text-primary);
  font-size: 15px;
`

export const Description = styled.p`
  font-weight: 600;
  color: var(--text-tertiary);
  font-size: 15px;
`
