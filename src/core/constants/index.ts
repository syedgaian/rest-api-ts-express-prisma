/* eslint-disable @typescript-eslint/no-magic-numbers */

export const ZERO = 0 as const;
export const ONE = 1 as const;
export const THREE = 3 as const;
export const FOUR = 4 as const;
export const SIX = 6 as const;
export const TEN = 10 as const;
export const SIXTY = 60 as const;
export const ONE_HUNDRED = 100 as const;
export const ONE_THOUSAND = 1000 as const;
export const DEFAULT_AGENT_TYPE = 'OPENAI' as const;
export const DEFAULT_MODEL = 'GPT-4' as const;
export const DEFAULT_TEMPERATURE = 0.7 as const;
export const DEFAULT_TOPP = 1.0 as const;

export const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_SERVER_ERROR = 500,
}
