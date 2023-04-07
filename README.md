# fresh project

This project uses Deno and Fresh

## Usage

```bash
deno task start
```

This will launch a local server and watch the project directory (restarting as needed)

## Local Environment

```bash
docker run -d -p 27017:27017 mongo
```

This will run a local MongoDB instance via Docker

## Maintenance

```bash
deno run -A -r https://fresh.deno.dev/update .
```

This will update Fresh and its dependencies. [More info](https://fresh.deno.dev/docs/concepts/updating)
