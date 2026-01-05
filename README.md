# RSS Aggregator

A command-line tool for subscribing to RSS feeds and reading posts from the terminal.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/) (for running PostgreSQL)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the database

```bash
docker compose up -d
```

This starts a PostgreSQL instance on port 5432.

### 3. Create your config file

Create a file at `~/.gatorconfig.json` with the following content:

```json
{
  "db_url": "postgres://postgres:postgres@localhost:5432/postgres",
  "current_user_name": ""
}
```

### 4. Run database migrations

```bash
npm run migrate
```

## Usage

Run commands with:

```bash
npm start <command> [arguments]
```

### Getting started

```bash
# Create an account
npm start register alice

# Add an RSS feed
npm start addfeed "Tech News" https://example.com/feed.xml

# Start collecting posts (runs every 2 minutes)
npm start agg 2m

# Browse your posts
npm start browse
```

### All commands

| Command | Description |
|---------|-------------|
| `register <name>` | Create a new account |
| `login <name>` | Switch to an existing account |
| `users` | List all users |
| `addfeed <name> <url>` | Add a new RSS feed |
| `feeds` | List all feeds |
| `follow <url>` | Follow an existing feed |
| `unfollow <url>` | Stop following a feed |
| `following` | List feeds you follow |
| `agg <interval>` | Start the feed aggregator (e.g., `1m`, `30s`, `1h`) |
| `browse [limit]` | View posts from your feeds |
| `reset` | Clear all data |
