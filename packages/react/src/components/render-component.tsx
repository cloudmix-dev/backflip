import {
  type RenderedComponentConfig,
  type SuperJSONObject,
} from "@backflipjs/client";

import { useMemo, useState } from "react";
import { SlotContext } from "../contexts/slot";
import { useContentData } from "../hooks/use-content-data";
import { RenderBlock } from "./render-block";

export interface RenderContentProps extends React.PropsWithChildren {
  name: string;
  default?: RenderedComponentConfig;
  error?: React.ReactNode | React.ReactNode[];
  fallback?: React.ReactNode | React.ReactNode[];
  input?: SuperJSONObject;
  loading?: React.ReactNode | React.ReactNode[];
}

export function RenderComponent({
  children,
  name,
  default: defaultData,
  error: renderError,
  input,
  fallback: renderFallback,
  loading: renderLoading,
}: RenderContentProps) {
  const { data: contentData, loading, error } = useContentData(name, input);
  const [slots, setSlot] = useState<
    Record<string, React.ReactNode | React.ReactNode[]>
  >({});
  const slotContext = useMemo(
    () => ({
      slots,
      setSlot: (
        name: string,
        children: React.ReactNode | React.ReactNode[],
      ) => {
        setSlot((prev) => ({ ...prev, [name]: children }));
      },
    }),
    [slots],
  );
  let toRender: React.ReactNode = null;

  if (loading) {
    if (renderLoading) {
      toRender = renderLoading;
    }
  } else if (error && renderError) {
    toRender = renderError;
  } else if (!contentData && !loading) {
    if (defaultData) {
      toRender = (
        <>
          {children}
          <RenderBlock {...defaultData} />
        </>
      );
    } else if (renderFallback) {
      toRender = renderFallback;
    }
  } else {
    toRender = (
      <>
        {children}
        {/* biome-ignore lint/style/noNonNullAssertion: we know contentData is defined */}
        <RenderBlock {...contentData!} />
      </>
    );
  }

  return (
    <SlotContext.Provider value={slotContext}>{toRender}</SlotContext.Provider>
  );
}
