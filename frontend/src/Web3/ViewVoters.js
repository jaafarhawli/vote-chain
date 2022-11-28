import { isInitialized } from "../Web3Client";
import { init } from "../Web3Client";
import Web3 from 'web3';
import ElectionContract from 'contracts/Election.json';

// View elections voters addresses list from web3
export const viewVoters = async (address) => {
	// If no account selected yet await the user to select one
	if(!isInitialized)
	await init();

	let provider = window.ethereum;
	const web3 = new Web3(provider);
	let contract = new web3.eth.Contract(ElectionContract.abi, address);
	return contract.methods.viewVoters().call();
}