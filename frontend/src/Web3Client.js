import Web3 from 'web3';
import ElectionContract from 'contracts/Election.json';

let selectedAccount;
let isInitialized = false;

export const init = async () => {
    let provider = window.ethereum;
	  if(typeof provider !== 'undefined') {
		  provider
		  	.request({method: 'eth_requestAccounts' })
			.then((accounts) => {
                selectedAccount = accounts[0];
				console.log(`Selected account is ${selectedAccount}`);
			})
			.catch((error) => {
				console.log(error);
				return;
			})

		window.ethereum.on('accountsChanged', function (accounts) {
			selectedAccount = accounts[0];
			console.log(`Selected account changed to ${selectedAccount}`);
		})

		isInitialized = true;
	  }

} 

export const addCandidates = async (candidates, parties, address) => {
	if(!isInitialized)
	await init();

	let provider = window.ethereum;
	const web3 = new Web3(provider);
	let contract = new web3.eth.Contract(ElectionContract.abi, address);

	return contract.methods.addCandidates(candidates, parties).send({from: selectedAccount});
}

export const createElectionContract = async (start_time, end_time) => {
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


	export const viewCandidates = async (address) => {
		if(!isInitialized)
		await init();
	
		let provider = window.ethereum;
		const web3 = new Web3(provider);
		let contract = new web3.eth.Contract(ElectionContract.abi, address);

		return contract.methods.results().call();
	}

	export const addVoterToBlockchain = async (voter_addresses, address) => {
		if(!isInitialized)
		await init();
	
		let provider = window.ethereum;
		const web3 = new Web3(provider);
		let contract = new web3.eth.Contract(ElectionContract.abi, address);

		return contract.methods.giveRightToVote(voter_addresses).send({from: selectedAccount});
	}

	export const voteCandidate = async (address, candidate_id) => {
		if(!isInitialized)
		await init();
	
		let provider = window.ethereum;
		const web3 = new Web3(provider);
		let contract = new web3.eth.Contract(ElectionContract.abi, address);
	
		return contract.methods.vote(candidate_id).send({from: selectedAccount});
	}