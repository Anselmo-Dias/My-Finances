import Modal from 'react-modal'
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';


import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, RadioBox, TansactionTypeContainer } from './styles';

interface NewTransactionsModalProps {
    isOpen: boolean;
    onRequestClose: () => void,
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionsModalProps) {

    const { createTransaction } = useTransactions()

   const [title, setTitle] = useState('')
   const [amount, setAmount] = useState(0)
   const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit')

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

       await createTransaction({
            title,
            amount,
            category,
            type
        })

        onRequestClose();
        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')

    }
   
    return (
        
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
        >
            <button type='button' onClick={onRequestClose} className='react-modal-close'>
                <img src={closeImg} alt="botão de fechar o modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Nova Transação</h2>

                <input
                    placeholder='Titulo'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input
                    type='Number'
                    placeholder='Valor'
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TansactionTypeContainer>
                    
                    <RadioBox
                        type='button'
                        isActive={ type === 'deposit'}
                        onClick={() => {setType('deposit'); }}
                        isColors='green'
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>
                            Entradas
                        </span>
                    </RadioBox>

                    <RadioBox
                        type='button'
                        onClick={() => {setType('widthdraw'); }}
                        isActive={ type === 'widthdraw'}
                        isColors='red'
                    >
                        <img src={outcomeImg} alt="Saida" />
                        <span>
                            Saídas
                        </span>
                    </RadioBox>

                </TansactionTypeContainer>

                <input
                    placeholder='Categoria'
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
    </Modal>

    );
}