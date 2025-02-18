<script lang="ts">
	import { Footer, Navbar } from '$components'

	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()
</script>

<div class="nav-container">
	<Navbar />
</div>

<main>
	{@render children?.()}
</main>

<Footer />

<style lang="scss">
	main {
		min-height: calc(100vh - var(--navbar-height) - var(--footer-height));
	}
</style>
