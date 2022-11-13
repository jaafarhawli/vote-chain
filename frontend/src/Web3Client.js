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

		const web3 = new Web3(provider);

		isInitialized = true;
	  }

} 

export const addCandidate = async (address) => {
	if(!isInitialized)
	await init();

	let provider = window.ethereum;
	const web3 = new Web3(provider);
	let contract = new web3.eth.Contract(ElectionContract.abi, address);

	return contract.methods.addCandidates(["mbappe"], ["france"]).send({from: selectedAccount});
}

export const createElectionContract = async () => {
	let account = selectedAccount;
	let provider = window.ethereum;
	const web3 = new Web3(provider);
	let deploy_contract = new web3.eth.Contract(ElectionContract.abi);

	let payload = {
    data: ElectionContract.bytecode,
    arguments: [1698239079, 1699239079]
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
        // {console.log('Deployed Contract Address : ', newContractInstance._address);}
	)}


	export const viewCandidates = async (address) => {
		if(!isInitialized)
		await init();
	
		let provider = window.ethereum;
		const web3 = new Web3(provider);
		let contract = new web3.eth.Contract(ElectionContract.abi, address);

		return contract.methods.results().call();
	}

	export const addVoterToBlockchain = async (address, voter_addresses) => {
		if(!isInitialized)
		await init();
	
		let provider = window.ethereum;
		const web3 = new Web3(provider);
		let contract = new web3.eth.Contract(ElectionContract.abi, address);

		return contract.methods.giveRightToVote(voter_addresses).send({from: selectedAccount});
	}