import {
  type RenderedComponentConfig,
  type SuperJSONObject,
} from "@backflipjs/client";
import { useEffect, useState } from "react";

import { useContext } from "./use-context";

export function useComponentData(name: string, data?: SuperJSONObject) {
  const [loading, setLoading] = useState(true);
  const [contentData, setContentData] =
    useState<RenderedComponentConfig | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { client } = useContext();
  const skip = typeof window === "undefined";

  useEffect(() => {
    if (!skip) {
      const ac = new AbortController();
      const signal = ac.signal;

      (async () => {
        setLoading(true);

        try {
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
  }, [skip, client, name, data]);

  return { data: contentData, loading, error };
}
