import styled from "styled-components";

export const TransactionsContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;

    @media (max-width: 576px) {
        margin: 2rem auto 0;
    }
`

export const TableContainer = styled.div`
    max-width: 100vw;
    overflow: auto;
    margin-bottom: 5%;
`

export const TransactionsTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;
    
    td {
        padding: 1.25rem 2rem;
        background: ${props => props.theme["gray-700"]};

        &:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;

            > div {
                display: flex;
                gap: .5rem;
                align-items: center;
                justify-content: center;

                button {
                    background: transparent;
                    cursor: pointer;
                    padding: .25rem .4rem;
                    
                    border: 0;
                    color: ${props => props.theme['gray-900']};

                    &:hover {
                        color: ${props => props.theme['gray-800']};
                        transition: color 0.2s;
                    }
                    

                    &:last-child {
                        color: ${props => props.theme['red-300']};

                        &:hover {
                            color: ${props => props.theme['red-500']};
                            transition: color 0.2s;
                        }
                    }
                }
            }
        }
    }
`
interface PriceHighlightProps {
    variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
    color: ${props => props.variant === 'income' ? props.theme['green-300'] : props.theme['red-300']};
`