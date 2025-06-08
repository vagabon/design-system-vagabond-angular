export type ID = string | number | undefined | null;
export type Primitif = string | number | boolean | undefined | null;

export type JSONValue =
  | Primitif
  | {
    [x: string]: JSONValue;
  }
  | Array<JSONValue>
  | ApiDto;

export type JSONObject =
  | {
    [x: string]: JSONValue;
  }
  | Array<JSONObject>
  | ApiDto;

export type JSON = {
  [x: string]: JSON | Primitif;
};

export type Target = {
  target: {
    value: JSONObject;
  };
};

export interface ApiDto {
  id?: ID;
  creationDate?: string;
  updatedDate?: string;
  deletedDate?: string;
  active?: boolean;
}
