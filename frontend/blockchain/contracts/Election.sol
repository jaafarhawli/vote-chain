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

    address public admin;

    uint public startTime;
    uint public endTime;
    uint public votersNumber = 0;
    uint public votedVotersNumber = 0;

    mapping(address => Voter) public voters;

    Candidate[] public candidates;

    constructor(uint _startTime,uint _endTime) {
        admin = msg.sender;
        startTime = _startTime;
        endTime = _endTime;
    }

    function addCandidates(string[] calldata candidatesList, string[] calldata candidateParty) external {
        require(
            block.timestamp < startTime,
            "Can't add candidate after election starts."
        );
        
        require(
            msg.sender == admin,
            "Only admin can add candidates."
        );
        
        for (uint i = 0; i < candidatesList.length; i++) {
            candidates.push(Candidate({
                name: candidatesList[i],
                partyName: candidateParty[i],
                voteCount: 0
            }));
        }
    }

    function giveRightToVote(address[] calldata voterAddresses) external {
        require(
            block.timestamp < startTime,
            "Can't add voter after election starts."
        );
       
        require(
            msg.sender == admin,
            "Only admin can give right to vote."
        );

        for (uint p = 0; p < voterAddresses.length; p++) {
            if (voters[voterAddresses[p]].hasAccess == false) {
                voters[voterAddresses[p]].hasAccess = true;
            }
        }
        votersNumber+=voterAddresses.length;
    }

    function vote(uint candidate) external {
        Voter storage sender = voters[msg.sender];
        require(
            block.timestamp > startTime && block.timestamp < endTime,
            "Can't vote outside the election interval."
        );
        require(!sender.voted, "Already voted.");
        require(sender.hasAccess, "No access.");
        sender.voted = true;
        sender.vote = candidate;
        candidates[candidate].voteCount++;
        votedVotersNumber++;
    }

    function results() public view returns (Candidate[] memory) {
        return candidates;
    }
    
    function viewVoters() public view returns (uint[2] memory) {
        return [votedVotersNumber, votersNumber-votedVotersNumber ];
    }
  
}