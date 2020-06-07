// Import modules
import express from 'express';
import chalk from 'chalk';

// Import routers
import HealthRouter from './routers/healthRouter';
import ToDoRouter from './routers/toDoRouter';

// Import middlewares
import httpLogger from './utils/middlewares/httpLogger';

// Import utils
import dateTimestamp from './utils/dateTimeUtil'
import { newLine } from './utils/loggerUtil';

// Initialize server
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(httpLogger);

// Set `ViewEngine` and specify `directory to serve static content from`
server.engine('.html',require('ejs').renderFile);
server.set('view engine', 'html');
server.use(express.static('public'));
// server.use(express.static(path.resolve('../public')));
// server.use(express.static(path.resolve('../public/assets/styles')));
// app.set('views', __dirname + '/wwwroot/views');
// server.set('view engine', 'ejs');

// Initialize variables
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'http://localhost:';

// Use routers
server.use('/', ToDoRouter);
server.use('/server', HealthRouter);

// Start the server
server.listen(port, () => {
    newLine();
    console.log(`${chalk.grey(`[${dateTimestamp()}]`)} ${chalk.bold.magenta('Server started')}`);
    console.log(`${chalk.grey(`[${dateTimestamp()}]`)} ${chalk.greenBright('Server is running on')} ${chalk.underline.grey(host + port)}`);
    newLine();
})
