<script>
	import { marked } from 'marked'

	import * as format from '$lib/format'
	import { siteData } from '$lib/stores'

	let terms = $derived($siteData?.data?.attributes?.homeFooterTerms ?? '')
	let termsUpgraded = $derived(format.upgradeTerms(terms))
</script>

<section class="lo-container _pdv-64px _bgcl-neutral-100">
	<div class="trb-article custom">
		{@html marked.parse(termsUpgraded)}
	</div>
</section>
