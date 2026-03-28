# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"CyberCode Challenge" — a multiplayer quiz game (4 players) where players identify which code snippet contains a security vulnerability among four options. Given the programming language and vulnerability type, players must find the vulnerable code. Built with Next.js 16 App Router, React 19, Tailwind CSS 4, and TypeScript. The UI uses a GitHub-inspired dark theme with monospace font (Roboto Mono).

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build`
- **Start production:** `pnpm start`
- **Lint:** `pnpm lint`
- **Package manager:** pnpm (lockfile: `pnpm-lock.yaml`)

## Architecture

### Game Flow (state machine in `GameClient`)

The game is a single-page app driven by URL query params via `nuqs`. All game state (phase, player names, scores, current question/player indices) is serialized into query string parameters, enabling shareable/refreshable state.

**Phases:** `lobby` → `setup` → `playing` ↔ `reveal` → `finished` (with optional tiebreaker)

- **Lobby:** Intro screen explaining cybersecurity vulnerabilities
- **Setup:** 4 player name entry
- **Playing:** Shows code question with 16-second countdown timer (Web Audio API tick sounds). Displays the programming language and vulnerability type (e.g., SQL Injection, XSS, Command Injection)
- **Reveal:** Shows correct answer (vulnerable code), explanation of why it's vulnerable, and score update
- **Finished:** Final scoreboard; if tied, triggers sudden-death tiebreaker rounds

### Key Patterns

- **Server Actions** (`app/actions.ts`): Question shuffling, answer checking, and tiebreaker question retrieval run server-side. The question bank lives in `data/questions.ts` as a static array.
- **URL State** via `nuqs`: Player names (`n0`-`n3`), scores (`s0`-`s3`), phase (`ph`), question index (`q`), player index (`p`), selected answer (`sel`) are all query params.
- **Custom syntax highlighter** (`lib/highlight.ts`): A hand-rolled tokenizer that highlights code snippets per language (Python, Java, TypeScript, C#, PHP, Go). Outputs HTML with CSS classes (`code-keyword`, `code-func`, etc.) rendered via `dangerouslySetInnerHTML`.
- **Tiebreaker** (`TiebreakerClient`): Sudden-death elimination rounds — each tied player answers a unique question per round. Players who answer incorrectly are eliminated unless all fail or all succeed.

### Component Responsibilities

- `GameClient` — Root client component, owns all game state and phase transitions
- `QuestionView` — Displays code options grid with countdown timer, shows language and vulnerability type
- `RevealView` — Shows answer result with highlighted vulnerable/incorrect options and vulnerability explanation
- `TiebreakerClient` — Self-contained sudden-death mini-game with its own state machine
- `Scoreboard` — Player scores and progress bar during gameplay
- `LobbyScreen` / `SetupScreen` / `WinnerScreen` — Phase-specific UI screens

### Styling

- GitHub dark theme: background `#0d1117`, surface `#161b22`, accent `#f0883e` (orange), red `#f85149`
- CSS custom properties for syntax highlight colors defined in `globals.css`
- Tailwind CSS 4 with `bg-linear-to-r` gradient syntax (not `bg-gradient-to-r`)

## Adding Questions

Add entries to the `questions` array in `data/questions.ts`. Each question requires: `id` (unique number), `language`, `vulnerability` (type of security flaw), `task` description, four `options` (A-D as code strings), `answer` (the vulnerable option), and `explanation` (why the code is vulnerable). The game randomly picks 20 questions per session.
