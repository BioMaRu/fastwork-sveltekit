<script lang="ts">
	import { ModalExample1, ModalExample2 } from '$components/modal'
	import * as modal from '$lib/modal'
</script>

<div class="_ovf-hd">
	<button on:click={() => modal.open('example1')}>Open Modal1</button>
	<button on:click={() => modal.open('example2')}>Open Modal2</button>
</div>

<ModalExample1 />
<ModalExample2 />
