// Initialize router
import express, { Request, Response } from 'express';
const ToDoRouter = express.Router();

// Imports
import path from 'path';
import { log, logInfo, logError, newLine } from '../utils/loggerUtil';
import dateTimeStamp from '../utils/dateTimeUtil';
import views from '../utils/filePaths';

// Page variables & constants
let viewPath;
let itemList = ['Berr', 'Vodka', 'Whiskey'];

// Routes -----------------------------

// Home route
ToDoRouter.route('/index')
    .get(async (req: express.Request, res: express.Response) => {
        viewPath = views.INDEX;
        logInfo('Requested view path', viewPath);
        res.status(200).render(viewPath, { timestamp: dateTimeStamp() });
    });

ToDoRouter.route('/list')
    .get(async (req: Request, res: Response) => {
        viewPath = views.LIST;
        logInfo('Requested view path', viewPath);
        res.render(viewPath, { listTitle: 'Booze list', listItems: itemList });
    })
    .post(async (req: Request, res: Response) => {
        const newItem = req?.body?.newItem ?? null;
        newItem && itemList.push(newItem);
        viewPath = views.LIST;
        logInfo('New item added to itemList', newItem);
        res.render(viewPath, { listTitle: 'Booze list', listItems: itemList });
    })



// ------------------------------------
export default ToDoRouter;
