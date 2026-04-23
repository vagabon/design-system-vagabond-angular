export type ID = string | number | undefined | null;
export type Primitif = string | number | boolean | undefined | null;

export interface BaseDto {
    id?: ID;
}

export interface ApiDto extends BaseDto {
    creationDate?: string;
    updatedDate?: string;
    deletedDate?: string;
    active?: boolean;
}

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

export interface BaseUserTokenDto {
    jwt?: string;
}

export interface OrderState {
    order: string;
    orderAsc?: boolean;
}
