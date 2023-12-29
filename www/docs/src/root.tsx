import { ThemeSelector } from "@cloudmix-dev/react";
import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import cookie from "cookie";

import "./global.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookies = cookie.parse(request.headers.get("Cookie") ?? "");
  const theme = cookies._theme ?? "system";

  return json({ theme });
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className={`${theme} h-full w-full`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full w-full bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <div className="flex flex-col h-full w-full">
          <nav className="flex-shrink-0">
            <div className="container m-auto px-4">
              <div className="flex justify-end items-center h-16">
                <ThemeSelector cookie="_theme" localStorageKey="theme" />
              </div>
            </div>
          </nav>
          <main className="flex-grow pb-6 md:pb-12">
            <div className="container m-auto px-4">
              <Outlet />
            </div>
          </main>
          <footer className="flex-shrink-0">
            <div className="container m-auto px-4">
              <div className="flex justify-center items-center h-16 text-sm">
                <p>&copy; {new Date().getFullYear()} Cloudmix</p>
              </div>
            </div>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
