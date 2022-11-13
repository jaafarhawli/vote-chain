import Web3 from 'web3';
import ElectionContract from 'contracts/Election.json'

let selectedAccount;
let electionContract;
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

		const networkID = await web3.eth.net.getId();

		electionContract = new web3.eth.Contract(ElectionContract.abi, ElectionContract.networks[networkID].address);

		isInitialized = true;
	  }

} 

export const addCandidate = async () => {
	if(!isInitialized)
	await init();

	return electionContract.methods.addCandidates(["mbappe"], ["france"]).send({from: selectedAccount});
}
