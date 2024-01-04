import { Button, Logo, Prose, TableOfContents } from "@cloudmix-dev/react";
import { Link } from "@remix-run/react";

// @ts-expect-error
import Content, { frontmatter } from "../content/index.mdx";

export function meta() {
  return frontmatter.meta;
}

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
            <Content />
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
