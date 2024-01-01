import {
  type RenderedComponentConfig,
  type SuperJSONObject,
} from "@backflipjs/client";
import { type JSX } from "solid-js";

import { useComponentData } from "../hooks/use-component-data";
import { RenderBlock } from "./render-block";

export interface RenderContentProps {
  name: string;
  default?: RenderedComponentConfig;
  error?: JSX.Element;
  fallback?: JSX.Element;
  input?: SuperJSONObject;
  loading?: JSX.Element;
}

export function RenderComponent({
  name,
  default: defaultData,
  error: renderError,
  input,
  fallback: renderFallback,
  loading: renderLoading,
}: RenderContentProps) {
  const { data: contentData, loading, error } = useComponentData(name, input);

  if (loading()) {
    if (renderLoading) {
      return <>{renderLoading}</>;
    }

    return null;
  }

  if (error() && renderError) {
    return <>{renderError}</>;
  }

  if (!contentData && !loading) {
    if (defaultData) {
      return <RenderBlock {...defaultData} />;
    }

    if (renderFallback) {
      return <>{renderFallback}</>;
    }

    return null;
  }

  // biome-ignore lint/style/noNonNullAssertion: we know contentData is defined
  return <RenderBlock {...contentData()!} />;
}
