type PrimitiveJSONValue = string | number | boolean | undefined | null;

type JSONValue = PrimitiveJSONValue | JSONArray | JSONObject;

type JSONArray = Array<JSONValue>;

export interface JSONObject {
  [key: string]: JSONValue;
}

type SerializableJSONValue =
  | symbol
  | Set<SuperJSONValue>
  | Map<SuperJSONValue, SuperJSONValue>
  | undefined
  | bigint
  | Date
  | RegExp;

export type SuperJSONArray = Array<SuperJSONValue>;
export interface SuperJSONObject {
  [key: string]: SuperJSONValue;
}

type SuperJSONValue =
  | JSONValue
  | SerializableJSONValue
  | SuperJSONArray
  | SuperJSONObject;

export interface RenderedComponentConfig {
  component: string;
  props?: SuperJSONObject;
  children?: RenderedComponentConfig[];
}
