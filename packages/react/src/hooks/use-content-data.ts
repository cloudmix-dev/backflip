import { type RenderedComponentConfig } from "@backflipjs/client";
import { useEffect, useState } from "react";

import { useContext } from "./use-context";

export function useContentData(name: string, data?: Record<string, unknown>) {
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
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      })();

      return () => {
        ac.abort();
      };
    }
  }, [skip, client, name, data]);

  return { data: contentData, loading, error };
}
