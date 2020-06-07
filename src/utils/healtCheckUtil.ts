/** ---------------------------------
 *        Health-Check Util
 * ---------------------------------- */

import Axios, { AxiosRequestConfig } from 'axios';
import {} from './loggerUtil';

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const options: AxiosRequestConfig = {
    baseURL: `http://${host}:${port}/liveness`,
};

(async function () {
    try {
        const { data, status } = await Axios.get("/health", options);
        console.info({ description: "Application is healthy", payload: data, status });
        process.exit(0);
    } catch (error) {
        console.error({ description: "Application is not healthy", error });
        process.exit(1);
    }
})();