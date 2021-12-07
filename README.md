# ToDoList

## Prerequisites

* [Node v12.22.7 LTS](https://nodejs.org/download/release/latest-v12.x/)

## Getting Started

To install dependencies and start the server in development mode:

```
npm ci
npm start
```

To List ToDo items run the folowing GET request:  
where  
**ToDoList** - name of ToODo List  
```
http://localhost:3000/list/TodoList
```

To Add a new ToDo item run the folowing POST request:  
where  
**ToDoList** - name of ToODo List  
**FirstToDoItem** - name of ToODo Item to be added to list  
```
http://localhost:3000/additem/TodoList/FirstToDoItem
```

To update the status of certain ToDo item run the folowing PUT request:  
where  
**ToDoList** - name of ToODo List  
**1cf0b7f3-5a82-4dfa-820f-603162561bab** - ID of ToODo List item  
```
http://localhost:3000/updateitemstatus/TodoList/1cf0b7f3-5a82-4dfa-820f-603162561bab
```

To delete the certain ToDo item run the folowing DELETE request:  
where  
**ToDoList** - name of ToODo List  
**1cf0b7f3-5a82-4dfa-820f-603162561bab** - ID of ToODo List item  
```
http://localhost:3000/deleteitem/TodoList/1cf0b7f3-5a82-4dfa-820f-603162561bab
```
