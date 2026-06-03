import server from "../dist/server/server.js";

function getRequestUrl(req) {
  const host = req.headers.host || "";
  const protocol = req.headers["x-forwarded-proto"] || "https";
  return `${protocol}://${host}${req.url}`;
}

export default async function handler(req, res) {
  const request = new Request(getRequestUrl(req), {
    method: req.method,
    headers: req.headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
  });

  const response = await server.fetch(request, process.env, {});

  res.statusCode = response.status;
  response.headers.forEach((value, name) => {
    // Vercel may set its own content-length; keep it if present.
    res.setHeader(name, value);
  });

  const body = await response.arrayBuffer();
  res.end(Buffer.from(body));
}
