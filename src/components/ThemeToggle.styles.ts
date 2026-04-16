import styled from 'styled-components';

export const ToggleButton = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;
  width: 3.5rem;
  height: 3.5rem;
  border: none;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.foreground};
  color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }
`;