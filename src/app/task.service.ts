import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDoList } from './todo-list/todo-list.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  todoList: ToDoList[] = [];

  constructor() {
    this.todoList = JSON.parse(localStorage.getItem('todoList') || '');
  }

  taskList: BehaviorSubject<ToDoList[]> = new BehaviorSubject(this.todoList);
  taskEdited: BehaviorSubject<any> = new BehaviorSubject(null);
}

