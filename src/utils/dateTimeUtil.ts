/** ---------------------------------
 *        Date-Time Util
 * ---------------------------------- */

/** Get current date-time-stamp 
 * @returns date-time string of format 'day mmm dd yyyy, h:mm:ss am|pm'
 * @example example: 'Thu Jun 04 2020, 6:33:04 am'
 */
const dateTimeStamp = () => {
    const dateTimeStamp = new Date();
    return `${dateTimeStamp.toDateString()}, ${dateTimeStamp.toLocaleTimeString()}`;
    // return dateTimeStamp.toString()
};

/** Calculate milliseconds elapsed since start time
 * @param start Start time
 */
const getActualDurationInMilliseconds = (start: [number, number]) => {
    const NS_PER_SEC = 1e9; // constant to convert to nanoseconds
    const NS_TO_MS = 1e6; // constant to convert to milliseconds
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

// Exports ------------------------------------------------------------------------------------
export default dateTimeStamp;
export { getActualDurationInMilliseconds };