import { ButtonContainer, HeaderContainer, HeaderContent, StyledButton } from "./styles";
import logoImg from '../../../public/assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from "../NewTransactionModal";
import { NewCategoryModal } from "../NewCategoryModal";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/TransactionsContext";

export function Header() {

    const transactionModalOpen = useContextSelector(TransactionsContext, (context) => {
        return context.transactionModalOpen
    })

    const setTransactionModalOpen = useContextSelector(TransactionsContext, (context) => {
        return context.setTransactionModalOpen
    })

    const setEditingTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.setEditingTransaction
    })

    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt="Logo ClearCash" />

                <ButtonContainer>
                    <Dialog.Root open={transactionModalOpen} onOpenChange={setTransactionModalOpen}>
                        <Dialog.Trigger asChild>
                            <StyledButton onClick={() => setEditingTransaction(null)}>Nova transação</StyledButton>
                        </Dialog.Trigger>

                        <NewTransactionModal />

                    </Dialog.Root>

                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <StyledButton>Categorias</StyledButton>
                        </Dialog.Trigger>

                        <NewCategoryModal />
                    </Dialog.Root>
                </ButtonContainer>

            </HeaderContent>
        </HeaderContainer>
    )
}