import * as express from 'express';
import { getToDoList } from './todo_manager';
import { addToDoItem } from './todo_manager';
import { updateToDoItemStatus } from './todo_manager';
import { deleteToDoItem } from './todo_manager';

/**
 * Bootstrap the application framework
 */
export function createApp() {
  const app = express();

  app.use(express.json());

  app.get('/list/:listName', getToDoList);

  app.post('/additem/:listName/:itemName', addToDoItem);

  app.put('/updateitemstatus/:listName/:itemId', updateToDoItemStatus);

  app.delete('/deleteitem/:listName/:itemId', deleteToDoItem);

  return app;
}
