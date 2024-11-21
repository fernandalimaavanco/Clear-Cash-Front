import styled from 'styled-components';

export const AlertContainer = styled.div<{ type: string }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${({ type }) =>
        type === 'success'
            ? '#28a745'
            : type === 'error'
                ? '#dc3545'
                : '#ffc107'};
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  z-index: 9999;
  display: flex;
  align-items: center;
  max-width: 300px;
  width: 100%;

  & > button {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-left: 15px;
  }
`
