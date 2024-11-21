import styled from "styled-components";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from "@radix-ui/react-tabs";

export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
    min-width: 40rem;
    max-width: 90%;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background: ${props => props.theme['gray-800']};

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 576px) {
        min-width: 90%;
        padding: 1.5rem 2rem;
    }
`

export const FormRegisterCategory = styled.form`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
        border-radius: 6px;
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
        margin-top: 1.5rem;
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
`

export const CloseButton = styled(Dialog.Close)`
    position: absolute;
    background: transparent;
    border: 0;
    top: 1.5rem;
    right: 1.5rem;
    line-height: 0;
    cursor: pointer;
    color: ${props => props.theme['gray-500']};
`

export const TransactionType = styled(RadioGroup.Root)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 0.5rem;

    @media (max-width: 576px) {
        display: flex;
        flex-direction: column;
    }
`

interface TransactionTypeButtonProps {
    variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(RadioGroup.Item) <TransactionTypeButtonProps>`
    background: ${props => props.theme['gray-700']};
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    border: 0;
    color: ${props => props.theme['gray-300']};

    svg {
        color: ${props => props.variant === 'income' ? props.theme['green-300'] : props.theme['red-300']};
    }

    &[data-state="unchecked"]:hover {
        background: ${props => props.theme['gray-600']};
        transition: background-color 0.2s;
    }

    &[data-state='checked'] {
        background: ${props => props.variant === 'income' ? props.theme['green-500'] : props.theme['red-500']};
        color: ${props => props.theme.white};
        

        svg {
            color: ${props => props.theme.white};
        }
    }
`

export const TabsRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  margin: 5px;
`;

export const TabsList = styled(Tabs.List)`
  flex-shrink: 0;
  display: flex;
  border-bottom: 1px solid ${props => props.theme['green-500']};
`;

export const TabsTrigger = styled(Tabs.Trigger)`
  background: transparent;
  font-family: inherit;
  padding: 0 20px;
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  line-height: 1;
  color: ${props => props.theme['gray-600']};
  user-select: none;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme['green-500']};
  }

  &[data-state="active"] {
    color: ${props => props.theme['green-500']};
    box-shadow: inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor;
  }

  &:focus {
    position: relative;
    box-shadow: 0 0 0 2px ${props => props.theme['green-500']};
  }

  &:first-child {
    border-top-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px;
  }
`;

export const TabsContent = styled(Tabs.Content)`
  flex-grow: 1;
  padding: 20px 10px 10px 10px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  outline: none;
`;

export const CancelButton = styled.button`
    height: 58px;
    border: 0;
    background: ${props => props.theme['red-500']};
    cursor: pointer;
    color: ${props => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &:hover {
        background: ${props => props.theme['red-700']};
        transition: background-color all 0.2s;
    }
`

export const CategoriesTable = styled.table`
    width: 100%;
    overflow-x: auto;
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

interface StyledTypeCategoryProps {
    variant: 'income' | 'outcome'
}

export const StyledTypeCategory = styled.div<StyledTypeCategoryProps>`

    display: flex;
    align-items: center;
    gap: .5rem;

    svg {
        color: ${props => props.variant === 'income' ? props.theme['green-300'] : props.theme['red-300']};
    }
`
