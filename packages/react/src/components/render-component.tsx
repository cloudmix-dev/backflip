import {
  type RenderedComponentConfig,
  type SuperJSONObject,
} from "@backflipjs/client";

import { useComponentData } from "../hooks/use-component-data";
import { RenderBlock } from "./render-block";

export interface RenderContentProps {
  name: string;
  default?: RenderedComponentConfig;
  error?: React.ReactNode | React.ReactNode[];
  fallback?: React.ReactNode | React.ReactNode[];
  input?: SuperJSONObject;
  loading?: React.ReactNode | React.ReactNode[];
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

  if (loading) {
    if (renderLoading) {
      return <>{renderLoading}</>;
    }

    return null;
  }

  if (error && renderError) {
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
  return <RenderBlock {...contentData!} />;
}
