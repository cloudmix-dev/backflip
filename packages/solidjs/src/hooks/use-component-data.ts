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

  createEffect(() => {
    const { client } = context?.() ?? {};

    if (client) {
      (async () => {
        setLoading(true);

        try {
          const newContentData = await client.send(name, data);

          setContentData(newContentData);
          setLoading(false);
        } catch (fetchError) {
          setError(fetchError as Error);

          if ((fetchError as Error).name !== "AbortError") {
            setLoading(false);
          }
        }
      })();
    }
  });

  return { data: contentData, loading, error };
}
