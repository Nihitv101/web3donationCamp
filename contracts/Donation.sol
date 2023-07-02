// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


// Donation App:

contract Donorbox{
    struct Donor{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    Donor [] public donors;


    function donateUs(string memory name, string memory message) public payable {
        require(msg.value > 0 , "Please pay greater than 0 ether");
        owner.transfer(msg.value);
        donors.push(Donor(name, message, block.timestamp, msg.sender));


    }


    // get donors:

    function getDonors() public view  returns (Donor[] memory){
        return donors;
    }


}