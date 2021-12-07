import { RequestHandler } from 'express';
import { ToDoList } from './types';
import { ToDoListItem } from './types';
import { TaskStatusEnum } from './types';
import { dalGetToDoList } from './dal';
import { dalStoreToDoList } from './dal';

const fs = import ('fs');

/**
* Retrieve all ToDo list from the storage
* http://localhost:3000/list/TodoList
*/
export const getToDoList: RequestHandler = async function (req, res, next) {
  
    const { listName } = req.params;
    try {

        var todoList = await dalGetToDoList(listName);
        if(todoList == null){
            return res.status(404).send('Todo list "' + listName + '" not found');
        }
  
        return res.status(200).send(todoList);
            
    } catch (error) {
        return res.status(500).send('Unexpected error: ' + error);
    }

};

/**
* Add a new item to ToDo list and store the list
* http://localhost:3000/additem/TodoList/FirstToDoItem
*/
export const addToDoItem: RequestHandler = async function (req, res, next) {
  
    const { listName,itemName } = req.params;
    try {

        var todoList = await dalGetToDoList(listName);
        var todoListObject:ToDoList;
        if(todoList == null){
            todoListObject = JSON.parse('{"TodoList":[]}');
        } else {
            todoListObject = JSON.parse(todoList);
        }

        var allItems = todoListObject["TodoList"];
       
        let newItem = {itemId:createUUID(), itemName:itemName, itemStatus:TaskStatusEnum.Active} as ToDoListItem;

        allItems.push(newItem);

        dalStore(listName, todoListObject, res);
            
    } catch (error) {
        return res.status(500).send('Unexpected error: ' + error);
    }

};

/**
* Update ToDo item status to opposite and store the list
* http://localhost:3000/updateitemstatus/TodoList/1cf0b7f3-5a82-4dfa-820f-603162561bab
*/
export const updateToDoItemStatus: RequestHandler = async function (req, res, next) {
  
    const { listName,itemId } = req.params;

    try {

        var todoList = await dalGetToDoList(listName);
        if(todoList == null){
            return res.status(404).send('Todo list "' + listName + '" not found');
        }

        var todoListObject:ToDoList = JSON.parse(todoList);

        todoListObject["TodoList"].forEach(element => {
            if(element.itemId === itemId){
                if(element.itemStatus == TaskStatusEnum.Active) {
                    element.itemStatus = TaskStatusEnum.Done;
                } else {
                    element.itemStatus = TaskStatusEnum.Active;
                }
            }
        });

        dalStore(listName, todoListObject, res);
            
    } catch (error) {
        return res.status(500).send('Unexpected error: ' + error);
    }

};

/**
* Delete ToDo item and store the list
* http://localhost:3000/deleteitem/TodoList/1cf0b7f3-5a82-4dfa-820f-603162561bab
*/
export const deleteToDoItem: RequestHandler = async function (req, res, next) {
  
    const { listName,itemId } = req.params;

    console.log("deleteToDoItem");

    try {

        var todoList = await dalGetToDoList(listName);
        if(todoList == null){
            return res.status(404).send('Todo list "' + listName + '" not found');
        }

        var todoListObject:ToDoList = JSON.parse(todoList);

        var list = todoListObject["TodoList"];
        for( var i = 0; i < list.length; i++){ 
    
            if ( list[i].itemId === itemId) { 
        
                console.log('Found!!!')
                list.splice(i, 1); 
            }
        
        }
  
        dalStore(listName, todoListObject, res);
            
    } catch (error) {
        return res.status(500).send('Unexpected error: ' + error);
    }

};

async function dalStore(listName, todoListObject, res) {
    var result = await dalStoreToDoList(listName, todoListObject);
    if(result == true){
        return res.status(200).send(JSON.stringify(todoListObject));
    } else {
        return res.status(500).send('Failed to store ' + listName + '. Error: ' + result);
    }
}

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }