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

export function RenderComponent(props: RenderContentProps) {
  const {
    data: componentData,
    loading: isLoading,
    error: hasError,
  } = useComponentData(props.name, props.input);
  const data = componentData();
  const loading = isLoading();
  const error = hasError();

  if (loading) {
    if (props.loading) {
      return <>{props.loading}</>;
    }

    return null;
  }

  if (error && props.error) {
    return <>{props.error}</>;
  }

  if (!data && !loading) {
    if (props.default) {
      return <RenderBlock {...props.default} />;
    }

    if (props.fallback) {
      return <>{props.fallback}</>;
    }

    return null;
  }

  // biome-ignore lint/style/noNonNullAssertion: we know contentData is defined
  return <RenderBlock {...data!} />;
}
