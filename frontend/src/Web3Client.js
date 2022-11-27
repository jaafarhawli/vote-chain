import Web3 from 'web3';
import ElectionContract from 'contracts/Election.json';

export let selectedAccount;
export let isInitialized = false;

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

	export const viewTimeInterval = async (address) => {
		if(!isInitialized)
		await init();
	
		let provider = window.ethereum;
		const web3 = new Web3(provider);
		let contract = new web3.eth.Contract(ElectionContract.abi, address);

		return contract.methods.viewTimeInterval().call();
	}

	export const launchElection = async (address) => {
		if(!isInitialized)
		await init();
	
		let provider = window.ethereum;
		const web3 = new Web3(provider);
		let contract = new web3.eth.Contract(ElectionContract.abi, address);
	
		return contract.methods.launchElection().send({from: selectedAccount});
	}

	export const checkIfLaunched = async (address) => {
		if(!isInitialized)
		await init();
	
		let provider = window.ethereum;
		const web3 = new Web3(provider);
		let contract = new web3.eth.Contract(ElectionContract.abi, address);

		return contract.methods.checkIfLaunched().call();
	}
