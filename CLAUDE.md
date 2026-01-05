# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RSS Aggregator CLI ("gator") - A TypeScript command-line tool for subscribing to and aggregating RSS feeds. Users can register, follow feeds, and browse aggregated posts.

## Commands

```bash
# Run the CLI
npm start <command> [args...]

# Database operations
npm run generate    # Generate Drizzle migrations from schema changes
npm run migrate     # Apply pending migrations

# Start PostgreSQL (required for development)
docker compose up -d
```

## CLI Commands

- `register <name>` - Create a new user
- `login <name>` - Switch to an existing user
- `users` - List all users
- `addfeed <name> <url>` - Add a new RSS feed (requires login)
- `feeds` - List all feeds
- `follow <url>` - Follow an existing feed (requires login)
- `unfollow <url>` - Unfollow a feed (requires login)
- `following` - List feeds you're following (requires login)
- `agg <interval>` - Start aggregation loop (e.g., `agg 1m`, `agg 30s`)
- `browse [limit]` - Browse posts from followed feeds (requires login)
- `reset` - Reset all data

## Architecture

### Configuration
The app reads from `~/.gatorconfig.json` which must contain:
```json
{
  "db_url": "postgres://...",
  "current_user_name": "username"
}
```

### Project Structure
- `src/index.ts` - Entry point, registers all commands
- `src/commands/` - Command handlers (one file per feature area)
- `src/commands/index.ts` - Command registry and runner types
- `src/middleware.ts` - `middlewareLoggedIn` wraps commands requiring auth
- `src/config.ts` - Config file read/write operations
- `src/lib/db/` - Database layer
  - `schema.ts` - Drizzle table definitions (users, feeds, feedFollows, posts)
  - `index.ts` - Database connection singleton
  - `queries/` - Query functions organized by entity
  - `migrations/` - SQL migration files
- `src/lib/rss.ts` - RSS feed fetching and XML parsing

### Command Pattern
Commands follow `CommandHandler` type: `(cmdName: string, ...args: string[]) => Promise<void>`

Protected commands use `UserCommandHandler` which receives the authenticated user:
`(cmdName: string, user: User, ...args: string[]) => Promise<void>`

Wrap protected handlers with `middlewareLoggedIn()` when registering.

### Database
- PostgreSQL 16 via Docker
- Drizzle ORM with `postgres` driver
- Schema defines: users, feeds, feedFollows (junction), posts
- All tables use UUID primary keys with cascade deletes