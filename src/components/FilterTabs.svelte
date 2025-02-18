<script lang="ts">
	type Value = unknown // Value type will be infer by TS automatically
	type Props = {
		tabs?: { label: string; value: Value }[]
		selected?: Value
		onChange?: (type: Value) => void
	}

	let { tabs = [], selected = $bindable('all'), onChange }: Props = $props()

	function handleClick(type: Value) {
		selected = type
		onChange?.(type)
	}
</script>

{#if tabs.length}
	<div class="_dp-f _g-8px _fw-w">
		{#each tabs as tab}
			<button
				class="trb-select-button _bgcl-white _pdh-16px _wsp-nw"
				class:is-active={selected === tab.value}
				onclick={() => {
					handleClick(tab.value)
				}}
			>
				{tab.label}
			</button>
		{/each}
	</div>
{/if}
