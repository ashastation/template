<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	let agentInfo = {};
	const AGENT_API = 'http://localhost:5555';

	onMount(async () => {
		try {
			const response = await fetch(`${AGENT_API}/api/agent-info`);
			const data = await response.json();
			console.log(data);
			agentInfo = data;
		} catch (error) {
			console.error('Error fetching agent info:', error);
		}
	});
</script>

<main>
	<h2>Agent Information</h2>
	{#if Object.keys(agentInfo).length > 0}
		<table>
			<thead>
				<tr>
					<th>Key</th>
					<th>Value</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.keys(agentInfo) as key}
					<tr>
						<td>{key}</td>
						<td>{agentInfo[key]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p>No data available</p>
	{/if}
</main>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 20px;
	}

	th,
	td {
		border: 1px solid #00ff41;
		padding: 8px;
		text-align: left;
	}

	th {
		background-color: #1a1a1a;
		color: #00ff41;
		text-transform: uppercase;
	}

	td {
		background-color: #222;
		color: #00ff41;
	}

	p {
		text-align: center;
		color: #ff0000;
	}
</style>
