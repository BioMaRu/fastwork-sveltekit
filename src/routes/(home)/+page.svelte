<script lang="ts">
	import { Question, Terms } from '$components'
	import { ModalMyFastworkTerm } from '$components/modal'

	import Hero from './components/Hero.svelte'
	import How from './components/How.svelte'
</script>

<div class="_ovf-hd">
	<Hero />
	<How />
	<Question />
	<Terms />
</div>

<ModalMyFastworkTerm />
