import React, {useState, useEffect}from "react";
import { Button, Table } from "semantic-ui-react";
import organization from "../ethereum/organization";
import web3 from "../ethereum/web3";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const RequestRow = (props)=>{

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [transactionsCount, setTransactionsCount] = useState(0);
    const [transactions, setTransactions] = useState([{}]);
    const {Row, Cell} = Table;
    useEffect(()=>{
        const org = organization(auth.user.contractAddress);
        const fun = async()=>{
            const transactionCount = await org.methods.getTransactionsCount().call();
            setTransactionsCount(transactionCount);
            const transactionss = await Promise.all(
                Array(parseInt(transactionCount)).fill()
                .map((element, index)=>{
                    return org.methods.transactions(index).call();
                })
            )
            setTransactions(transactionss);

        }
        fun();
    }, [])
    const approve = async()=>{
        let credUsed = 0;
        transactions.map((transaction, index) => {
            credUsed += parseFloat(transaction.creditUsedd);
        })
        let credS = credUsed.toString();
        const org = organization(auth.user.contractAddress);
        const accounts = await web3.eth.getAccounts();
        await org.methods.approveTransaction(props.id, credS).send({from: accounts[0]});
        alert("Transaction Approved!!");
        return <Navigate to={`/${auth.user.contractAddress}/approve`} />;
    }
    return(
        <Row
            disabled = {props.transaction.complete}
            positive = {!props.transaction.complete}>
            <Cell>{props.id}</Cell>
            <Cell>{props.transaction.date}</Cell>
            <Cell>{props.transaction.co2}</Cell>
            <Cell>{props.transaction.ch4}</Cell>
            <Cell>{props.transaction.n2o}</Cell>
            <Cell>{props.transaction.hfc}</Cell>
            <Cell>{props.transaction.pfc}</Cell>
            <Cell>{props.transaction.sf6}</Cell>
            <Cell>{props.transaction.creditUsedd}</Cell>
            <Cell>{ props.transaction.complete ? null : (
                <Button color="green" basic onClick={approve}>
                    Approve
                </Button>
                )}
            </Cell>
        </Row>
    )
}

export default RequestRow;