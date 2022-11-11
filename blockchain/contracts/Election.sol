// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Election {

    struct Voter {
        bool voted;  
        address delegate;
        uint vote;   
        bool hasAccess;
    }

    struct Candidate {
        string name;  
        string partyName;   
        uint voteCount; 
    }
    
}