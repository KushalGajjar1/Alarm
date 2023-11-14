// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Alarm {

    address owner;
    uint256 public weekTime = 7;
    mapping(address => bool[7]) public wakeUpStatus;
    mapping(address => uint256) public amountDeposited;
    mapping(address => uint256) public startTime;
    mapping(address => uint256) public wakeUpTime;

    constructor() payable {
        owner = msg.sender;
    }

    function setDetails(uint256 time) public payable {
        startTime[msg.sender] = time;
        amountDeposited[msg.sender] = msg.value;
        wakeUpTime[msg.sender] = time;
    }

    function balanceSC() view public returns(uint256) {
        return address(this).balance;
    }

    function getTime() view public returns(uint256) {
        return block.timestamp;
    }

    function recordWakeUpStatus() public {
        wakeUpStatus[msg.sender][(block.timestamp-startTime[msg.sender])/1 days] = true;
    }

    function getDay() view public returns(uint256) {
        return (block.timestamp-startTime[msg.sender])/1 days;
    }

    function getAmountDeposited() view public returns(uint256) {
        return amountDeposited[msg.sender];
    }

    function weekCompleted(address addr) view  public returns(bool) {
        for(uint i=0; i<wakeUpStatus[addr].length; i++){
            if(wakeUpStatus[addr][i] == false){
                return false;
            }
        }
        return true;
    }

    function checkCompletion() public {
        if(getDay() >= 7 && weekCompleted(msg.sender)){
            payable (msg.sender).transfer(amountDeposited[msg.sender]);
        }
    }

}