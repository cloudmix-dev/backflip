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
        <article className="w-full">
          <Prose className="w-full max-w-prose m-auto">
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
              <p>
                Depending on which front-end framework you are using, you may
                also want to install the dedicated{" "}
                <code>{"@backflipjs/<framework>"}</code> package as well (see{" "}
                <Link to="#frameworks">Frameworks</Link>)
              </p>
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
                  
const config = await client.send("example");

//...`}
                  copy
                />
              </div>
              <p>
                The return value for <code>send()</code> is the same as the one
                defined in the <code>component()</code> callback on the server,
                which can then be used to render the <code>example</code>{" "}
                component appropriately
              </p>
              <div className="not-prose">
                <Code
                  language="typescript"
                  content={`//...
                  
function RenderComponent({
  component,
  props = {},
  children,
}: RenderComponentProps) {
  const Component = registry.get(component);

  if (!Component) {
    return null;
  }

  return (
    <Component {...props}>
      {children?.map((child, i) => (
        <RenderComponent key={\`\${component}_\${child.component}_\${i}\`} {...child} />
      ))}
    </Component>
  );
}

//...

return <RenderComponent {...config} />;

//...`}
                  copy
                />
              </div>
            </section>
            <hr />
            <section>
              <h2 id="how-it-works">How it works</h2>
              <h3 id="server-2">Server</h3>
              <p>
                The server-side of <em>Backflip</em> provides the configuration
                to your front-end for how your components should be rendered.
                You can do anything you are accustomed to running on your
                back-end (e.g. database calls) to decide which configuration to
                send down to your client.
              </p>
              <p>
                You register components with your <code>Server</code> instance,
                which then exposes them via its REST API
              </p>
              <Code
                language="typescript"
                content={`import { Server } from "@backflipjs/server";

interface ServerContext {
  locale: string;
}

const server = new Server<ServerContext>();

interface HomeInput {
  buttonVariant?: "primary" | "secondary";
}

server.component<HomeInput>("home", ({ ctx, input, resHeaders }) => {
  // Read a value from the \`input\` object
  const { buttonVariant } = input;
  // Run a convoluted "A/B" test
  const ab = Math.random() > 0.5 ? 1 : 0;

  // Setting a "Cache-Control" header instructs the Client how to cache the 
  // response (if a Cache has been configured)
  resHeaders.set("Cache-Control", "public, max-age=60");

  return {
    component: "Container",
    children: [
      {
        component: "Text",
        props: {
          content: ab
            ? "Below is a primary button"
            : "Below is a secondary button",
        },
      },
      {
        component: "Button",
        props: {
          label: \`\${buttonVariant} button\`,
          variant: buttonVariant,
        },
      },
      {
        component: "DateTime",
        props: {
          date: new Date(), // SuperJSON allows us to send some more complex data types
          prefix: "It is now",
        },
      },
      {
        component: "Text",
        props: {
          content: \`From the server: your locale is \${ctx.locale}\`, // Using \`ctx\` to send data to the client
        },
      },
    ],
  };
});

export { server };`}
                copy
              />
              <p>
                The <code>Server</code> exposes a{" "}
                <a
                  href="https://wintercg.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  WinterCG
                </a>{" "}
                compatible <code>fetch()</code> method that you can use to route
                requests to your <code>Server</code>.
              </p>
              <Code
                language="typescript"
                content={`import { Hono } from "hono";
import { server } from "./server";

const app = new Hono();

app.get("/api/components/:component", (c) => server.fetch(c.req.raw));

export default app;`}
                copy
              />
              <p>
                The only requirements for how you route your <code>Server</code>{" "}
                are that it is exposed via a <code>GET</code> endpoint, and that
                the URL's <strong>last</strong> path parameter is the{" "}
                <code>component</code> <code>name</code>. Apart from that, you
                can customise your setup as you see fit.
              </p>
              <h4 id="context">Input</h4>
              <p>
                A <code>Client</code> can pass some <code>input</code> to the{" "}
                <code>Server</code> when requesting a <code>component</code>,
                which can then be used in the <code>component()</code> callback.
              </p>
              <h4 id="context">Context</h4>
              <p>
                The <code>component()</code> method provides a <code>ctx</code>{" "}
                object that you can use within your callback to un isolated
                logic per request.
              </p>
              <p>
                The values in <code>ctx</code> can come from{" "}
                <strong>both</strong> the back-end and the front-end, allowing
                your client to provide extra information per request.
              </p>
              <p>
                <code>ctx</code> is defined on the back-end as either an{" "}
                <code>object</code> or <code>function</code> that returns one:
              </p>
              <Code
                language="typescript"
                content={`import { Server } from "@backflipjs/server";

interface ServerContext {
  locale: string;
}

const server = new Server<ServerContext>({
  // \`reqCtx\` is the incoming request context object
  context: (req, reqCtx) => ({ locale: reqCtx.locale ?? "en-US" }),
});

//...`}
                copy
              />
              <h4 id="serialization">Serialization</h4>
              <p>
                The <code>Server</code> uses{" "}
                <a
                  href="https://www.npmjs.com/package/superjson"
                  target="_blank"
                  rel="noreferrer"
                >
                  SuperJSON
                </a>{" "}
                to serialise/deserialise data, so your <code>input</code>,{" "}
                <code>ctx</code> and <code>props</code> definitions can include
                (as well as valid <code>JSON</code> values):
              </p>
              <ul>
                <li>
                  <code>undefined</code>
                </li>
                <li>
                  <code>BigInt</code>
                </li>
                <li>
                  <code>Date</code>
                </li>
                <li>
                  <code>RegExp</code>
                </li>
                <li>
                  <code>Set</code>
                </li>
                <li>
                  <code>Map</code>
                </li>
                <li>
                  <code>URL</code>
                </li>
                <li>
                  <code>Error</code>
                </li>
              </ul>
              <h3 id="registry">Registry</h3>
              <p>
                The <code>Registry</code> is (typically) a{" "}
                <strong>singleton</strong> you provide to your front-end logic
                which maps your components to the component <code>names</code>{" "}
                that your back-end describes when you request{" "}
                <code>components</code>.
              </p>
              <Code
                language="typescript"
                content={`import { Registry } from "@backflipjs/client";
import { Text } from "./components";
                
const registry = new Registry();

registry.registerComponent(Text, { name: "Text" });

//...`}
                copy
              />
              <p>
                <code>components</code> can then be retrieved via their{" "}
                <code>name</code>
              </p>
              <Code
                language="typescript"
                content={`//...

const TextComponent = registry.get("Text");

//...`}
                copy
              />
              <p>
                If you call <code>get()</code> with a <code>name</code> that{" "}
                <strong>doesn't</strong> have a component registered to it, it
                will return <code>null</code>.
              </p>
              <p>
                <code>names</code> are <strong>unique</strong> values, so you
                can only register <strong>one</strong> <code>component</code>{" "}
                per <code>name</code>.
              </p>
              <h3 id="components">Components</h3>
              <p>
                A <code>component</code> is any atomic UI presentation that can
                be described via the following configuration:
              </p>
              <Code
                language="typescript"
                content={`interface RenderedComponentConfig {
  component: string;
  props?: Record<string, unknown>;
  children?: RenderedComponentConfig[];
}`}
                copy
              />
              <p>
                <em>How</em> the configuration of a <code>component</code>{" "}
                translates to how it is rendered is an{" "}
                <strong>implemetation</strong> detail that the core{" "}
                <em>Backflip</em> libraries are agnostic to (although we do have{" "}
                <Link to="#frameworks">framework specific</Link> libraries that{" "}
                <strong>do</strong> handle the rendering of your{" "}
                <code>components</code> as well).
              </p>
              <p>
                A <code>component</code> is registered with a{" "}
                <strong>unique</strong> <code>name</code>, which is how the{" "}
                <code>Server</code> refers to it.
              </p>
              <h3 id="client-2">Client</h3>
              <p>
                The <code>Client</code> makes requests to your back-end from
                your front-end code, to retreive your <code>component</code>{" "}
                configurations.
              </p>
              <Code
                language="typescript"
                content={`import { Cache, Client } from "@backflipjs/client";
        
const client = new Client({
  url: "/api/components", // The URL your \`Server\` is available at
  cache: new Cache(), // *Optional* \`Cache\` instance to support front-end caching
  context: () => ({ // *Optional* \`ctx\` to send to the server per request
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
  }),
});
                

//...`}
                copy
              />
              <p>
                The <code>Client</code> exposes a <code>send()</code> method
                that accepts a <code>name</code> and returns a{" "}
                <code>Promise</code> that resolves to the <code>component</code>{" "}
                configuration. If a request fails, an <code>Error</code> will be
                thrown.
              </p>
              <p>
                If provided, the <code>context</code> will be serialized and
                sent within the query parameters of the request.
              </p>
              <h3 id="cache">Cache</h3>
              <p>
                By default, every time your front-end renders your{" "}
                <code>components</code>, the <code>Client</code> will make a
                network request to get their configuration(s).
              </p>
              <p>
                While ensuring your configurations include fresh data is
                desirable in many situations, there will also likely be{" "}
                <code>components</code> whose configuration rarely change - in
                these cases, you can utilize a <code>Cache</code>.
              </p>
              <Code
                language="typescript"
                content={`import { Cache, Client } from "@backflipjs/client";

const client = new Client({
  //...
  cache: new Cache(), // Simple default in-memory cache
  //...
});

//...`}
                copy
              />
              <p>
                The default <code>Cache</code> provided is an{" "}
                <strong>in-memory</strong> one - if you would like persistance
                between sessions then you need to utilize a <code>Cache</code>{" "}
                with a storage layer. The <code>@backflipjs/browser</code>{" "}
                package provides two <code>Cache</code> implementations that
                support persisted storage:
              </p>
              <ul>
                <li>
                  <code>LocalStorageCache</code> (using the{" "}
                  <code>localStorage</code> API)
                </li>
                <li>
                  <code>IDBCache</code> (using <code>IndexedDB</code>)
                </li>
              </ul>
              <Code
                language="typescript"
                content={`import { Client } from "@backflipjs/client";
import { IDBCache } from "@backflipjs/browser";

const client = new Client({
  //...
  cache: new IDBCache(),
  //...
});

//...`}
                copy
              />
              <p>
                For <em>React Native</em> caching{" "}
                <Link to="#react-native">see below</Link>.
              </p>
            </section>
            <hr />
            <section>
              <h2 id="frameworks">Frameworks</h2>
              <h3 id="react">React</h3>
              <p>
                Install the <code>@backflipjs/react</code> package along with
                the other dependencies
              </p>
              <Code
                language="bash"
                content="npm install @backflipjs/client @backflipjs/server @backflipjs/react"
              />
              <p>
                In your front-end code, you need to create a{" "}
                <code>Registry</code> and <code>Client</code> and pass them into
                the <code>Provider</code> component
              </p>
              <Code
                language="typescript"
                content={`import { Client, Registry, Provider } from "@backflipjs/react";
                  
const registry = new Registry();
const client = new Client({ /* ... */ });

// ...

function App() {
  return (
    <Provider client={client} registry={registry} devMode>
      {/* ... */}
    </Provider>
  )
}

//...`}
                copy
              />
              <p>
                The <code>devMode</code> prop optionally turns development mode{" "}
                <strong>on</strong> when <code>true</code>, which will log out
                warnings when for various misconfigurations that can occurr as
                you develop your application with <em>Backflip</em>.
              </p>
              <p>
                To render your components, you can use the{" "}
                <code>RenderComponent</code> component:
              </p>
              <Code
                language="typescript"
                content={`import { RenderComponent } from "@backflipjs/react";

// ...

return <RenderComponent name="example" />;

//...`}
                copy
              />
              <p>
                As well as the mandatory <code>name</code> prop, you can also
                pass the following <em>optional</em> props:
              </p>
              <ul>
                <li>
                  <code>default</code> - a default configuration to use if the
                  request to the <code>Server</code> fails
                </li>
                <li>
                  <code>error</code> - a <em>React</em> component to render if
                  the component fails to render due to an error (typically from
                  the <code>Server</code>)
                </li>
                <li>
                  <code>fallback</code> - a <em>React</em> component to render
                  if the component fails to render for any reason
                </li>
                <li>
                  <code>input</code> - an <code>input</code> value to be passed
                  to the <code>Server</code> when processing the request
                </li>
                <li>
                  <code>loading</code> - a <em>React</em> component to render
                  while the component is loading a request from the{" "}
                  <code>Server</code>
                </li>
              </ul>
              <Code
                language="typescript"
                content={`import { RenderComponent } from "@backflipjs/react";

// ...

return (
  <RenderComponent
    name="example"
    default={{
      component: "Text",
      props: {
        content: "This is a default text component",
      },
    }}
    error={<p>There was an error rendering this component</p>}
    fallback={<p>This component is not available</p>}
    input={{ buttonVariant: "primary" }}
    loading={<p>Loading...</p>}
  />
);

//...`}
                copy
              />
              <p>
                An example <em>React</em> <em>Remix</em> application can be
                found in the{" "}
                <a
                  href="https://github.com/cloudmix-dev/backflip/tree/main/examples/remix"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github repository
                </a>
              </p>
              <h3 id="react-native">React Native</h3>
              <p>
                <em>React Native</em> can also utilize the{" "}
                <code>@backflipjs/react</code> dependency. For the most part,
                you can follow the above <Link to="#react">React</Link>{" "}
                instructions to set it up.
              </p>
              <p>
                There is a <code>@backflipjs/native</code> package that provides
                a <em>React Native</em> <em>Expo</em> compatible{" "}
                <code>SecureStoreCache</code> that uses{" "}
                <code>expo-secure-store</code> as a cache storager layer.
              </p>
              <Code
                language="typescript"
                content={`import { SecureStoreCache } from "@backflipjs/native";
import { Client } from "@backflipjs/react";

const client = new Client({
  //...
  cache: new SecureStoreCache(),
  //...
});

//...`}
                copy
              />
              <p>
                An example <em>Expo</em> application can be found in the{" "}
                <a
                  href="https://github.com/cloudmix-dev/backflip/tree/main/examples/expo"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github repository
                </a>
              </p>
              <h3 id="vue">Vue</h3>
              <p>Coming soon...</p>
              <h3 id="svelte">Svelte</h3>
              <p>Coming soon...</p>
              <h3 id="solid-js">SolidJS</h3>
              <p>Coming soon...</p>
            </section>
          </Prose>
        </article>
        <div className="w-96 hidden lg:block lg:sticky lg:top-[0.5rem]">
          <TableOfContents
            contentQuerySelector="article"
            scrollQuerySelector="main > div"
            scrollOffset={64}
          />
        </div>
      </div>
    </>
  );
}
