export interface ToDoList {
  TodoList : [ToDoListItem]
}

export interface ToDoListItem {
      itemId: string, 
      itemName: string,
      itemStatus :string
};

export enum TaskStatusEnum {
  Done = 'done',
  Active = 'active',
}

