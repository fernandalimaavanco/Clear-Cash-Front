import styled from "styled-components";


export const HeaderContainer = styled.header`
    background: ${props => props.theme['gray-900']};
    padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 1.5rem;

    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: space-between;
    align-items: center;

    img {
        width: 250px;
    }

    @media (max-width: 576px) {
        justify-content: center;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-self: end;
    gap: 1rem;
`

export const StyledButton = styled.button`
    height: 50px;
    border: 0;
    background: ${props => props.theme["green-500"]};
    color: ${props => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background: ${props => props.theme['green-700']};
        transition: background-color 0.2s;
    }
`