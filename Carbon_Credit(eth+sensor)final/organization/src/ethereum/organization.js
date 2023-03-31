import web3 from "./web3";
import Organization from "./build/Organization.json";
 
const organization = (address) => {
  return new web3.eth.Contract(Organization.abi, address);
};
export default organization;