<script>
	// @ts-nocheck

	import { ethers } from 'ethers';
	export let web3Props;

	async function connectWallet() {
		if (window !== undefined && typeof window.ethereum != 'undefined') {
			const provider = new ethers.BrowserProvider(window.ethereum);
			await provider.send('eth_requestAccounts', []);
			const signer = await provider.getSigner();
			// const contract =  new ethers.Contract(contractAdd,Abi.abi,signer)
			//Uncomment above if you are using contract or making a dapp
			web3Props = { signer, provider };
		}
	}
</script>

{#if !web3Props?.signer}
	<button class="btn connect" on:click={connectWallet}>Connect Wallet</button>
{:else}
	<div>Connected to: {web3Props.signer.address.substr(0, 6)}..</div>
{/if}

<style>
	.connect {
		border: 0.5px solid white;
		border-radius: 6px;
	}
</style>
