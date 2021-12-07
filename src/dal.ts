import { RequestHandler } from 'express';
import { ToDoList } from './types';


const fs = import ('fs');
/**
 * 
 * Data Access Layer
 * This is abstrtaion layer to store data
 * For real solution consider DB usage
 *  - No SQL DB for a very large csale
 * 
 */

/**
* Retrieve all ToDo list from the storage
*/
export async function dalGetToDoList(listName) {

    try {

        var todoList = (await fs).readFileSync('./' + listName + '.json').toString();
  
        return todoList;
            
    } catch (error) {
        return null;
    }

};

/**
* Retrieve all ToDo list from the storage
*/
export async function dalStoreToDoList(listName: string, todoList: ToDoList) {

    try {

        //var todoList = (await fs).readFileSync('./' + listName + '.json').toString();
        (await fs).writeFileSync('./' + listName + '.json', JSON.stringify(todoList));
  
        return true;
            
    } catch (error) {
        return error;
    }

};
