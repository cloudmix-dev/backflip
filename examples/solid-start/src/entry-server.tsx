import { StartServer, createHandler } from "@solidjs/start/server";
import { HydrationScript } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" class="h-full w-full">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
          <HydrationScript />
        </head>
        <body class="h-full w-full">
          <div id="app" class="h-full w-full">
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
));
