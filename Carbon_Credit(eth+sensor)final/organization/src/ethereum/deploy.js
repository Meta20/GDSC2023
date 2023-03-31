const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/OrganizationFactory.json");
 
const provider = new HDWalletProvider(
  "injury more inhale zebra embody hint kid vendor stomach general current attitude",

  "https://goerli.infura.io/v3/d979eb0767c14c719a6eb5ebbae0a608"
  
);
const web3 = new Web3(provider);
 
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 
  console.log("Attempting to deploy from account", accounts[0]);
 
  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: "14000000", from: accounts[0] }); 
 
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();