import React, { useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import organization from "../../ethereum/organization";
import { useDispatch, useSelector } from "react-redux";
import RequestRow from "../../components/RequestRow";
import { Navigate } from "react-router-dom";

const Approve = ()=>{
    const auth = useSelector((state) => state.auth);

    const {Header, Row, HeaderCell, Body} = Table;
    const [transactionsCount, setTransactionsCount] = useState(0);
    const [transactions, setTransactions] = useState([{}]);
    if (!auth.authenticate) {
        return <Navigate to={"/signin"} />;
      }
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
    console.log(transactions);
    const renderRow = ()=> {
        // const org = organization(auth.user.contractAddress);
        
        //     const transactionCount = await org.methods.getTransactionsCount().call();
        //     setTransactionsCount(transactionCount);
        //     const transactions = await Promise.all(
        //         Array(parseInt(transactionCount)).fill()
        //         .map((element, index)=>{
        //             return org.methods.transactions(index).call();
        //         })
        //     )
            return transactions.map((transaction, index)=>{
                return(
                    <RequestRow
                    key ={index}
                    id = {index}
                    transaction = {transaction}/>

                );
            });
    }

    return(
        <div>
            <h3>Pending Transactions</h3>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Date</HeaderCell>
                        <HeaderCell>CO2</HeaderCell>
                        <HeaderCell>CH4</HeaderCell>
                        <HeaderCell>N2O</HeaderCell>
                        <HeaderCell>HFC</HeaderCell>
                        <HeaderCell>PFC</HeaderCell>
                        <HeaderCell>SF6</HeaderCell>
                        <HeaderCell>Calculated Credit</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {renderRow()}
                </Body>
            </Table>
        </div>
    )
}

export default Approve;