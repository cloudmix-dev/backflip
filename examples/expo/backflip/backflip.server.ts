import { Server } from "@backflipjs/server";

const server = new Server();

server.component("home", ({ resHeaders }) => {
  const ab = Math.random() > 0.5 ? 1 : 0;

  resHeaders.set("Cache-Control", "public, max-age=60");

  return {
    component: "Button",
    props: {
      label: ab ? "Primary button" : "Secondary button",
      variant: ab ? "primary" : "secondary",
    },
  };
});

export { server };
