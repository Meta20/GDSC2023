import React, { useEffect, useState } from 'react';
import { addVote, mineBlock, replaceChain } from "../../actions";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { addData } from '../../actions';
import image from './20944298.jpg';
import web3 from "../../ethereum/web3";
// const HDWalletProvider = require("@truffle/hdwallet-provider");  
// const lineBYLine = require('n-readlines');
// const Web3 = require("web3");
// const provider = new HDWalletProvider(
//     "injury more inhale zebra embody hint kid vendor stomach general current attitude",
  
//     "https://goerli.infura.io/v3/d979eb0767c14c719a6eb5ebbae0a608"
    
//   );
//   const web33 = new Web3(provider);
import organization from "../../ethereum/organization";

const OrgForm = () => {
    const [co2, setCo2] = useState("");
    const [ch4, setCh4] = useState("");
    const [n2o, setN2o] = useState("");
    const [hfc, setHfc] = useState("");
    const [pfc, setPfc] = useState("");
    const [sf6, setSf6] = useState("");
    const [date, setDate] = useState("");
    // const [creditUsed, setCreditUsed] = useState("");
    // const [availableCredit, setAvailableCredit] = useState("");

    const auth = useSelector(state => state.auth);
  const block = useSelector(state => state.blockchain);
  
 

  const dispatch = useDispatch();
  
    // const liner = new lineBYLine('./sensor_data.txt');
    // let co2lvl = 0;
 if (!auth.authenticate){
  return <Navigate to={"/signin"} />;
 }


//  const sensor = async()=>{
//     let co2lvl = 0;
//     while(line = liner.next()){
//         let cred = parseFloat(line);
//         if(cred > 70){
//             co2lvl += (cred - 70);

//         }
//     }
//     let sch4 = co2lvl/3;
//     let sn20 = co2lvl/ 25;
//     let shfc = co2lvl/ 100;
//     let spfc = co2lvl/ 500;
//     let ssf6 = co2lvl/ 1000; 
//     let calcCredit = (parseFloat(co2) + (25 * parseFloat(ch4)) + (298 * parseFloat(n2o)) + (1430 * parseFloat(hfc)) + (7390 * parseFloat(pfc)) + (22800 * parseFloat(sf6)))/1000;
//      let calcS = calcCredit.toString();
//      let availCredit = (1000 - calcCredit);
//      let avails = availCredit.toString();
//     //  setAvailableCredit(avails);
//      console.log(avails);
//      const org = organization(auth.user.contractAddress);
//      const accounts = await web33.eth.getAccounts();
//      await org.methods.createTransaction(date, co2, ch4, n2o, hfc, pfc, sf6, calcS, auth.user.contractAddress, avails)
//                       .send({from: accounts[0]});
//  }

//  useEffect(()=>{
//     // setInterval(sensor, 30000);
//  }, []);

 const addDataa = async(e) => {
    console.log("start");
     e.preventDefault();
     let calcCredit = (parseFloat(co2) + (25 * parseFloat(ch4)) + (298 * parseFloat(n2o)) + (1430 * parseFloat(hfc)) + (7390 * parseFloat(pfc)) + (22800 * parseFloat(sf6)))/1000;
     let calcS = calcCredit.toString();
    //  setCreditUsed(calcS);
     console.log(calcS);
     let availCredit = (1000 - calcCredit);
     let avails = availCredit.toString();
    //  setAvailableCredit(avails);
     console.log(avails);
     const org = organization(auth.user.contractAddress);
     const accounts = await web3.eth.getAccounts();
     await org.methods.createTransaction(date, co2, ch4, n2o, hfc, pfc, sf6, calcS, auth.user.contractAddress, avails)
                      .send({from: accounts[0]});
    alert("Transaction Submitted for approval");







    //  const dataInfo = {
    //      "org_id": auth.user._id,
    //       co2,
    //       ch4,
    //       n2o,
    //       hfc,
    //       pfc,
    //       sf6,
    //       date
    //  }
    //  dispatch(replaceChain()).then((result) => {
    //     if (result){
    //       dispatch(addData(dataInfo)).then((resul) => {
    //         if(resul){
    //           dispatch(mineBlock());
    //           alert("Transaction Successful!");
    //         }
    //       })
    //     }
    //   })
    // dispatch(addData(dataInfo));

    
 }
    return (
        <div>
            <section>
                <div className='imgbox'>
                    <img src={image} />
                </div>
            <div class="contentbx">
            <div class="formbx">
                <h2>Org Form</h2>
                
                    <div class="inputbx">
                        <span>CO2 Emission(kg)</span>
                        <input type="text" value={co2} onChange={(e) => setCo2(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <span>CH4 Emission(kg)</span>
                        <input type="text" value={ch4} onChange={(e) => setCh4(e.target.value)} />
                    </div>
                    <div class="inputbx">
                        <span>N2O Emission(kg)</span>
                        <input type="text" value={n2o} onChange={(e) => setN2o(e.target.value)} />
                    </div>
                    <div class="inputbx">
                        <span>HFC Emission(kg)</span>
                        <input type="text" value={hfc} onChange={(e) => setHfc(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <span>PFC Emission(kg)</span>
                        <input type="text" value={pfc} onChange={(e) => setPfc(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <span>SF6 Emission(kg)</span>
                        <input type="text" value={sf6} onChange={(e) => setSf6(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <span>Date</span>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div class="inputbx">
                        <input type="submit" value="ADD"name="" onClick={addDataa}/>
                    </div>
                
            </div>
        </div>
        </section>
        </div>
    )
}

export default OrgForm;
