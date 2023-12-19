type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

type JSONArray = Array<JSONValue>;

export interface RenderedComponentConfig {
  component: string;
  props?: JSONObject;
  children?: RenderedComponentConfig[];
}
