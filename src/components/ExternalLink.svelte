<script lang="ts">
	interface Props {
		href?: string;
		children?: import('svelte').Snippet;
	}

	let { href = '', children }: Props = $props();
</script>

<a class="trb-link" rel="noreferrer noopener" target="_blank" {href}>{@render children?.()}</a>
