import {
  type RenderedComponentConfig,
  type SuperJSONObject,
} from "@backflipjs/client";
import { createEffect, createSignal } from "solid-js";

import { useContext } from "./use-context";

export function useComponentData(name: string, data?: SuperJSONObject) {
  const [loading, setLoading] = createSignal(true);
  const [contentData, setContentData] =
    createSignal<RenderedComponentConfig | null>(null);
  const [error, setError] = createSignal<Error | null>(null);
  const context = useContext();
  const skip = typeof window === "undefined";

  createEffect(() => {
    if (!skip) {
      const ac = new AbortController();
      const signal = ac.signal;

      (async () => {
        setLoading(true);

        try {
          const { client } = context?.() ?? {};

          if (!client) {
            throw new Error(
              "No Client provided - ensure you have wrapped this component in a <Provider />",
            );
          }

          const newContentData = await client.send(name, data, { signal });

          setContentData(newContentData);
          setLoading(false);
        } catch (fetchError) {
          setError(fetchError as Error);

          if ((fetchError as Error).name !== "AbortError") {
            setLoading(false);
          }
        }
      })();

      return () => {
        ac.abort();
      };
    }
  });

  return { data: contentData, loading, error };
}
