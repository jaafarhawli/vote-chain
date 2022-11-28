import Web3 from 'web3';
import ElectionContract from 'contracts/Election.json';
import { selectedAccount } from "../Web3Client";

// Create a new election contract and add it to the blockchain
export const createElectionContract = async (start_time, end_time) => {
	// If no account selected yet await the user to select one
    if(!isInitialized)
    await init();
	
	let account = selectedAccount;
	let provider = window.ethereum;
	const web3 = new Web3(provider);
	let deploy_contract = new web3.eth.Contract(ElectionContract.abi);

	let payload = {
    data: ElectionContract.bytecode,
    arguments: [start_time, end_time]
	}

	let parameter = {
    from: account,
    gas: 6721975,
    gasPrice: 20000000000,
	}

    return deploy_contract.deploy(payload).send(parameter, (err, transactionHash) => {
        console.log('Transaction Hash :', transactionHash);
    }).on('confirmation', () => {}).then((newContractInstance) => 
		newContractInstance._address
	)}