import React, { createFactory, useEffect, useState } from 'react';
import "./style.css";
import { Navigate } from "react-router-dom";
import factory from "../../ethereum/factory";
import {Card, Button} from "semantic-ui-react";
import organization from "../../ethereum/organization";
import { sensorData } from '../../actions';
import web3 from '../../ethereum/web3';

import { useDispatch, useSelector } from "react-redux";

const OrgHome = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [manager, setManager] = useState("");
    const [allotedCredit, setAllotedCredit] = useState("");
    const [creditUsed, setCreditUsed] = useState("");
    const [pendingApprovals, setPendingApprovals] = useState(0);
   
    console.log(props);
    const block = useSelector((state) => state.blockchain);
    if (!auth.authenticate) {
        return <Navigate to={"/signin"} />;
      }
    useEffect(()=> {
        const org = organization(auth.user.contractAddress);
        const fun = async()=>{

            const details = await org.methods.getBalance().call();
            setAllotedCredit(details[0]);
            setCreditUsed(details[1]);
            setManager(details[2]);
            setPendingApprovals(details[3]);
        }
        fun();
    },[]);
    const sensorr = useSelector(state => state.sensor);
const sensor = async()=>{
  
  dispatch(sensorData());
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = yyyy + '/' + mm + '/' + dd;
      
      const org = organization(auth.user.contractAddress);
      const accounts = await web3.eth.getAccounts();
      console.log(sensorr.co2);
      await org.methods.createTransaction(today, sensorr.co2, sensorr.ch4, sensorr.n2o, sensorr.hfc, sensorr.pfc, sensorr.sf6, sensorr.calculated, auth.user.contractAddress, sensorr.available)
                       .send({from: accounts[0]});
    alert("Transaction submitted for approval!")
    }
    // const items = [
    //     {
    //         header: "Manager",
    //         description: manager,
    //         fluid: true
    //     },
    //     {
    //         header: "Contract",
    //         description: auth.user.contractAddress,
    //         fluid: true
    //     },
    //     {
    //         header: "Pending Approvals",
    //         description: pendingApprovals,
    //         fluid: true
    //     }
    // ];
      const renderDetails = () => {
        // const org = organization(auth.user.contractAddress);
        // const details = await org.methods.getBalance().call();
        console.log(manager);
        const items = [
            {
                header: "Manager",
                description: manager,
                style: {overflowWrap: 'break-word'}
                // fluid: true
            },
            {
                header: "Contract",
                description: auth.user.contractAddress,
                style: {overflowWrap: 'break-word'}
                // fluid: true
            },
            {
                header: "Pending Approvals",
                description: pendingApprovals,
                style: {overflowWrap: 'break-word'}
                // fluid: true
            }
        ];
        return <Card.Group style={{marginLeft: "50px"}} items={items}/>
      }

    return (
        <div>
            <div class="cont" >
            <div class="container">
                
                <h2 class="orgName" style={{paddingBottom: "40px", marginTop: "-35px", color: "grey"}}>Organization Name: {auth.user.name}</h2>
                <Button primary onClick={sensor} style={{position: "absolute", marginLeft: '1015px', marginTop: '60px'}}>Record Sensor</Button>
                {/* <h3 class="orgId" style={{paddingBottom: "40px", color: "grey"}}>Organization Contract: {auth.user.contractAddress}</h3> */}
                <hr style={{marginBottom: '30px'}}/>
                {renderDetails()}
                
                {/* <Card.Group items={items}/> */}
                <div class="box">
                    <div class="icon"><i class="fas fa-address-card"></i>
                    </div>
                    <div class="content">
                        <h1>Card Alloted: {allotedCredit}</h1>
                        {/* <h2></h2> */}
                    </div>
                </div>
                <div class="box">
                    <div class="icon"><i class="fas fa-credit-card"></i>
                    </div>
                    <div class="content">
                        <h1>Availabe Credit: {parseFloat(allotedCredit) - parseFloat(creditUsed)}</h1>
                    </div>
                </div>
                <div class="box">
                    <div class="icon"><i class="fas fa-clipboard-check"></i></div>
                    <div class="content">
                        <h1>Credit Used: {creditUsed}</h1>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

// OrgHome.getInitialProps = async(props) => {
//     console.log(props.query.address);
//     const org = organization(props.query.address);
//     const details = await org.methods.getBalance().call();
//     return {
//         allotedCredit: details[0],
//         creditUsed: details[1],
//         manager: details[2],
//         pendingApprovals: details[3]
//     };


export default OrgHome;
