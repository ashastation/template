import { createPublicClient, http } from 'viem';
import { mainnet, polygon } from 'viem/chains';

/**
 * returns the web3 details
 */
export const getWeb3Details = () => {
};

/**
 * returns contract interface
 */
export const getContract = (/** @type {any} */ abi, /** @type {any} */ contractAddress) => {
};

export const readContract = async (/** @type {any} */ abi, /** @type {any} */ address, /** @type {any} */ method, args = []) => {
};

export const writeContract = async (/** @type {any} */ abi, /** @type {any} */ address, /** @type {any} */ method, args = []) => {
};

export const publicClient = createPublicClient({
	chain: polygon,
	transport: http()
});