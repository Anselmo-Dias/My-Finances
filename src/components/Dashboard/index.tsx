import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";
import { Container } from "./styles";


export function Dasboard() {
    return(
        <Container>
            <Summary/>
           < TransactionsTable/>
        </Container>
    );
}