import { httpLogOptions } from '../utils/middlewares/httpLogger';

/** Logs Http request if true */
export const doLogRequest: boolean = true;

/** Logs Http response if true */
export const doLogResponse: boolean = true;

/** Http log default options */
const httpLoggerOptions: httpLogOptions = {
    showBody: true,
    showCookies: true,
    showHeaders: false,
    showSession: false,
};

// Exports ------------------------------------------------------------------
export { httpLoggerOptions };