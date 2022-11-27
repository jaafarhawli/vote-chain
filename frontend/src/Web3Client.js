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