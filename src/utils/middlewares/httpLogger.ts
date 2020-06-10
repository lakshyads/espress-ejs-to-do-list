/** ---------------------------------
 *        HTTP Logger
 * ---------------------------------- */


import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import dateTimeStamp, { getActualDurationInMilliseconds } from '../dateTimeUtil';
import { newLine, log, horizontalRule } from '../loggerUtil';
import { httpLoggerOptions, doLogRequest, doLogResponse } from '../../config/httpLoggerConfig';


/** Log Request Options Interface 
 * @var showBody
 * @var showHeaders
 * @var showSession
 * @var showCookies
*/
export interface httpLogOptions {
    showReqBody?: boolean,
    showResBody?: boolean,
    showHeaders?: boolean,
    showSession?: boolean,
    showCookies?: boolean,
}

/** Middleware for logging requests to server. Use `config/httpLoggerConfig` for customizing logging options.
 * @param req Express request
 * @param res Express Response
 * @param next Express next funciton
 */
const logHttp = async (req: Request, res: Response, next: NextFunction) => {
    // for response time
    var startTimer = process.hrtime();
    const durationInMilliseconds = getActualDurationInMilliseconds(startTimer);

    horizontalRule();
    newLine();

    // Log request
    log(`${chalk.yellow.bold.underline(`Request reqistered`)}: [${chalk.grey(`${dateTimeStamp()}`)}] `,
        chalk.yellow.bold(req.method),
        chalk.yellow.bold(req.path),
        '(status: ' + (res.statusCode === 200 ? chalk.magenta('Completed') : chalk.red('Not-Completed')) + ')',
    );

    logRequest(req, httpLoggerOptions, 'Logged by httpLogger middleware');
    logResponse(req, res, startTimer, httpLoggerOptions.showResBody);


    next();
};


/**
 * Logs express request
 * @param req Express request
 * @param options  httpLogOptions. Default = `{ showBody = true, showSession = true, showHeaders = true, showCookies = true }`
 * @param message Optional message
 */
const logRequest = (req: Request, { showReqBody = true, showSession = true, showHeaders = true, showCookies = true }: httpLogOptions = {}, message?: string | null,) => {
    log('\n')
    log(`${chalk.magenta.bold(`(?) Request spec =`)} `, doLogRequest ? {
        requested: `${req?.method} ${req?.path}`,
        timeStamp: dateTimeStamp(),
        req: {
            protocol: req?.protocol ?? '',
            params: req?.params ? 'not empty' : 'empty',
            cookies: showCookies ? req?.cookies ?? '' : 'Logging disabled in httpLoggerConfig',
            sessionId: req?.sessionID ?? '',
            body: showReqBody ? req?.body ?? '' : 'Logging disabled in httpLoggerConfig',
            session: showSession ? req?.session ?? '' : 'Logging disabled in httpLoggerConfig',
            headers: showHeaders ? req?.headers ?? '' : 'Logging disabled in httpLoggerConfig',
            stale: req?.stale ?? '',
        },
        message: message ?? '',
    } : 'Logging disabled in httpLoggerConfig');
};

/** Logs express response on finish
 * @param req Express request
 * @param res Express response
 * @param startTimer Start time to calculate response duration from. [use - `process.hrtime()` - to obtain time in milliseconds]
 * @param showBody Show content sent in response. Default is true
 */
const logResponse = (req: Request, res: Response, startTimer?: [number, number], showBody: boolean = true) => {
    const resHealthStatus = res.statusCode, resHealthMessage = res.statusMessage ?? 'Healthy';//= { res.statusCode, res.statusMessage ?? 'Healthy' };

    const defaultWrite = res.write;
    const defaultEnd = res.end;
    const chunks: any[] = [];
    let body: any;

    if (showBody) {
        res.write = (...restArgs: any[]) => {
            chunks.push(new Buffer(restArgs[0]));
            defaultWrite.apply(res, restArgs);
        };

        res.end = (...restArgs: any[]) => {
            if (restArgs[0]) {
                chunks.push(new Buffer(restArgs[0]));
            }
            body = Buffer.concat(chunks).toString('utf8');

            // log(body);

            defaultEnd.apply(res, restArgs);
        };
    }

    res.on("finish", () => {
        const resEndStatus = res.statusCode;
        const resEndMessage = res.statusMessage;
        newLine();
        const resEndTime = startTimer ? getActualDurationInMilliseconds(startTimer).toLocaleString() + ' ms' : '';
        log(`${chalk.magenta.bold(`(?) Response spec`)} = `, doLogResponse ? {
            route: `${req?.method} ${req?.path}`,
            response_status: `${resEndStatus} - ${resEndMessage}`,
            server_response_health: `${resHealthStatus} - ${resHealthMessage}`,
            response_send_timeStamp: dateTimeStamp(),
            responseTime: startTimer ? resEndTime : 'Logging disabled in httpLoggerConfig',
            // body: showBody ? body ?? '' : 'Logging disabled in httpLoggerConfig',
        } : 'Logging disabled in httpLoggerConfig');
        newLine();
        log(`${chalk.black.bold(`[B] Response body = [[`)}\n`, showBody ? body ?? '' : 'Logging disabled in httpLoggerConfig');
        log(chalk.black.bold(']]'));
        newLine();
        log(`${chalk.cyanBright.bold.underline(`Response sent`)}: [${chalk.grey(`${resEndStatus} - ${resEndMessage}`)}] ${startTimer ? chalk.red(resEndTime) : ''}`);
        newLine();
        horizontalRule();
    });
};



// Exports ------------------------------------------------------------------------------------

export default logHttp;
export { logRequest, logResponse };
