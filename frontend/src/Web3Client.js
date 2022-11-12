import Web3 from 'web3';

let selectedAccount;

export const init = () => {
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
			})

		window.ethereum.on('accountsChanged', function (accounts) {
			selectedAccount = accounts[0];
			console.log(`Selected account changed to ${selectedAccount}`);
		})

		const web3 = new Web3(provider);
	  }

} 