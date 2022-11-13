import Web3 from 'web3';
import ElectionContract from 'contracts/Election.json';

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

		web3.eth.getBalance("0x0e1591cf241b2192258aBd800f8583E3e218bc15").then(function(value) {console.log(web3.utils.fromWei(value,"ether"));})

		isInitialized = true;
	  }

} 

export const addCandidate = async (election) => {
	if(!isInitialized)
	await init();

	return election.methods.addCandidates(["mbappe"], ["france"]).send({from: selectedAccount});
}


// Function Call
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
		newContractInstance
        // console.log('Deployed Contract Address : ', newContractInstance);
	)}
