import { Server } from "@backflipjs/server";

const server = new Server();

server.component("home", ({ resHeaders }) => {
  const ab = Math.random() > 0.5 ? 1 : 0;

  resHeaders.set("Cache-Control", "public, max-age=60");

  return {
    component: "Container",
    props: {
      columns: 3,
    },
    children: [
      {
        component: "Button",
        props: {
          variant: ab ? "primary" : "secondary",
        },
        children: [
          {
            component: "Text",
            props: {
              content: ab ? "Primary button" : "Secondary button",
            },
          },
        ],
      },
    ],
  };
});

export { server };
