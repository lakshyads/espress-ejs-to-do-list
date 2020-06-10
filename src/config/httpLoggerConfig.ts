import { httpLogOptions } from '../utils/middlewares/httpLogger';

/** Logs Http request if true */
export const doLogRequest: boolean = false;

/** Logs Http response if true */
export const doLogResponse: boolean = false;

/** Http log default options */
const httpLoggerOptions: httpLogOptions = {
    showReqBody: true,
    showResBody: false,
    showCookies: true,
    showHeaders: false,
    showSession: true,
};

// Exports ------------------------------------------------------------------
export { httpLoggerOptions };