import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, {useEffect} from "react";
import Signup from './containers/Signup';
import OrgHome from './containers/OrgHome';
import OrgForm from './containers/OrgForm';
import OrgTrans from './containers/OrgTrans';
import Signin from './containers/Signin';
import web3 from './ethereum/web3';
import organization from './ethereum/organization';
import { connectNodes, getCreditData, getOrgTrans, isUserLoggedIn, sensorData} from "./actions";

import { useDispatch, useSelector } from 'react-redux';
import Approve from './containers/Approve';
// const lineByLine = require('n-readlines');
// import HDWalletProvider from '@truffle/hdwallet-provider';
// import {n-readlines} from 'n-readlines'
// import LineByLine from 'n-readlines';
// import Web3 from 'web3';
function App() {
  const dispatch = useDispatch();
const auth = useSelector(state => state.auth);

  
// const HDWalletProvider = require("@truffle/hdwallet-provider");  
// const lineBYLine = require('n-readlines');
// const Web3 = require("web3");
// const provider = new HDWalletProvider(
//     "injury more inhale zebra embody hint kid vendor stomach general current attitude",
  
//     "https://goerli.infura.io/v3/d979eb0767c14c719a6eb5ebbae0a608"
    
//   );
//   const web33 = new Web3(provider);
useEffect(() => {
  if(!auth.authenticate){
  dispatch(isUserLoggedIn());
}
if(auth.authenticate){

  
  // dispatch(connectNodes());
  // dispatch(getCreditData());
  // const idString = auth.user._id;
  // const lastidString = idString.slice(-5);
  // const o_id = {
  //   "org_id": auth.user._id
  // }
  // dispatch(getOrgTrans(o_id));
  

}
}, [auth.authenticate]);
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/signup" exact element={<Signup/>}/>
      <Route path="/signin" exact element={<Signin/>}/>
      <Route path="/:address/dashboard" exact element={<OrgHome/>}/>
      <Route path="/:address/orgform" exact element={<OrgForm/>}/>
      <Route path="/:address/approve" exact element={<Approve/>}/>
      <Route path="/orgtrans" exact element={<OrgTrans/>}/>


    </Routes>
    {/* <Signin/> */}
    {/* <Signup/> */}
    {/* <OrgHome/> */}
    {/* <OrgForm/> */}
    {/* <OrgTrans/> */}

    </>
  );
}

export default App;
