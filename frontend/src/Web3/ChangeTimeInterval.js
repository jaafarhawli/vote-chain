import { isInitialized } from "../Web3Client";
import { init } from "../Web3Client";
import Web3 from 'web3';
import ElectionContract from 'contracts/Election.json';
import { selectedAccount } from "../Web3Client";

// Change election time interval inside the web3 election smart contract
export const changeTimeInterval = async (startTime, endTime, address) => {
    // If no account selected yet await the user to select one
    if(!isInitialized)
    await init();

    let provider = window.ethereum;
    const web3 = new Web3(provider);
    let contract = new web3.eth.Contract(ElectionContract.abi, address);

    return contract.methods.changeTime(startTime, endTime).send({from: selectedAccount});
}