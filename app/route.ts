export const POST = async (req: Request) =>
  new Response("got-post-data: " + (await req.text()));
