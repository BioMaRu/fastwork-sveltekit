.PHONY: install upgrade dev build preview clean lint format test

# Default target
all: install

# Install dependencies
install:
	bun --bun install

upgrade:
	bunx npm-check-updates --upgrade --packageManager=bun

# Run development server
dev:
	make install
	bun --bun run dev

# Build for production
build:
	bun --bun run build

# Preview production build
preview:
	make build
	bun --bun run preview

# Clean build directories and dependencies
clean:
	rm -rf build
	rm -rf .svelte-kit
	rm -rf node_modules

# Run linting (if ESLint is configured)
lint:
	bun --bun run lint

# Format code (if Prettier is configured)
format:
	bun --bun run format

# Run tests (if Vitest is configured)
test:
	bun --bun run test

# Install and start development in one command
start: install dev
