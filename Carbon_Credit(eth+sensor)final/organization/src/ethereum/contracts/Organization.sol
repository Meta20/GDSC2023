// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract OrganizationFactory {
    address public newContract;
    address payable[] public deployedOrganizations;
    function createOrg(string memory minimum) public {
        address newOrg = address(new Organization(minimum, msg.sender));
        newContract = newOrg;
        deployedOrganizations.push(payable(newOrg));
        
    }

    function getDeployedOrganizations() public view returns(address payable[] memory){
        return deployedOrganizations;  
    }
}
contract Organization {
    struct Transaction {
        string date;
        string co2;
        string ch4;
        string n2o;
        string hfc;
        string pfc;
        string sf6;
        string creditUsedd;
        string availableCredit;
        address org;
        bool complete;
    }

    Transaction[] public transactions;
    Transaction[] public approvedTransactions;
    address public manager;
    string public allotedCredit;
    string public creditUsed;
    // string public availableCreditt;
    uint pendingApprovals;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    } 
    constructor (string memory alloted, address creator) {
        manager = creator;
        allotedCredit = alloted;
    }

    function createTransaction(string memory date, string memory co2, string memory ch4, string memory n2o, string memory hfc, string memory pfc, string memory sf6, string memory creditUsedd, address org, string memory availableCredit) public restricted {
        Transaction storage newTransaction = transactions.push();
        newTransaction.date = date;
        newTransaction.co2 = co2;
        newTransaction.ch4 = ch4;
        newTransaction.n2o = n2o;
        newTransaction.hfc = hfc;
        newTransaction.pfc = pfc;
        newTransaction.sf6 = sf6;
        newTransaction.creditUsedd = creditUsedd;
        newTransaction.complete = false;
        newTransaction.org = org;
        newTransaction.availableCredit = availableCredit;
        pendingApprovals += 1;
    }

    function approveTransaction(uint index, string memory creditUseddd) public payable {
        Transaction storage transaction = transactions[index];
        require(!transaction.complete);
        creditUsed = creditUseddd;
        transaction.complete = true;
        approvedTransactions.push(transaction);
        pendingApprovals -= 1;
    }

    function getBalance() public view returns(string memory, string memory, address, uint) {
        return (
            allotedCredit,
            creditUsed,
            manager,
            pendingApprovals
            
        );
    }

    function getTransactionsCount() public view returns (uint) {
        return transactions.length;
    }
    function getApprovedTransactionCount() public view returns (uint){
        return approvedTransactions.length;
    }
}