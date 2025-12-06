# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) starting with v0.1.0.

## [Unreleased]

### Added

- (Planned) Playwright automation flows for LinkedIn Easy Apply and Indeed native forms, glassdoor also
- (Planned) Resume attachment handling and per-step screenshot capture.

## [0.1.0] - 2025-12-06

### Added

- Initial Apify Actor scaffold with input validation, session storage, and output summaries.
- Job scouting across LinkedIn (`bebity/linkedin-jobs-scraper` with fallback), Glassdoor (`apify/glassdoor-jobs-scraper`), and Indeed (`apify/indeed-jobs-scraper [PPR]`).
- Ranking heuristics based on easy-apply flag, keyword match, and location proximity.
- Application orchestration loop, logging, and dataset export with standardized `ApplicationStatus` values.
- Optional OpenRouter proxy guidance for manual form completion plus Anthropic SDK wiring for upcoming automation.
- Documentation updates including README enhancements, MCP tooling guidance, and the project requirements document (`PRD.md`).
