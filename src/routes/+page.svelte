<script>
	// @ts-nocheck

	import ListInfoKeyValue from '$lib/components/ListInfoKeyValue.svelte';
	import PingAgent from '$lib/components/PingAgent.svelte';
	import WebSocketData from '$lib/components/WebSocketData.svelte';
	import WalletConnect from '$lib/modules/WalletConnect.svelte';
	import GrafanaDashboard from '$lib/components/GrafanaDashboard.svelte';
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { popup } from '@skeletonlabs/skeleton';
	import { stringify } from 'postcss';

	const popupFeatured = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	const id = () => Math.random().toString(36).substr(2, 9);
	const componentsMap = {
		ListInfoKeyValue,
		GrafanaDashboard,
		WebSocketData,
		PingAgent,
		WalletConnect
	};

	// TODO: this data needs to be passed when the front end spinned to make the layout customizable
	let itemsConfig = [
		{
			coordinates: {
				x: 0,
				y: 1,
				w: 3,
				h: 3.5
			},
			com: 'ListInfoKeyValue',
			fixed: true,
			canRemove: false
		},
		{
			coordinates: {
				x: 3,
				y: 1,
				w: 3,
				h: 3
			},
			com: 'GrafanaDashboard',
			fixed: false,
			canRemove: true
		},
		{
			coordinates: {
				x: 0,
				y: 5,
				w: 12,
				h: 12
			},
			com: 'WebSocketData',
			fixed: false,
			canRemove: true
		},
		{
			coordinates: {
				x: 0,
				y: 4.5,
				w: 10,
				h: 1
			},
			com: 'PingAgent',
			fixed: true,
			canRemove: true
		},
		{
			coordinates: {
				x: 0,
				y: 0,
				w: 2,
				h: 2
			},
			com: 'WalletConnect',
			fixed: true,
			canRemove: false
		}
	];

	let items = itemsConfig.map((item) => {
		return {
			6: gridHelp.item({
				...item.coordinates,
				fixed: item.fixed
			}),
			id: id(),
			com: componentsMap[item.com],
			canRemove: item.canRemove
		};
	});

	const cols = [[120, 6]];
	const remove = (item) => {
		items = items.filter((value) => value.id !== item.id);

		if (adjustAfterRemove) {
			items = gridHelp.adjust(items, cols);
		}
	};
	let adjustAfterRemove = false;
</script>

<div>
	<Grid bind:items rowHeight={100} let:item let:dataItem {cols}>
		{#if dataItem.canRemove}
			<span
				on:pointerdown={(e) => e.stopPropagation()}
				on:click={() => remove(dataItem)}
				class="remove"
			>
				✕
			</span>
		{/if}
		<svelte:component this={dataItem.com}></svelte:component>
	</Grid>
</div>

<style>
	.remove {
		text-align: right;
		color: grey;
		display: block;
		position: absolute;
		right: 9px;
		top: 9px;
		cursor: pointer;
	}
</style>
