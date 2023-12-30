import {
  Button,
  Code,
  Logo,
  Prose,
  TableOfContents,
} from "@cloudmix-dev/react";
import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Server-Driven UIs | Backflip" },
    {
      name: "description",
      content: "Backflip - Simple server-driven UI primitives",
    },
  ];
};

export default function Index() {
  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center space-y-6 p-6 md:space-y-12 md:p-12">
          <Logo text="Backflip" size="lg" footer />
          <h1 className="sr-only">Backflip</h1>
          <Prose size="lg">
            <p>Simple server-driven UI primitives</p>
          </Prose>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <Button variant="primary" asChild>
              <Link to="#getting-started">Getting started</Link>
            </Button>
            <Button asChild>
              <Link to="#how-it-works">How it works</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-start space-x-6">
        <article>
          <Prose className="max-w-prose m-auto">
            <section>
              <h2 id="getting-started">Getting started</h2>
              <p>
                At a minimum, you need to install the{" "}
                <code>@backflipjs/client</code> and{" "}
                <code>@backflipjs/server</code> packages:
              </p>
              <div className="not-prose">
                <Code
                  language="bash"
                  content="npm install @backflipjs/client @backflipjs/server"
                />
              </div>
              <h3 id="server">Server</h3>
              <p>
                In your server code, create a <code>Server</code> instance...
              </p>
              <div className="not-prose">
                <Code
                  language="typescript"
                  content={`import { Server } from "@backflipjs/server";
                
const server = new Server();

//...`}
                  copy
                />
              </div>
              <p>
                ...then you can register your <code>components</code>
              </p>
              <div className="not-prose">
                <Code
                  language="typescript"
                  content={`//...
                
server.component("example", () => ({
  component: "Text",
  props: {
    content: "This is an example text component",
  },
}));

//...`}
                  copy
                />
              </div>
              <p>
                The return type for a <code>component()</code> callback is as
                follows:
              </p>
              <div className="not-prose">
                <Code
                  language="typescript"
                  content={`interface RenderedComponentConfig {
  component: string;
  props?: Record<string, unknown>;
  children?: RenderedComponentConfig[];
}`}
                  copy
                />
              </div>
              <p>
                The <code>Server</code> instance exposes a{" "}
                <a
                  href="https://wintercg.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  WinterCG
                </a>{" "}
                compatible <code>fetch()</code> method that accepts a{" "}
                <code>Request</code> and returns a <code>Response</code>
              </p>
              <div className="not-prose">
                <Code
                  language="typescript"
                  content={`//...
                  
// For example, in a Cloudflare Worker...
export default {
  fetch: server.fetch.bind(server),
};`}
                  copy
                />
              </div>
              <h3 id="client">Client</h3>
              <p>
                In your client, you need to create a <code>Registry</code>{" "}
                instance...
              </p>
              <div className="not-prose">
                <Code
                  language="typescript"
                  content={`import { Registry } from "@backflipjs/client";
                  
const registry = new Registry();

//...`}
                  copy
                />
              </div>
              <p>
                ...you can then register each component you'd like available to
                be configured via the server
              </p>
              <div className="not-prose">
                <Code
                  language="typescript"
                  content={`//...

// \`Text\` is the component, for example a React component...
registry.registerComponent(Text, { name: "Text" });

//...`}
                  copy
                />
              </div>
              <p>
                You also need to create a <code>Client</code> instance
                configured to point to your server
              </p>
              <div className="not-prose">
                <Code
                  language="typescript"
                  content={`import { Client } from "@backflipjs/client";
                  
const client = new Client({
  url: "/api/components", // Could also be an absolute URL
});

//...`}
                  copy
                />
              </div>
              <p>
                This <code>Client</code> can be used to send requests for a
                particular <code>component</code> configuration from your server
              </p>
              <div className="not-prose">
                <Code
                  language="typescript"
                  content={`//...
                  
const config = await client.send("Text");

//...`}
                  copy
                />
              </div>
              <p>
                The return value for <code>send()</code> is the same as the one
                defined in the <code>component()</code> callback on the server,
                which can then be used to render the <code>Text</code> component
                appropriately
              </p>
              <div className="not-prose">
                <Code
                  language="typescript"
                  content={`//...
                  
if (config.component === "Text") {
  return <Text {...config.props} />;
}

//...`}
                  copy
                />
              </div>
            </section>
            <section>
              <h2 id="how-it-works">How it works</h2>
              <h3 id="server-2">Server</h3>
              <h3 id="client-2">Client</h3>
              <h3 id="components">Components</h3>
              <h3 id="cache">Cache</h3>
            </section>
            <section>
              <h2 id="frameworks">Frameworks</h2>
              <h3 id="react">React</h3>
              <p>Coming soon...</p>
              <h3 id="vue">Vue</h3>
              <p>Coming soon...</p>
              <h3 id="svelte">Svelte</h3>
              <p>Coming soon...</p>
              <h3 id="solid-js">SolidJS</h3>
              <p>Coming soon...</p>
            </section>
          </Prose>
        </article>
        <div className="hidden p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 lg:block lg:sticky lg:top-[0.5rem]">
          <TableOfContents querySelector="article" />
        </div>
      </div>
    </>
  );
}
