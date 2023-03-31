const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");
 
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);
 
const organizationPath = path.resolve(__dirname, "contracts", "Organization.sol");
const source = fs.readFileSync(organizationPath, "utf8");
 
const input = {
  language: "Solidity",
  sources: {
    "Organization.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
 
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Organization.sol"
];
 
fs.ensureDirSync(buildPath);
 
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}