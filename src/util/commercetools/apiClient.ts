import fetch from "node-fetch";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ClientBuilder } from "@commercetools/ts-client";
//import "dotenv/config";

// --- Configuration ---
const projectKey: string = process.env.CTP_PROJECT_KEY!;
const clientId: string = process.env.CTP_CLIENT_ID!;
const clientSecret: string = process.env.CTP_CLIENT_SECRET!;
const authUrl: string = process.env.CTP_AUTH_URL!;
const apiUrl: string = process.env.CTP_API_URL!;
const scopes: string[] = [
  `manage_customers:${projectKey}`,
  `view_products:${projectKey}`,
];

// --- Middleware Functions ---

// Function for custom header middleware
function createCustomHeaderMiddleware() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (next: (request: any) => any) => (request: any) => {
    return next({
      ...request,
      headers: {
        ...request.headers,
        "accept-language": "en-AU",
      },
    });
  };
}

// Function for custom logger middleware
import { Middleware } from "@commercetools/ts-client";

const customLoggerMiddleware: Middleware = (next) => async (request) => {
  console.log(`[CUSTOM LOGGER] ${request.method}`, request);
  return next(request);
};

// --- Middleware Options ---

// Auth Middleware Options
const authMiddlewareOptions = {
  host: authUrl,
  projectKey: projectKey,
  credentials: { clientId, clientSecret },
  scopes: scopes,
  httpClient: fetch,
};

// Http Middleware Options
const httpMiddlewareOptions = {
  host: apiUrl,
  includeResponseHeaders: true,
  maskSensitiveHeaderData: false,
  includeOriginalRequest: true,
  includeRequestInErrorResponse: true,
  enableRetry: true,
  retryConfig: {
    maxRetries: 3,
    retryDelay: 200,
    backoff: false,
    retryCodes: [500, 503],
  },
  httpClient: fetch,
};

// Correlation ID Middleware Options
const correlationIdMiddlewareOptions = {
  // Replace with your own UUID, ULID, or a generator function. Do not use this example in production!
  generate: () => "cd260fc9-c575-4ba3-8789-cc4c9980ee4e",
};

// Concurrent Modification Middleware Options
const concurrentModificationMiddlewareOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  concurrentModificationHandlerFn: async (version: number, request: any) => {
    console.log(`Concurrent modification error, retry with version ${version}`);
    request.body.version = version;
    return JSON.stringify(request.body);
  },
};

// --- Optional Telemetry Middleware (Commented Out) ---
/*
const telemetryOptions = {
  createTelemetryMiddleware,
  apm: () => typeof require('newrelic'),
  tracer: () => typeof require('/absolute-path-to-a-tracer-module'),
};
*/

// --- Client Creation ---
const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withMiddleware(customLoggerMiddleware)
  .withCorrelationIdMiddleware(correlationIdMiddlewareOptions)
  .withMiddleware(createCustomHeaderMiddleware())
  .withHttpMiddleware(httpMiddlewareOptions)
  .withConcurrentModificationMiddleware(concurrentModificationMiddlewareOptions)
  // .withTelemetryMiddleware(telemetryOptions)
  .build();

// --- API Root Creation ---
const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey,
});

export { apiRoot };
