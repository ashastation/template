<script>
	// @ts-nocheck
	import { defaultEvmStores } from 'ethers-svelte';
	import { onMount } from 'svelte';
	import { connected, chainId, signerAddress } from 'ethers-svelte';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

	import Grid, { GridItem } from 'svelte-grid-extended';
	import Card from '$lib/components/Card.svelte';
	import ListInfoKeyValue from '$lib/components/ListInfoKeyValue.svelte';
	import PingAgent from '$lib/components/PingAgent.svelte';
	import WebSocketData from '$lib/components/WebSocketData.svelte';
	import Swap from '$lib/components/Swap.svelte';
	import GrafanaDashboard from '$lib/components/GrafanaDashboard.svelte';
	import WalletConnectEther from '$lib/components/WalletConnectEther.svelte';

	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let tabSet = 0;
	let url = 'http://localhost:5555/api/agent-info';
	let wsUrl = 'http://localhost:5556';
	$: listUrl = url;
	$: websocketUrl = wsUrl;

	let components = [
		// { com: WalletConnectEther, w: 2, h: 1 },
		{ com: ListInfoKeyValue, w: 6, h: 6, param: listUrl },
		{ com: PingAgent, w: 4, h: 1 },
		{ com: GrafanaDashboard, w: 6, h: 6 },
		{ com: WebSocketData, w: 6, h: 5, param: websocketUrl }
	];

	console.log({ websocketUrl });
	let hoveringOverBasket = null;
	let items = [];
	let gridController;

	const itemSize = { height: 40 };

	let isPanelCollapsed = false;

	function togglePanel() {
		isPanelCollapsed = !isPanelCollapsed;
	}

	function addNewItem(item) {
		const { w, h, com, param } = item;
		const newPosition = gridController.getFirstAvailablePosition(w, h);
		items = newPosition
			? [
					...items,
					{
						id: crypto.randomUUID(),
						x: newPosition.x,
						y: newPosition.y,
						w,
						h,
						com,
						resizable: true,
						param
					}
				]
			: items;

		console.log(JSON.stringify(items));
		console.log(items);
		console.log('chainId', chainId);
		console.log('signerAddress', signerAddress);
	}

	onMount(() => {
		defaultEvmStores.setProvider();
	});
	console.log(chainId);
</script>

<div class="flex">
	<div class="{isPanelCollapsed ? 'collapsed' : ''} panel-container">
		<button class="toggle-button" on:click={togglePanel}>
			{isPanelCollapsed ? '▶' : '◀'}
		</button>
		{#if !isPanelCollapsed}
			<TabGroup>
				<Tab bind:group={tabSet} name="tab1" value={0}>
					<span>Components</span>
				</Tab>
				<Tab bind:group={tabSet} name="tab2" value={1}>Configs</Tab>
				<!-- Tab Panels --->
				<svelte:fragment slot="panel">
					{#if tabSet === 0}
						<div
							class="flex flex-col gap-3 overflow-auto variant-ghost-secondary panel"
							class:hovering={hoveringOverBasket === 'Components'}
						>
							{#each components as item, itemIndex (item)}
								<div key={itemIndex} class="item" animate:flip>
									<li on:click={() => addNewItem(item)}>
										<svelte:component this={item.com}></svelte:component>
									</li>
								</div>
							{/each}
						</div>
					{:else if tabSet === 1}
						<div class="flex flex-col gap-3 overflow-auto variant-ghost-secondary panel">
							Set Component variables
							<div class="flex mt-2 inp">
								<input type="text" bind:value={url} placeholder="List Url" style="width: 100%;" />
							</div>
							<div class="flex mt-2 inp">
								<input
									type="text"
									bind:value={wsUrl}
									placeholder="Websocket Url"
									style="width: 100%;"
								/>
							</div>
						</div>
					{/if}
				</svelte:fragment>
			</TabGroup>
		{/if}
	</div>

	<Grid {itemSize} cols={10} collision="push" bind:controller={gridController}>
		{#each items as { id, x, y, w, h, com, resizable, param } ((com, id))}
			<div transition:fade={{ duration: 300 }}>
				<GridItem {id} bind:x bind:y bind:w bind:h bind:resizable resizerClass="resizer">
					<svelte:component this={com} url={param}></svelte:component>
				</GridItem>
			</div>
		{/each}
	</Grid>
</div>

<style>
	.panel-container {
		display: flex;
		align-items: center;
	}

	.panel {
		height: 900px;
		align-items: center;
		padding: 10px 0px;
		transition: width 0.3s ease;
		width: 450px;
	}

	.collapsed .panel {
		width: 0;
		overflow: hidden;
		padding: 0;
	}

	.toggle-button {
		background-color: #333;
		color: white;
		border: none;
		cursor: pointer;
		width: 30px;
		height: 100%;
		outline: none;
	}

	.item {
		display: inline; /* required for flip to work */
	}

	li {
		cursor: pointer;
		display: inline-block;
		margin-right: 10px;
		padding: 10px;
	}

	li:hover {
		background: rgba(255, 166, 0, 0.426);
		color: white;
	}

	ul {
		border: solid lightgray 1px;
		display: flex; /* required for drag & drop to work when .item display is inline */
		height: 100px; /* needed when empty */
		padding: 10px;
	}

	:global(.grid-container) {
		opacity: 0.7;
	}

	:global(.grid-item) {
		transition:
			width 4s,
			height 4s;
		transition:
			transform 4s,
			opacity 4s;
	}

	:global(.grid-item-active) {
		opacity: 0.1;
	}

	/* tailwind classes */
	:global(.bg-red-500) {
		background-color: rgb(202, 33, 33);
	}

	:global(.rounded) {
		border-radius: 0.25rem;
	}

	:global(.resizer) {
		touch-action: none;
		position: absolute;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		width: 30px;
		height: 30px;
		right: 0;
		bottom: 0;
		cursor: se-resize;
	}

	:global(.resizer::after) {
		content: '';
		position: absolute;
		right: 3px;
		bottom: 3px;
		width: 8px;
		height: 8px;
		border-right: 3px solid rgba(0, 243, 69, 0.605);
		border-bottom: 3px solid rgba(0, 243, 69, 0.605);
	}

	input {
		color: black;
	}

	.inp {
		width: 90%;
	}
</style>
