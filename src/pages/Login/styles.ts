import styled from "styled-components";

export const LoginContainer = styled.section`
  background-color: ${props => props.theme['gray-700']};
  border-radius: 6px;
  position: absolute;
  padding: 20px;
  min-width: 350px;
  max-width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  img {
    width: 70%;
  }

  h1 {
    width: 100%;
    text-align: start;
    font-size: 3rem;
    margin-top: .5rem;
  }
`;

export const StyledForm = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 6px;

    > p {
      font-size: 12px;
      color: ${props => props.theme['red-300']};
    }
  }

  input, select {
    border-radius: 6px;
    width: 100%;
    border: 0;
    background: ${props => props.theme['gray-900']};
    color: ${props => props.theme['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${props => props.theme['gray-500']};
    }
  }

  button[type="submit"] {
    height: 58px;
    border: 0;
    background: ${props => props.theme['green-500']};
    color: ${props => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    margin-top: .75rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${props => props.theme['green-700']};
      transition: background-color 0.2s;
    }
  }

  button[type="button"] {
    background: transparent;
    border: 0;
    cursor: pointer;
    color: ${props => props.theme['green-500']};
  }
`;
