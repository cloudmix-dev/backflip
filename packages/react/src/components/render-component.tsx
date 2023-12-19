import { type RenderedComponentConfig } from "@backflipjs/client";

import { useContentData } from "../hooks/use-content-data";
import { RenderBlock } from "./render-block";

interface RenderContentProps {
  name: string;
  data?: Record<string, unknown>;
  default?: RenderedComponentConfig;
  fallback?: React.ReactNode | React.ReactNode[];
  loading?: React.ReactNode | React.ReactNode[];
  error?: React.ReactNode | React.ReactNode[];
}

export function RenderComponent({
  name,
  data,
  default: defaultData,
  error: renderError,
  fallback: renderFallback,
  loading: renderLoading,
}: RenderContentProps) {
  const { data: contentData, loading, error } = useContentData(name, data);

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
