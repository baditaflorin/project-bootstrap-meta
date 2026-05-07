.DEFAULT_GOAL := help

PORT ?= 4173

.PHONY: help install-hooks dev build test test-integration smoke lint fmt pages-preview clean hooks-pre-commit hooks-commit-msg hooks-pre-push hooks-post-checkout hooks-post-merge

help: ## List available targets.
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_-]+:.*##/ {printf "%-22s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install-hooks: ## Wire local git hooks.
	git config core.hooksPath .githooks

dev: ## Run the frontend development server.
	npm run dev

build: ## Build the GitHub Pages site into docs/.
	npm run build

test: ## Run unit tests.
	npm test

test-integration: ## Run integration tests.
	npm run test:integration

smoke: ## Run the static-site smoke test.
	./scripts/smoke.sh

lint: ## Run linters and type checks.
	npm run lint

fmt: ## Format source files.
	npm run fmt

pages-preview: ## Serve docs/ locally as GitHub Pages would.
	npm run preview -- --host 127.0.0.1 --port $(PORT)

hooks-pre-commit: ## Run the pre-commit hook manually.
	.githooks/pre-commit

hooks-commit-msg: ## Run the commit-msg hook manually with the latest commit message.
	.githooks/commit-msg .git/COMMIT_EDITMSG

hooks-pre-push: ## Run the pre-push hook manually.
	.githooks/pre-push

hooks-post-checkout: ## Run the post-checkout hook manually.
	.githooks/post-checkout

hooks-post-merge: ## Run the post-merge hook manually.
	.githooks/post-merge

clean: ## Remove generated local artifacts.
	rm -rf node_modules coverage playwright-report test-results
