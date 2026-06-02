import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { handleCreatePaymentIntent, handleWebhook } from "./api/payment";
import { getOrders, getOrder, getProducts, getProduct } from "./api/orders";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

function handleApiRequest(request: Request): Promise<Response> | null {
  const url = new URL(request.url);

  // Payment Intent endpoint
  if (url.pathname === "/api/payment/intent" && request.method === "POST") {
    return handleCreatePaymentIntent(request);
  }

  // Webhook endpoint
  if (url.pathname === "/api/webhook" && request.method === "POST") {
    return handleWebhook(request);
  }

  // Get all orders for user
  if (url.pathname.match(/^\/api\/orders$/) && request.method === "GET") {
    const userId = url.searchParams.get("userId");
    if (!userId) {
      return Promise.resolve(
        new Response(JSON.stringify({ error: "Missing userId" }), {
          status: 400,
        })
      );
    }
    return getOrders(userId);
  }

  // Get single order
  if (url.pathname.match(/^\/api\/orders\/[^/]+$/) && request.method === "GET") {
    const orderId = url.pathname.split("/").pop()!;
    return getOrder(orderId);
  }

  // Get all products
  if (url.pathname === "/api/products" && request.method === "GET") {
    return getProducts();
  }

  // Get single product
  if (
    url.pathname.match(/^\/api\/products\/[^/]+$/) &&
    request.method === "GET"
  ) {
    const productId = url.pathname.split("/").pop()!;
    return getProduct(productId);
  }

  return null;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      // Handle API requests first
      const apiResponse = handleApiRequest(request);
      if (apiResponse) {
        return await apiResponse;
      }

      // Fall through to React SSR
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
