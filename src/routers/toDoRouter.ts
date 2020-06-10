// Initialize router
import express, { Request, Response } from 'express';
const ToDoRouter = express.Router();

// Imports
import { log, logInfo, logError, newLine } from '../utils/loggerUtil';
import dateTimeStamp from '../utils/dateTimeUtil';
import views from '../utils/filePaths';

// Page variables & constants
let viewPath: string;
let itemList = ['Berr', 'Vodka', 'Whiskey'];

// Import models
import { TodoItemModel, TodoListModel } from '../models/todoDbModels';

// Routes -----------------------------

// Home route
ToDoRouter.route('/index')
    .get(async (req: express.Request, res: express.Response) => {
        viewPath = views.INDEX;
        logInfo('Requested view path', viewPath);
        res.status(200).render(viewPath, { timestamp: dateTimeStamp() });
    });

ToDoRouter.route('/')
    .get(async (req: Request, res: Response) => {
        viewPath = views.LIST;
        logInfo('Requested view path', viewPath);

        TodoItemModel.find({}, (err, docs) => {
            if (err) {
                logError(`Get todoList from DB`, `Error fetching list`, err);
                res.render(viewPath, { listTitle: 'Today', listItems: [] });
            } else {
                res.render(viewPath, { listTitle: 'Today', listItems: docs });
            }
        });

    })
    .post(async (req: Request, res: Response) => {
        const newItem = req?.body?.newItem ? new TodoItemModel({ name: req?.body?.newItem }) : null;
        newItem && newItem.save((err, doc) => {
            if (err)
                logError('Insert TodoItemModel document', 'Error inserting document', err)
        });
        res.redirect('/');
    })

ToDoRouter.post('/delete/:listName', async (req: Request, res: Response) => {
    const listName = req?.params?.listName ?? null;
    log('listname: ', listName);
    const itemToDelete = req?.body?.check ?? null;
    log('delete id: ', itemToDelete);
    if (!listName || listName === 'Today') {
        TodoItemModel.deleteOne({ _id: itemToDelete }, err => {
            if (err)
                logError('Delete requested for TodoItemModel:', itemToDelete, err)
        });
        res.redirect('/');
    }
    else {
        TodoListModel.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: itemToDelete } } }, (err, list) => {
            if (!err)
                res.redirect('/' + listName)
        })
    }
});

// Generic list handler
ToDoRouter.route('/:listName').
    get(async (req: Request, res: Response) => {
        const listName = req?.params?.listName ?? '';
        viewPath = views.LIST;
        TodoListModel.findOne({ name: listName }, (err, list) => {
            if (err) {
                logError(`Get todoList from DB`, `Error fetching list`, err);
                res.render(viewPath, { listTitle: listName, listItems: [] });
            } else {
                res.render(viewPath, { listTitle: listName, listItems: list?.items });
            }
        });
    }).
    post(async (req: Request, res: Response) => {
        const listName = req?.params?.listName ?? '';
        const newItem = req?.body?.newItem ? new TodoItemModel({ name: req?.body?.newItem }) : null;
        log('item name: ', newItem)
        viewPath = views.LIST;
        TodoListModel.findOne({ name: listName }, (err, list) => {
            if (err) {
                logError(`Get todoList from DB`, `Error fetching list`, err);
                res.render(viewPath, { listTitle: listName, listItems: [] });
            } else {
                if (list) {
                    log('list: ', list);
                    list?.items?.push(newItem);
                    list?.save();
                }
                else {
                    log('no list found')
                    const newList = new TodoListModel({
                        name: listName,
                        items: [newItem]
                    });
                    newList.save();
                }
                res.redirect('/' + listName);
            }
        });
    })




// ------------------------------------
export default ToDoRouter;
