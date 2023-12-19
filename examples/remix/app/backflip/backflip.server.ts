import { Server } from "@backflipjs/server";

const server = new Server();

server.component("home", ({ resHeaders }) => {
  const ab = Math.random() > 0.5 ? 1 : 0;

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
          label: ab ? "Primary button" : "Secondary button",
          variant: ab ? "primary" : "secondary",
        },
      },
      {
        component: "DateTime",
        props: {
          date: new Date(),
          prefix: "It is now",
        },
      },
    ],
  };
});

export { server };
