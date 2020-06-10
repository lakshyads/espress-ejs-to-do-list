/** ---------------------------------
 *        Database Util
 * ---------------------------------- */

// Imports --------------------------------------------------------------------------------------
import mongoose from 'mongoose';
import { logError, logInfo } from './loggerUtil';
import dateTimeStamp from './dateTimeUtil';
// require('dotenv');

mongoose.Promise = global.Promise;

// Page vars -----------------------------------------------------------------------------------
const connectionString = process.env.DB_CONN_STRING || 'mongodb://localhost:27017/';
const databaseName = process.env.DB_NAME || 'test';

// Utils ---------------------------------------------------------------------------------------

/** Connect to mongoDB using mongoose. Set `DB_CONN_STRING` & `DB_NAME ` in `.env` or pass as params.
 * @param connString Connection string to mongoDB. Default: `process.env.DB_CONN_STRING` OR `'mongodb://localhost:27017/'`
 * @param dbName Name of database to connect to. Default: `process.env.DB_NAME` OR `'test'`
 */
const connectMongoDb =
    async (connString: string = connectionString, dbName: string = databaseName) =>
        mongoose.connect(connString + dbName, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).
            then(
                () => {
                    logInfo('MongoDB Connection', `MongoDB Connected to ${dbName}.`);
                    return { connection: true, status: 'Success', timestamp: dateTimeStamp() };
                },
                (err) => {
                    logError('MongoDB Connection', 'Error in DB connection', err);
                    return { connection: false, status: 'Failed', error: err, timestamp: dateTimeStamp() };
                }
            ).
            catch(err => {
                logError('MongoDB Connection', 'Initial connection to DB failed', err);
                throw new Error(err);
            });


// Exports -----------------------------------------------------------------------------------------
export default connectMongoDb;

