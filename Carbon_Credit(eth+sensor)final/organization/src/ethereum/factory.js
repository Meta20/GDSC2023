import web3 from "./web3";
import OrganizationFactory from "./build/OrganizationFactory.json";
 
const instance = new web3.eth.Contract(
  OrganizationFactory.abi,
  "0xa58424C1306633716898dce3e16ba4739BE6Ea21"
);
 
export default instance;