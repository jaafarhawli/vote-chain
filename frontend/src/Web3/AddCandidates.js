import { isInitialized } from "../Web3Client";
import { init } from "../Web3Client";
import Web3 from 'web3';
import ElectionContract from 'contracts/Election.json';
import { selectedAccount } from "../Web3Client";

export const addCandidates = async (candidates, parties, address) => {
	if(!isInitialized)
	await init();

	let provider = window.ethereum;
	const web3 = new Web3(provider);
	let contract = new web3.eth.Contract(ElectionContract.abi, address);

	return contract.methods.addCandidates(candidates, parties).send({from: selectedAccount});
}