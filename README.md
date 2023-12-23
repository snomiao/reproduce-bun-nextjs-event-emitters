# Run next dev docker oven/bun with next.js 14 got POST data wrong

## What happened

this is a simple next.js app route

```ts
// `app/route.ts
export const POST = async (req: Request) =>
  new Response("got-post-data: " + (await req.text()));

// the await req.text() returns users data on node.js but got "[object EventEmitter]" while run with "bun dev" in oven/bun
```

post any data into this route, like `curl --data expected-data http://localhost:3000`

should expected stdout: `got-post-data: expected-data`

but actual got  stdout: `got-post-data: [object EventEmitter]`

## Reproduce

1. Clone this repo

2. Reproduce
Run `docker compose up`

expected stdout: got-post-data: expected-data
but...
actual   stdout: got-post-data: [object EventEmitter]

3. Confirm Problem

goto `docker-compose.yml`, replace the image `oven/bun` with `node`, you will got expected result

```yaml
services:
  reproduce-bun-nextjs-event-emitters:
    # reproduce image and commands
    # image: oven/bun
    # command: bun dev -H 0.0.0.0 -p 80

    # replace with this, you will got expected result
    image: node
    command: npx next -H 0.0.0.0 -p 80
```

