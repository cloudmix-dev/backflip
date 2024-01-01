import { RemixServer } from "@remix-run/react";
import { type EntryContext } from "@remix-run/server-runtime";
import { isbot } from "isbot";

// force "browser" export on node (typing is from env.d.ts)
import { renderToReadableStream } from "react-dom/server.browser";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  let statusCode = responseStatusCode;
  const body = await renderToReadableStream(
    // biome-ignore lint/suspicious/noExplicitAny: type mismatch
    <RemixServer context={remixContext as any} url={request.url} />,
    {
      signal: request.signal,
      onError() {
        statusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get("user-agent") ?? "")) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: statusCode,
  });
}
