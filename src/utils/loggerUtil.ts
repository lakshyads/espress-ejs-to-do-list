/** ---------------------------------
 *        Logger Util
 * ---------------------------------- */

import chalk from 'chalk';
import { Request, Response, } from 'express';
import { logRequest, logResponse } from './middlewares/httpLogger';
import dateTimeStamp from './dateTimeUtil';


/** Standard console log
* @param message Message to log
* @param data Optional data to log
*/
const log = (message: string, ...data: any) => {
    if (data)
        console.log(message, ...data);
    else
        console.log(message);
};

/** Logs info
 * @param title  Title for info
 * @param message Message to log 
 * @param data Data to log
 */
const logInfo = (title: string, message: string, ...data: any) => {
    newLine();
    console.info(`${chalk.blue.bold(`[i] Info = `)}`, { title: title, message: message, data: data ?? '', timeStamp: dateTimeStamp() });
    newLine();
};

/** Logs Error
 * @param title Title for error
 * @param message Message to log
 * @param data Optional data to log
 */
const logError = (title: string, message: string, data?: any,) => {
    newLine();
    console.error(`${chalk.red.bold(`<!> Error = `)}`, {
        title: title,
        message: message,
        data: data ?? 'null',
        timeStamp: dateTimeStamp(),
    });
    newLine();
};

/** Logs a new empty line */
const newLine = () => {
    console.log('\n');
}

/** Logs a horizontal rule */
const horizontalRule = () => {
    log(chalk.bold('---------------------------------------------------------------------------------------------------------------------------------------------------'));
}

// Exports ------------------------------------------------------------------------------------
export { log, logInfo, logError, logRequest, logResponse, newLine , horizontalRule};