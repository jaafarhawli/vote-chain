export let selectedAccount;
export let isInitialized = false;

// On page initialization
// Pop up metamask wallet and select an account to perform web3 operations from
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

		// Switch to the new selected account in metamask
		window.ethereum.on('accountsChanged', function (accounts) {
			selectedAccount = accounts[0];
			console.log(`Selected account changed to ${selectedAccount}`);
		})

		isInitialized = true;
	  }
} 