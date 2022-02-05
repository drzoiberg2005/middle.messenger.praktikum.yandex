import Block from "./index";

export type Props = Record<string, any>;
export type Children = Record<string, Block>;
export type Events = Record<string, string>;
export type BodyRequest = Record<string, any>;

export type Listeners = Record<string, Function[]>;
export type InnerChildren = Record<string, Block>[];

export type Options = {
  method: string;
  timeout?: number;
  credentials?: boolean;
  mode?: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
  data?: Record<string, any>;
};

export type Verify = {
  verify: boolean;
  message: string;
};
export type ValidationFields = Record<
  string,
  {
    pattern: RegExp;
    error: string;
  }
>;

export type FormData = Record<string, string>;
