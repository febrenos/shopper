import styled from 'styled-components';

// Tipo para propriedades do Tab
interface TabProps {
  isActive: boolean; // Indica se a aba está ativa
}

export const All = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const NavTab = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--background-secondary);
  padding: 6px;
  border-radius: 10px;
  user-select: none;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const Tab = styled.a<TabProps>`
  text-decoration-thickness: 3px;
  font-weight: 600;
  color: ${(props) => (props.isActive ? 'var(--primary)' : 'var(--text-secondary)')};
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => (props.isActive ? 'var(--secondary)' : 'transparent')};
  cursor: pointer;
`;

export const Separator = styled.div`
  height: 15px;
  width: 2px;
  opacity: 0.3;
  background-color: var(--text-secondary);
  border-radius: 20px;
  align-self: center;
  margin: 0 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;
