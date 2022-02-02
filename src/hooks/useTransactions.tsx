import {createContext, useEffect, useState, ReactNode, useContext} from 'react'
import { api } from '../services/api'



interface Transaction {
    id: string,
    title: string,
    type: string,
    category: string,
    amount: number,
    creatAt: number,
}

type transactionInput = Omit<Transaction, 'id' | 'creatAt' >;

interface TransactionsProviderProps {
    children: ReactNode;
}


interface TransactionContextData {
    transactions: Transaction[],
    createTransaction: (transaction: transactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
    
    {} as TransactionContextData
    
    );

export function TransactionsProvider({children}: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

   async function createTransaction(transactionInput: transactionInput ) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            creatAt: new Date(),
        })
        const { transaction } = response.data

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }

    return ( 
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext)

    return context;
}