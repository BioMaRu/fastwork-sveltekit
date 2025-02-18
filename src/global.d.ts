declare interface Window {
	dataLayer: {
		push: (data: unknown) => void
	}
	rive: {
		Rive: new (options: {
			src: string
			canvas: HTMLCanvasElement
			autoplay?: boolean
			artboard?: string
			stateMachines?: string
			onLoad?: () => void
		}) => RiveInstance

		RiveInstance: {
			cleanup: () => void
			resizeDrawingSurfaceToCanvas: () => void
		}
	}
}

declare namespace svelteHTML {
	interface HTMLAttributes {
		[key: `on${string}`]: unknown // make all custom on* event attributes available
	}
}
